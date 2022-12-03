# 构建中间产物清单

在针对 *Android* 工程开发 *Gradle* 插件的过程中，经常会用到一些内部 *API*，需要了解 *Android* 构建过程的细节和内部实现，以便于在合适的时机插入特定的 *Task* 来获取 *AGP* 的中间产物，为了方便 *Gradle Plugin* 的开发者，*Booster* 提供了 [booster-task-list-artifact](https://github.com/didi/booster/blob/master/booster-task-list-artifact) 模块，用于列出 *Android* 工程的构建中间产物。

## 如何使用

在根工程的 *build.gradle* 中引入 [booster-task-list-artifact](https://github.com/didi/booster/blob/master/booster-task-list-artifact) 模块，如下所示：

```groovy
buildscript {
    ext {
        kotlin_version = "1.5.31"
        booster_version = "4.15.0"
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
        classpath "com.didiglobal.booster:booster-task-list-artifact:$booster_version"
    }
}
```

然后，在命令行中执行 `listArtifacts` 任务：

```bash
$ ./gradlew listArtifacts
```
