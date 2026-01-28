# Preventing System Crashes

## Inexplicable Crashes

Many Android developers often encounter situations where everything works fine during testing, but various system crashes are reported once the app goes live, and many of these are intermittent, such as:

- `DeadObjectException`
- `RuntimeException`
- `WindowManager$BadTokenException`
- `Resources.NotFoundException`
- `NullPointerException`
- `SecurityException`
- `IllegalArgumentException`
- ......

In many cases, these crash exceptions are not caused by the APP itself, and there's no trace of the APP in the stack trace. Take `DeadObjectException` for example - it's typically caused by the remote service process crashing. If it's a problem with the APP's code logic, it can easily be found in the stack trace. But if the crash is caused by the system, are we powerless to do anything?

## How To Solve It?

In the *Android* system, much of the code logic is executed on the main thread, such as: the lifecycle of the four major components, view-related operations, etc. [ActivityThread](https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/app/ActivityThread.java) plays a very important role in this - almost all work completed on the main thread goes through it. If we could *try-catch* all calls passing through [ActivityThread](https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/app/ActivityThread.java), wouldn't we be able to catch them all?

So how exactly do we implement the *try-catch*? By analyzing the [ActivityThread](https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/app/ActivityThread.java) source code, we find that almost all work is done by the internal class [ActivityThread.H](https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/app/ActivityThread.java#1764), roughly as follows:

```java
public final class ActivityThread extends ClientTransactionHandler {

    ......

    final H mH = new H();

    ......

    class H extends Handler {

        public void handleMessage(Message msg) {
            switch (msg.what) {
                ......
            }
        }

    }

    ......

}
```

Since [ActivityThread.H](https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/app/ActivityThread.java#1764) extends *Handler*, and *Handler* supports changing its behavior through *Handler.Callback*, we just need to set a new *Handler.Callback* for *ActivityThread.mH.mCallback* via reflection, and then *catch* system exceptions in this *Handler.Callback*.

Some might ask: if we use such a crude `try-catch` approach, wouldn't it prevent timely discovery of bugs in the APP itself? -- That's exactly right! Based on this consideration, *Booster* doesn't just catch everything indiscriminately. Although doing so would make the crash rate look better, it would also mask the APP's own problems and might prevent business processes from proceeding normally. So how do we distinguish whether an exception is caused by the APP? -- Stack trace information. By checking whether there are non-system classes in the stack trace, we can determine if the exception was caused by the *APP*:

```java
class ActivityThreadCallback implements Handler.Callback {

    private static final String[] SYSTEM_PACKAGE_PREFIXES = {
            "java.",
            "android.",
            "androidx.",
            "dalvik.",
            "com.android.",
    };

    private final Handler mHandler;

    private final Handler.Callback mDelegate;

    private final Set<String> mIgnorePackages;

    /**
     * @param ignorePackages packages to ignore
     */
    public ActivityThreadCallback(final String[] ignorePackages) {
        final Set<String> packages = new HashSet<>(Arrays.asList(SYSTEM_PACKAGE_PREFIXES));
        for (final String pkg : ignorePackages) {
            if (null == pkg) {
                continue;
            }
            packages.add(pkg.endsWith(".") ? pkg : (pkg + "."));
        }
        packages.add(getClass().getPackage().getName() + ".");
        this.mIgnorePackages = Collections.unmodifiableSet(packages);
        this.mHandler = getHandler(getActivityThread());
        this.mDelegate = getFieldValue(this.mHandler, "mCallback");
    }

    private boolean isCausedByUser(final Throwable t) {
        if (null == t) {
            return false;
        }

        for (Throwable cause = t; null != cause; cause = cause.getCause()) {
            for (final StackTraceElement element : cause.getStackTrace()) {
                if (isUserStackTrace(element)) {
                    return true;
                }
            }
        }

        return false;
    }

    private boolean isUserStackTrace(final StackTraceElement element) {
        final String name = element.getClassName();
        for (final String prefix : this.mIgnorePackages) {
            if (!name.startsWith(prefix)) {
                return true;
            }
        }
        return false;
    }
}
```

> See: [ActivityThreadCallback](https://github.com/didi/booster/blob/master/booster-android-instrument-activity-thread/src/main/java/com/didiglobal/booster/instrument/ActivityThreadCallback.java)

# Getting Started

To enable system crash protection, simply include [booster-transform-activity-thread](https://github.com/didi/booster/blob/master/booster-transform-activity-thread), as shown below:


```groovy
buildscript {
    ext {
        kotlin_version = "1.5.31"
        booster_version = "4.16.3"
    }
    repositories {
        mavenLocal()
        mavenCentral()
        google()
        jcenter()
        maven { url 'https://oss.sonatype.org/content/repositories/public/' }
        maven { url 'https://oss.sonatype.org/content/repositories/snapshots/' }
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.5.0'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
        classpath "com.didiglobal.booster:booster-gradle-plugin:$booster_version"

        /* Include this module */
        classpath "com.didiglobal.booster:booster-transform-activity-thread:$booster_version"
    }
}
```

## Whitelist Filtering

To be compatible with situations where *ActivityThread* is already *hook*ed, *Booster* provides a "whitelist" mechanism that allows specifying specific package prefixes. When the stack trace contains only system classes or classes in the "whitelist", the exception is considered a system exception.

| Property                                            | Description                     |
|-----------------------------------------------------|---------------------------------|
| `booster.transform.activity.thread.packages.ignore` | Package list (comma-separated)  |

### Configuring via *gradle.properties*

```properties
booster.transform.activity.thread.packages.ignore=com.didiglobal.booster,io.johnsonlee.booster
```

### Configuring via Command Line

```bash
$ ./gradlew assembleDebug -Pbooster.transform.activity.thread.packages.ignore=com.didiglobal.booster,io.johnsonlee.booster
```
