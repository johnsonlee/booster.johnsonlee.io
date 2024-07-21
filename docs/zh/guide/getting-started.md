# 快速上手

## 配置 *Booster Gradle* 插件

在 *Android* 工程根目录的 *build.gradle* 中引入 *booster-gradle-plugin*:

<CodeGroup>
  <CodeGroupItem title="Groovy" active>

```groovy
buildscript {
    ext.booster_version = "5.0.0"

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
    val booster_version = "5.0.0"

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

在 *App* 子工程中启用 *booster-gradle-plugin*:

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
由于其它插件可能与 *Booster* 有冲突，尽可能将 `com.didiglobal.booster` 放在 `com.android.application` 的下面第一行
:::

## 配置 *Booster* 插件

在 *Android* 工程根目录的 *build.gradle* 中引入 *Booster* 的插件，以 [booster-task-analyser](https://github.com/didi/booster/tree/master/booster-task-analyser) 为例，如下所示:

```groovy
buildscript {
    ext.booster_version = "5.0.0"

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

:::warning
如果未配置任何 Booter 插件，*transformClassesWithBoosterFor${Variant}* 任务则不会被执行，这个特性可以用于仅构建 *Release* 包时启用 *Booster* 插件，加快 *Debug* 包的构建速度。
:::

## 仅对 *Release* 生效

*Booster* 提供了很多的插件，如果引入所有的插件，可能会增加 *App* 构建的时间，甚至影响开发调试的效率，有些插件完全可以在 *Debug* 构建中忽略掉，可以在 *build.gradle* 中通过 *Gradle* 的启动参数来判断构建 *task* 是否是 *Release* 类型：

<CodeGroup>
  <CodeGroupItem title="Groovy" active>

```groovy
buildscript {
    ext.booster_version = "5.0.0"
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
    val booster_version = "5.0.0"
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
