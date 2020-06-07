# 快速上手

## 配置 *Booster Gradle* 插件

在 *Android* 工程根目录的 *build.gradle* 中引入 *booster-gradle-plugin*:

```groovy
buildscript {
    ext.booster_version = '1.7.1'

    repositories {
        google()
        mavenCentral()
        jcenter()
        maven { url 'https://oss.sonatype.org/content/repositories/public' }
    }

    dependencies {
        classpath "com.didiglobal.booster:booster-gradle-plugin:$booster_version"
    }
}
```

## 配置 *Booster* 模块

在 *Android* 工程根目录的 *build.gradle* 中引入 *Booster* 的模块，以 [booster-task-analyser](https://github.com/didi/booster/tree/master/booster-task-analyser) 为例，如下所示:

```groovy
buildscript {
    ext.booster_version = '1.7.1'

    repositories {
        google()
        mavenCentral()
        jcenter()
        maven { url 'https://oss.sonatype.org/content/repositories/public' }
    }

    dependencies {
        classpath "com.didiglobal.booster:booster-gradle-plugin:$booster_version"
        classpath "com.didiglobal.booster:booster-task-analyser:$booster_version"
    }
}
```
:::warning
如果未配置任何模块，[BoosterTransform](https://github.com/didi/booster/blob/master/booster-gradle-plugin/src/main/kotlin/com/didiglobal/booster/gradle/BoosterTransform.kt) 则不会被执行，这个特性可以用于仅构建 *Release* 包时启用 *Booster* 模块，加快 *Debug* 包的构建速度。
:::

## 应用 *Booster Gradle* 插件

在 *App* 子工程中启用 *booster-gradle-plugin*:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'com.didiglobal.booster'
```

::: warning
由于其它插件可能与 *booster* 有冲突，尽可能将 `apply plugin: 'com.didiglobal.booster'` 放在 `apply plugin: 'com.android.application'` 的下面第一行
:::

## 仅对 *Release* 生效

*Booster* 提供了很多的功能模块，如果引入所有的模块，可能会增加 *App* 构建的时间，甚至影响开发调试的效率，有些模块完全可以在 *Debug* 构建中忽略掉，可以在 *build.gradle* 中通过 *Gradle* 的启动参数来判断构建 *task* 是否是 *Release* 类型：

```groovy
buildscript {
    ext.booster_version = '1.7.1'
    ext.debug = gradle.startParameter.taskNames.any { it.contains('debug') || it.contains('Debug') }

    repositories {
        google()
        mavenCentral()
        jcenter()
        maven { url 'https://oss.sonatype.org/content/repositories/public' }
    }

    dependencies {
        classpath "com.didiglobal.booster:booster-gradle-plugin:$booster_version"

        if (!debug) {
            classpath "com.didiglobal.booster:booster-task-analyser:$booster_version"
        }
    }
}
```
