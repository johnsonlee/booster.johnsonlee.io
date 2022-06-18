# 资源为 null 的问题

相信很多 *Android* 开发者都遇到像这样的崩溃：

```
java.lang.NullPointerException: Attempt to invoke virtual method 'android.content.res.AssetManager android.content.res.Resources.getAssets()' on a null object reference
    at android.app.LoadedApk.getAssets(LoadedApk.java:581)
    at android.app.LoadedApk.prepareResources(LoadedApk.java:643)
    at android.app.LoadedApk.makeApplication(LoadedApk.java:636)
    at android.app.ActivityThread.handleBindApplication(ActivityThread.java:4673)
    at android.app.ActivityThread.access$1500(ActivityThread.java:162)
    at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1409)
    at android.os.Handler.dispatchMessage(Handler.java:102)
    at android.os.Looper.loop(Looper.java:135)
    at android.app.ActivityThread.main(ActivityThread.java:5422)
    at java.lang.reflect.Method.invoke(Native Method)
    at java.lang.reflect.Method.invoke(Method.java:372)
    at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:914)
    at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:707)
```

## 根本原因

这种问题基本上都是发生在覆盖安装之后，*App* 由 *Broadcast* 唤起，由于系统 bug 导致加载了旧的 *APK*，一般表现出来的异常有：

- *Context.getResources()* 返回 `null`
- *Class.getResourceAsStream()* 返回 `null`
- *Context.getAssets()* 抛出 `NullPointerException`
- *Context.getSystemService(Context.AUDIO_SERVICE)* 抛出 `NullPointerException`

## 解决思路

像这样的系统 bug，可能跟系统版本有关，也没有什么通用的解决方案，所以 *Booster* 的解决思路是，在 *Application* 启动的时候，对 *Resources* 和 *Assets* 进行检查，如果 `Resources` 或者 `AssetManager` 为 `null`，直接杀进程：

```java
public class ResChecker {

    public static void checkRes(final Application app) {
        if (null == app.getAssets() || null == app.getResources()) {
            final int pid = Process.myPid();
            Log.w(TAG, "Process " + pid + " is going to be killed");
            Process.killProcess(pid);
            System.exit(10);
        }
    }

}
```

## 如何使用

修复覆盖安装导致的 `NullPointerException` 只需要引入 [booster-transform-res-check](https://github.com/didi/booster/blob/master/booster-transform-res-check) 即可，如下所示：


```groovy
buildscript {
    ext {
        kotlin_version = '1.3.31'
        booster_version = '4.10.0'
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
        classpath "com.didiglobal.booster:booster-transform-res-check:$booster_version"
    }
}
```

