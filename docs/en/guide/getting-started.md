# Getting Started

## Configuring Booster Gradle Plugin

Configuring *booster-gradle-plugin* in the *build.gradle* of the *Android* root project:

<CodeGroup>
  <CodeGroupItem title="Groovy" active>

```groovy
buildscript {
    ext.booster_version = '4.7.0'

    repositories {
        google()
        mavenCentral()
    }

    dependencies {
        classpath "com.didiglobal.booster:booster-gradle-plugin:$booster_version"
    }
}
```

  </CodeGroupItem>
  <CodeGroupItem title="Kotlin">

```kotlin
buildscript {
    val booster_version = "4.7.0"

    repositories {
        google()
        mavenCentral()
    }

    dependencies {
        classpath("com.didiglobal.booster:booster-gradle-plugin:$booster_version")
    }
}
```

  </CodeGroupItem>
</CodeGroup>

Then, apply *booster-gradle-plugin* in the Android application project:

<CodeGroup>
  <CodeGroupItem title="Groovy" active>

```groovy
apply plugin: 'com.android.application'
apply plugin: 'com.didiglobal.booster'
// ...
```

  </CodeGroupItem>
  <CodeGroupItem title="Kotlin">

```kotlin
plugins {
    id("com.android.application")
    id("com.didiglobal.booster")
    // ...
}
```

  </CodeGroupItem>
</CodeGroup>

::: warning
Some Gradle plugins might conflict with Booster, if you are trying to apply other third-party Gradle plugins, please put `com.didiglobal.booster` in the first line below `com.android.application` as much as possible.
:::

## Configuring Booster Plugins

Configuring Booster plugins in the *build.gradle* under the Android root project, take [booster-task-analyser](https://github.com/didi/booster/tree/master/booster-task-analyser) as an example, put the plugin maven coordinates into the classpath of Gradle build script:

<CodeGroup>
  <CodeGroupItem title="Groovy" active>

```groovy
buildscript {
    ext.booster_version = '4.7.0'

    repositories {
        google()
        mavenCentral()
    }

    dependencies {
        classpath "com.didiglobal.booster:booster-gradle-plugin:$booster_version"
        classpath "com.didiglobal.booster:booster-task-analyser:$booster_version"
    }
}
```

  </CodeGroupItem>
  <CodeGroupItem title="Kotlin">

```kotlin
buildscript {
    val booster_version = "4.7.0"

    repositories {
        google()
        mavenCentral()
    }

    dependencies {
        classpath("com.didiglobal.booster:booster-gradle-plugin:$booster_version")
        classpath("com.didiglobal.booster:booster-task-analyser:$booster_version")
    }
}
```

  </CodeGroupItem>
</CodeGroup>

:::warning
The task *transformClassesWithBoosterFor${Variant}* won't be executed if no Booster plugin has been found from the build script classpath, and this feature can be used to improve the build performance by enabling it only for release build.
:::

## Configuration for Release-Only

Booster provides many plugins, if you put all plugins into the classpath of Gradle build script, it will slow down the build performance and decrease the development efficiency, to avoid this, some plugins can be configured for release only by using the Gradle start parameter to distinguish the build type:

<CodeGroup>
  <CodeGroupItem title="Groovy" active>

```groovy
buildscript {
    ext.booster_version = '4.7.0'
    ext.debug = gradle.startParameter.taskNames.any {
        it.contains('debug') || it.contains('Debug')
    }

    repositories {
        google()
        mavenCentral()
    }

    dependencies {
        classpath "com.didiglobal.booster:booster-gradle-plugin:$booster_version"

        if (!debug) {
            classpath "com.didiglobal.booster:booster-task-analyser:$booster_version"
        }
    }
}
```

  </CodeGroupItem>
  <CodeGroupItem title="Kotlin">

```kotlin
buildscript {
    val booster_version = "4.7.0"
    val debug = gradle.startParameter.taskNames.any {
        it.contains("debug", true)
    }

    repositories {
        google()
        mavenCentral()
    }

    dependencies {
        classpath("com.didiglobal.booster:booster-gradle-plugin:$booster_version")

        if (!debug) {
            classpath("com.didiglobal.booster:booster-task-analyser:$booster_version")
        }
    }
}
```

  </CodeGroupItem>
</CodeGroup>
