# Null Resources or Assets

Many *Android* developers have encountered crashes like this:

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

## The Root Cause

This issue typically occurs after an overlay installation when the *App* is launched by a *Broadcast*. Due to a system bug, the old *APK* is loaded. Common manifestations of this issue include:

- *Context.getResources()* returns `null`
- *Class.getResourceAsStream()* returns `null`
- *Context.getAssets()* throws `NullPointerException`
- *Context.getSystemService(Context.AUDIO_SERVICE)* throws `NullPointerException`

## How To Solve It?

For system bugs like this, which may be related to specific system versions, there's no universal solution. Therefore, *Booster*'s approach is to check *Resources* and *Assets* when the *Application* starts. If `Resources` or `AssetManager` is `null`, the process is killed directly:

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

## Getting Started

To fix the `NullPointerException` caused by overlay installation, simply include [booster-transform-res-check](https://github.com/didi/booster/blob/master/booster-transform-res-check), as shown below:


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
        classpath "com.didiglobal.booster:booster-transform-res-check:$booster_version"
    }
}
```

