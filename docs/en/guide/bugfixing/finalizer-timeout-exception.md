# Finalization TimeoutException

## The Problem of Finalizer

Many *Android* developers have encountered *TimeoutException* like this:

```
java.util.concurrent.TimeoutException: android.content.res.AssetManager.finalize() timed out after 10 seconds
  at android.content.res.AssetManager.destroy(Native Method)
  at android.content.res.AssetManager.finalize(AssetManager.java:603)
  at java.lang.Daemons$FinalizerDaemon.doFinalize(Daemons.java:187)
  at java.lang.Daemons$FinalizerDaemon.run(Daemons.java:170)
  at java.lang.Thread.run(Thread.java:856)
```

By examining the *AOSP* source code, we can easily locate the exception occurring at *Daemons$FinalizerWatchdogDaemon.finalizerTimedOut*:

```java
private static void finalizerTimedOut(Object object) {
    // The current object has exceeded the finalization deadline; abort!
    String message = object.getClass().getName() + ".finalize() timed out after "
            + VMRuntime.getRuntime().getFinalizerTimeoutMs() / 1000 + " seconds";
    Exception syntheticException = new TimeoutException(message);
    // We use the stack from where finalize() was running to show where it was stuck.
    syntheticException.setStackTrace(FinalizerDaemon.INSTANCE.getStackTrace());
    // Send SIGQUIT to get native stack traces.
    try {
        Os.kill(Os.getpid(), OsConstants.SIGQUIT);
        // Sleep a few seconds to let the stack traces print.
        Thread.sleep(5000);
    } catch (Exception e) {
        System.logE("failed to send SIGQUIT", e);
    } catch (OutOfMemoryError ignored) {
        // May occur while trying to allocate the exception.
    }
    // Ideally, we'd want to do this if this Thread had no handler to dispatch to.
    // Unfortunately, it's extremely to messy to query whether a given Thread has *some*
    // handler to dispatch to, either via a handler set on itself, via its ThreadGroup
    // object or via the defaultUncaughtExceptionHandler.
    //
    // As an approximation, we log by hand an exit if there's no pre-exception handler nor
    // a default uncaught exception handler.
    //
    // Note that this condition will only ever be hit by ART host tests and standalone
    // dalvikvm invocations. All zygote forked process *will* have a pre-handler set
    // in RuntimeInit and they cannot subsequently override it.
    if (Thread.getUncaughtExceptionPreHandler() == null &&
            Thread.getDefaultUncaughtExceptionHandler() == null) {
        // If we have no handler, log and exit.
        System.logE(message, syntheticException);
        System.exit(2);
    }
    // Otherwise call the handler to do crash reporting.
    // We don't just throw because we're not the thread that
    // timed out; we're the thread that detected it.
    Thread.currentThread().dispatchUncaughtException(syntheticException);
}
```

From the source code, we can see that *finalizerTimedOut* throws an *UncaughtException*. But why does it get called? Let's continue examining the source code:

```java
@Override public void runInternal() {
    while (isRunning()) {
        if (!sleepUntilNeeded()) {
            // We have been interrupted, need to see if this daemon has been stopped.
            continue;
        }
        final Object finalizing = waitForFinalization();
        if (finalizing != null && !VMDebug.isDebuggerConnected()) {
            finalizerTimedOut(finalizing);
            break;
        }
    }
}
```

As it turns out, *FinalizerWatchdogDaemon* asynchronously waits for *Finalization* to complete:

```java
private Object waitForFinalization() {
    if (finalizerTimeoutMs == 0) {
        finalizerTimeoutMs = VMRuntime.getRuntime().getFinalizerTimeoutMs();
        // Temporary app backward compatibility. Remove eventually.
        MAX_FINALIZE_NANOS = NANOS_PER_MILLI * finalizerTimeoutMs;
    }
    long startCount = FinalizerDaemon.INSTANCE.progressCounter.get();
    // Avoid remembering object being finalized, so as not to keep it alive.
    if (!sleepForMillis(finalizerTimeoutMs)) {
        // Don't report possibly spurious timeout if we are interrupted.
        return null;
    }
    if (getNeedToWork() && FinalizerDaemon.INSTANCE.progressCounter.get() == startCount) {
        // We assume that only remove() and doFinalize() may take time comparable to
        // the finalizer timeout.
        // We observed neither the effect of the gotoSleep() nor the increment preceding a
        // later wakeUp. Any remove() call by the FinalizerDaemon during our sleep
        // interval must have been followed by a wakeUp call before we checked needToWork.
        // But then we would have seen the counter increment.  Thus there cannot have
        // been such a remove() call.
        // The FinalizerDaemon must not have progressed (from either the beginning or the
        // last progressCounter increment) to either the next increment or gotoSleep()
        // call.  Thus we must have taken essentially the whole finalizerTimeoutMs in a
        // single doFinalize() call.  Thus it's OK to time out.  finalizingObject was set
        // just before the counter increment, which preceded the doFinalize call.  Thus we
        // are guaranteed to get the correct finalizing value below, unless doFinalize()
        // just finished as we were timing out, in which case we may get null or a later
        // one.  In this last case, we are very likely to discard it below.
        Object finalizing = FinalizerDaemon.INSTANCE.finalizingObject;
        sleepForMillis(500);
        // Recheck to make it even less likely we report the wrong finalizing object in
        // the case which a very slow finalization just finished as we were timing out.
        if (getNeedToWork()
                && FinalizerDaemon.INSTANCE.progressCounter.get() == startCount) {
            return finalizing;
        }
    }
    return null;
}
```

