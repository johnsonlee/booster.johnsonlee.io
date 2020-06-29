# 为系统崩溃兜底

## 莫名其妙的崩溃

许多 Android 开发者可能经常遇到这样的情况：测试的时候好好的，一上线，各种系统的 crash 就报上来了，而且很多是偶现的，比如：

- `DeadObjectException`
- `RuntimeException`
- `WindowManager$BadTokenException`
- `Resources.NotFoundException`
- `NullPointerException`
- `SecurityException`
- `IllegalArgumentException`
- ......

很多情况下，这些异常崩溃并不是由 APP 导致的，而且堆栈中也没有半点 APP 的影子，就拿 `DeadObjectException` 来说，一般都是由于提供远程服务的进程挂掉导致，如果是 APP 代码逻辑的问题，很容易就能在堆栈中发现，那如果是因为系统导致的崩溃，我们难道就无能为力了？

## 解决思路

在 *Android* 系统中，很多的代码逻辑都是在主线程中完成的，例如：四大组件的生命周期，视图相关的操作等等，而 [ActivityThread](https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/app/ActivityThread.java) 在其中扮演了一个很重要的角色，几乎所有在主线程中完成的工作都要经过它，如果能把经过 [ActivityThread](https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/app/ActivityThread.java) 的所有调用都 *try-catch* 住，不就能兜住了么？

究竟如何 *try-catch* 呢？通过分析 [ActivityThread](https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/app/ActivityThread.java) 的源码发现，几乎所有的工作都是由 [ActivityThread.H](https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/app/ActivityThread.java#1764) 这个内部类来完成的，大致如下：

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

由于 [ActivityThread.H](https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/app/ActivityThread.java#1764) 是继承自 *Handler*，而 *Handler* 支持通过 *Handler.Callback* 来改变其自行的行为，所以，只要通过反射为 *ActivityThread.mH.mCallback* 设置一个新的 *Handler.Callback* ，然后在这个 *Handler.Callback* 中将系统异常 *catch* 住就行了。

有人可能会问，如果直接用 `try-catch` 大法这样粗暴的处理方式的话，那 APP 本身的 bug 是不是就不能及时发现了呢？—— 确实是这样！正是基于这样的考虑，*Booster* 并不是简单粗暴的一起兜住，虽然这样做可以让崩溃率变得更好看，但是，APP 本身的问题也就被掩盖了，而且可能导致业务流程无法正常进行下去，那到底是如何甄别异常是由 APP 引起的呢？—— 堆栈信息。通过通栈中是否存在非系统的类，便可判断异常是否由 *APP* 导致的了：

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

> 详见：[ActivityThreadCallback](https://github.com/didi/booster/blob/master/booster-android-instrument-activity-thread/src/main/java/com/didiglobal/booster/instrument/ActivityThreadCallback.java)

# 如何使用

开启系统崩溃兜底只需要引入 [booster-transform-activity-thread](https://github.com/didi/booster/blob/master/booster-transform-activity-thread) 即可，如下所示：


```groovy
buildscript {
    ext {
        kotlin_version = '1.3.31'
        booster_version = '2.2.0'
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

        /* 👇👇👇👇 引用这个模块 👇👇👇👇 */
        classpath "com.didiglobal.booster:booster-transform-activity-thread:$booster_version"
    }
}
```

## 白名单过滤

为了兼容已经存在 *ActivityThread* 被 *hook* 的情况，*Booster* 提供了「白名单」的机制，允许指定特定的包名前缀，当堆栈中仅存在系统类或者在「白名单」中的类时，则认为该异常是系统异常。

| 属性                                                | 说明                |
|-----------------------------------------------------|---------------------|
| `booster.transform.activity.thread.packages.ignore` | 包名列表（逗号分隔）|

### 通过 *gradle.properties* 配置

```properties
booster.transform.activity.thread.packages.ignore=com.didiglobal.booster,io.johnsonlee.booster
```

### 通过命令行配置

```bash
$ ./gradlew assembleDebug -Pbooster.transform.activity.thread.packages.ignore=com.didiglobal.booster,io.johnsonlee.booster
```
