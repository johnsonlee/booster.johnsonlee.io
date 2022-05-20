# 移除冗余资源

## 资源限定符

*Android* 为了便于对特定设备进行适配，定义了一系列资源配置限定符（Configuration Qualifier），开发者只需要根据限定符来对资源进行命名，*Android Framework* 会根据上下文环境完成适配工作，常用的 *Configuration* 有：

1. 语言和区域
1. 幕尺寸
  - small
  - normal
  - large
  - xlarge
1. 屏幕方向
  - port
  - land
1. 屏幕像素密度
  - ldpi
  - mdpi
  - hdpi
  - xhdpi
  - xxhdpi
  - xxxhdpi
  - nodpi
  - tvdpi
  - anydpi
  - *nnn*dpi
1. 平台版本（API Level）
  - v3
  - v4
  - v7
  - ...

## 移除不必要的资源

对于只发布在国内应用市场的 *APP* 来说，有些不是完全需要的，如：多语言、多屏幕密度等，我们可以在 *build.gradle* 中通过如下配置来移除不必要的资源：

```groovy
android {
    defaultConfig {
        resConfigs "zh"
    }
}
```

另一种方式是针对不同的 *Configuration* 分别构建 *APK*，例如，根据屏幕密度来为每种屏幕密度构建一个独立 *APK*：

```groovy
android {
    splits {
        density {
            enable true
            exclude "ldpi", "xxhdpi", "xxxhdpi"
            compatibleScreens 'small', 'normal', 'large', 'xlarge'
        }
    }
}
```

既然移除冗余资源这么简单，那还要 *Booster* 做什么？

## 国内的现状

国内的大多数 *APP* 对于不同的屏幕密度适配做得不是很完善，可能有的只适配了 `xhdpi`，有的适配了 `xhdpi` 和 `xxhdpi`，总之不是所有的图片资源适配的密度是一致的，如果用上面的「拆分 APK」的方式来构建的话，就会出现有些资源找不到的情况，为了解决这一问题，*Booster* 采用了另一种去冗余的方式：

1. 先按资源类型分组；
1. 同类型资源按名称分组；
1. 同名称资源按 *density* 从高到底排序
1. 针对同类型、同名称的不同 *denisty* 资源，保留最高 *density* 的资源，移除其它 *density* 资源

上面的过程看起来很简单，但是，实际情况要比这更复杂，有没有可能存在同类型、同名称、同 *density* 的资源呢？当然是可能的，毕竟 *Configuration* 有很多个适配维度，比如：屏幕布局方向（[ScreenConfig.layout](https://github.com/didi/booster/blob/master/booster-aapt2/src/main/kotlin/com/didiglobal/booster/aapt/Configuration.kt#L415))。

## 支持 RTL 布局方向

大多数国家或地区的语言采用的是从左到右（Left-To-Right）的布局方向，像阿拉伯语采用的是从右到左（Right-To-Left）的布局方向，在 *Android 4.1.1 (API Level 16)* 及以下版本是忽略了 *android:supportsRtl* 属性的，而从 *API Level 17* 开始，可以在 *AndroidManifest.xml* 中设置 *android:supportsRtl* 属性：

```xml
<manifest ... >
    ...
    <application ...
        android:supportsRtl="true">
    </application>
</manifest>
```

因此，在去冗余资源的时候，还需要根据 *supportsRtl* 属性来决定是否保留同 *density* 但不同布局方向的资源。

## 如何使用

开启去冗余资源只需要引入 [booster-task-resource-deredundancy](https://github.com/didi/booster/blob/master/booster-task-resource-deredundancy) 即可，如下所示：


```groovy
buildscript {
    ext {
        kotlin_version = '1.3.31'
        booster_version = '4.9.0'
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
        classpath "com.didiglobal.booster:booster-task-resource-deredundancy:$booster_version"
    }
}
```

::: warning
*Android Gradle Plugin 3.6* 及以上版本，需要在 *gradle.properties* 中设置：

```properties
android.precompileDependenciesResources=false
```
:::