At this point, you should understand why *TimeoutException* is thrown. This is because *FinalizerWatchdogDaemon* waits for the result of *FinalizerDaemon.doFinalize()*, and if it doesn't complete within *MAX_FINALIZE_NANOS* time, a *TimeoutException* is thrown.

## The Root Cause

From the source code, we can see that *Daemons* starts *4* *Daemon* threads:

```java
public final class Daemons {

    private static final Daemon[] DAEMONS = new Daemon[] {
            HeapTaskDaemon.INSTANCE,
            ReferenceQueueDaemon.INSTANCE,
            FinalizerDaemon.INSTANCE,
            FinalizerWatchdogDaemon.INSTANCE,
    };

    public static void start() {
        for (Daemon daemon : DAEMONS) {
            daemon.start();
        }
    }

}
```

### HeapTaskDaemon

*HeapTaskDaemon* is used to handle *GC* related tasks, such as: *Heap Trimming*, *Heap Transition*, and *Concurrent GC*. See: [task_processor.h](https://android.googlesource.com/platform/art/+/master/runtime/gc/task_processor.h)

### ReferenceQueueDaemon

*ReferenceQueueDaemon* is responsible for enqueueing *FinalizerReference* (classes that override the *finalize()* method are referenced by *FinalizerReference* when instantiated; when an instance has only *FinalizerReference* referencing it, the object is considered eligible for *GC*) into the *ReferenceQueue*

### FinalizerDaemon

*FinalizerDaemon* is responsible for executing the *finalize* method of objects referenced by *FinalizerReference* when *GC* is triggered

### FinalizerWatchdogDaemon

*FinalizerWatchdogDaemon*, as the name suggests, is the "watchdog" for *Finalizer*. If it doesn't receive a "signal" within the specified time, it considers the *Finalizer* process blocked and throws an exception. *FinalizerDaemon* is the thread that sends this "signal".

## How To Solve It?

Now that we understand the role of the *4* *Daemon* threads, the solution becomes clear. Some suggest simply increasing the timeout value *MAX_FINALIZE_NANOS*, for example to *Integer.MAX_VALUE*. This seems like the simplest approach, but is it feasible? Let's look at the source code:

```java
public final class Daemons {

    // This used to be final. IT IS NOW ONLY WRITTEN. We now update it when we look at the command
    // line argument, for the benefit of mis-behaved apps that might read it.  SLATED FOR REMOVAL.
    // There is no reason to use this: Finalizers should not rely on the value. If a finalizer takes
    // appreciable time, the work should be done elsewhere.  Based on disassembly of Daemons.class,
    // the value is effectively inlined, so changing the field never did have an effect.
    // DO NOT USE. FOR ANYTHING. THIS WILL BE REMOVED SHORTLY.
    @UnsupportedAppUsage
    private static long MAX_FINALIZE_NANOS = 10L * 1000 * NANOS_PER_MILLI;

```

From the source code, we can see that *MAX_FINALIZE_NANOS* is a constant value. Based on our understanding of the *JVM* specification, a constant is an immediate value that has been encoded into the instruction. Even if modified at runtime, it will have no effect.

*Booster*'s solution is to deal with the exception-throwing "watchdog" - stop the *FinalizerWatchdogDaemon* thread after the application starts. This has no substantial impact on the *APP*:

```java
public static void kill() {
    new Thread(new Runnable() {
        @Override
        public void run() {
            for (int retry = 0; isFinalizerWatchdogDaemonExists() && retry < MAX_RETRY_TIMES; retry++) {
                try {
                    final Class clazz = Class.forName("java.lang.Daemons$FinalizerWatchdogDaemon");
                    final Field field = clazz.getDeclaredField("INSTANCE");
                    field.setAccessible(true);
                    final Object watchdog = field.get(null);

                    try {
                        final Field thread = clazz.getSuperclass().getDeclaredField("thread");
                        thread.setAccessible(true);
                        thread.set(watchdog, null);
                    } catch (final Throwable t) {
                        Log.e(TAG, "Clearing reference of thread `FinalizerWatchdogDaemon` failed", t);

                        try {
                            final Method method = clazz.getSuperclass().getDeclaredMethod("stop");
                            method.setAccessible(true);
                            method.invoke(watchdog);
                        } catch (final Throwable e) {
                            Log.e(TAG, "Interrupting thread `FinalizerWatchdogDaemon` failed", e);
                            break;
                        }
                    }

                    try {
                        Thread.sleep(THREAD_SLEEP_TIME);
                    } catch (final InterruptedException ignore) {
                    }
                } catch (final Throwable t) {
                    Log.e(TAG, "Killing thread `FinalizerWatchdogDaemon` failed", t);
                    break;
                }
            }
            if (isFinalizerWatchdogDaemonExists()) {
                Log.e(TAG, "Killing thread `FinalizerWatchdogDaemon` failed");
            } else {
                Log.i(TAG, "Thread `FinalizerWatchdogDaemon` does not exist");
            }
        }
    }, "FinalizerWatchdogDaemonKiller").start();
}
```

## Getting Started

To fix the *TimeoutException* caused by `FinalizerDaemon`, simply include [booster-transform-finalizer-watchdog-daemon](https://github.com/didi/booster/blob/master/booster-transform-finalizer-watchdog-daemon), as shown below:


```groovy
buildscript {
    ext {
        kotlin_version = "1.5.31"
        booster_version = "4.16.3"
    }
    repositories {
        mavenCentral()
        google()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.5.0'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
        classpath "com.didiglobal.booster:booster-gradle-plugin:$booster_version"

        /* Include this module */
        classpath "com.didiglobal.booster:booster-transform-finalizer-watchdog-daemon:$booster_version"
    }
}
```
