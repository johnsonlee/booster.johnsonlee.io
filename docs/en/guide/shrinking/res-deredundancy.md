# Resource Deredundancy

## Resource Qualifier

*Android* defines a series of resource configuration qualifiers to facilitate adaptation for specific devices. Developers only need to name resources according to the qualifiers, and the *Android Framework* will complete the adaptation work based on the context. Common *Configurations* include:

1. Language and region
1. Screen size
  - small
  - normal
  - large
  - xlarge
1. Screen orientation
  - port
  - land
1. Screen pixel density
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
1. Platform version (API Level)
  - v3
  - v4
  - v7
  - ...

## Unnecessary Resource Removal

For *APPs* that are only published on domestic app stores, some configurations are not entirely necessary, such as: multiple languages, multiple screen densities, etc. We can remove unnecessary resources by configuring the following in *build.gradle*:

```groovy
android {
    defaultConfig {
        resConfigs "zh"
    }
}
```

Another approach is to build separate *APKs* for different *Configurations*. For example, to build an independent *APK* for each screen density:

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

Since removing redundant resources is so simple, why do we need *Booster*?

## Status of Apps From China

Most *APPs* in China don't handle screen density adaptation very well. Some may only adapt for `xhdpi`, while others adapt for both `xhdpi` and `xxhdpi`. In short, not all image resources are adapted consistently for all densities. If we use the "split APK" approach mentioned above, some resources won't be found. To solve this problem, *Booster* adopts a different deredundancy approach:

1. First, group resources by type;
1. Group resources of the same type by name;
1. Sort resources with the same name by *density* from high to low
1. For resources of the same type and name but different *densities*, keep the resource with the highest *density* and remove resources of other *densities*

The above process looks simple, but the actual situation is more complex. Is it possible to have resources of the same type, same name, and same *density*? Of course it is, since *Configuration* has many adaptation dimensions, such as: screen layout direction ([ScreenConfig.layout](https://github.com/didi/booster/blob/master/booster-aapt2/src/main/kotlin/com/didiglobal/booster/aapt/Configuration.kt#L415)).

## Support RTL Layout

Most countries or regions use Left-To-Right layout direction for their languages. Languages like Arabic use Right-To-Left layout direction. In *Android 4.1.1 (API Level 16)* and below, the *android:supportsRtl* attribute was ignored. Starting from *API Level 17*, the *android:supportsRtl* attribute can be set in *AndroidManifest.xml*:

```xml
<manifest ... >
    ...
    <application ...
        android:supportsRtl="true">
    </application>
</manifest>
```

Therefore, when removing redundant resources, it's also necessary to decide whether to keep resources with the same *density* but different layout directions based on the *supportsRtl* attribute.

## Getting Started

To enable resource deredundancy, simply include [booster-task-resource-deredundancy](https://github.com/didi/booster/blob/master/booster-task-resource-deredundancy), as shown below:


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
        classpath "com.didiglobal.booster:booster-task-resource-deredundancy:$booster_version"
    }
}
```

::: warning
For *Android Gradle Plugin 3.6* and above, you need to set the following in *gradle.properties*:

```properties
android.precompileDependenciesResources=false
```
:::

