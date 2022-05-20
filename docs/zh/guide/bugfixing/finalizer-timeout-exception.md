# Finalizer 导致的 TimeoutException

## Finalizer 的问题

相信很多 *Android* 开发者都见过像这样的 *TimeoutException* : 

```
java.util.concurrent.TimeoutException: android.content.res.AssetManager.finalize() timed out after 10 seconds
  at android.content.res.AssetManager.destroy(Native Method)
  at android.content.res.AssetManager.finalize(AssetManager.java:603)
  at java.lang.Daemons$FinalizerDaemon.doFinalize(Daemons.java:187)
  at java.lang.Daemons$FinalizerDaemon.run(Daemons.java:170)
  at java.lang.Thread.run(Thread.java:856)
```

通过查看 *AOSP* 源码，我们很容易就能定位到异常发生在 *Daemons$FinalizerWatchdogDaemon.finalizerTimedOut* :

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

从源码里，我们可以看到 *finalizerTimedOut* 会抛出 *UncaughtException*，那为什么会调到这儿呢？让我们继续看源码：

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

原来，*FinalizerWatchdogDaemon* 会异步等待 *Finalization* 结束：

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

看到这里，我想大家已经弄明白，为什么会抛出 *TimeoutException* 了，这是因为 *FinalizerWatchdogDaemon* 会等待 *FinalizerDaemon.doFinalize()* 的结果，如果在 *MAX_FINALIZE_NANOS* 时间之内没有完成，就会抛出 *TimeoutException*。

## 根本原因

从源码中我们可以看到，*Daemons* 启了 *4* 个 *Daemon* 线程：

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

*HeapTaskDaemon* 用来启动用于处理 *GC* 相关的任务，如：*Heap Trimming*, *Heap Transition* 以及 *Concurrent GC*，详见：[task_processor.h](https://android.googlesource.com/platform/art/+/master/runtime/gc/task_processor.h)

### ReferenceQueueDaemon

*ReferenceQueueDaemon* 负责将 *FinalizerReference* （重写了 *finalize()* 方法的类在实例化的时候，会被 *FinalizerReference* 引用，当该实例具有且仅有 *FinalizerReference* 引用它时，则认为该对象适合被 *GC* 回收）入队到 *ReferenceQueue* 中

### FinalizerDaemon

*FinalizerDaemon* 负责在 *GC* 被触发时，执行被 *FinalizerReference* 引用的对象的 *finalize* 方法

### FinalizerWatchdogDaemon

*FinalizerWatchdogDaemon* 顾名思义，它就是 *Finalizer* 的「看门狗」，一旦在规定的时间之内，没有给它「喂骨头」，则认为 *Finalizer* 过程被阻塞了，它就会抛异常了，而 *FinalizerDaemon* 就是给它「喂骨头」的线程。

## 解决思路

了解了 *4* 个 *Daemon* 线程的作用，那这个问题就好办了，有人提出把超时时间 *MAX_FINALIZE_NANOS* 设置长一些不就行了？比如：*Integer.MAX_VALUE*，看起来貌似这是最简单的办法，真的可行吗？让我们来看看源码：

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

从源码中，我们可以看到 *MAX_FINALIZE_NANOS* 是一个常量值，根据我们对 *JVM* 规范的了解，常量是一个立即数，已经被编码进指令中，即使运行时修改它，也不会有任何作用。

*Booster* 的解决方案是解决抛出异常的「看门狗」—— 在应用启动后，停掉 *FinalizerWatchdogDaemon* 线程，这样做对于 *APP* 来说，并没有什么实质性的影响：

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

## 如何使用

修复 `FinalizerDaemon` 导致的 *TimeoutException* 只需要引入 [booster-transform-finalizer-watchdog-daemon](https://github.com/didi/booster/blob/master/booster-transform-finalizer-watchdog-daemon) 即可，如下所示：


```groovy
buildscript {
    ext {
        kotlin_version = '1.3.31'
        booster_version = '4.9.0'
    }
    repositories {
        mavenCentral()
        google()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.5.0'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
        classpath "com.didiglobal.booster:booster-gradle-plugin:$booster_version"

        /* 👇👇👇👇 引用这个模块 👇👇👇👇 */
        classpath "com.didiglobal.booster:booster-transform-finalizer-watchdog-daemon:$booster_version"
    }
}
```
