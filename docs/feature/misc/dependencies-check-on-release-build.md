# Release 构建依赖检查

*APP* 在日常的版本发布中，难免因为某些原因要回滚版本，尽管发布之前会在 *Git* 上打 *Tag*，回滚到原来的 *Tag* ，即使在同一台机器上，也未必能构建出跟原来一模一样的 *APK*，其中，影响回滚的很重要的一个原因是依赖的版本管理。为什么依赖的版本管理如此重要呢？这得从一个故事说起。

> 某 *APP* 在上一个版本 *v1.2.0* 中依赖了 *libsecurity* 库，版本号为 *1.0.0-SNAPSHOT*，接下来，*APP* 要发布 *v1.3.0*，在这个版本中，依赖了 *libsecurity* 库的 *1.0.1-SNAPSHOT* 版本，经过灰度发布后，未见明显异常，于是开始全量发布，结果，在放量的过程中，发现有个新增的崩溃陡增，经排查发现，是由于 *libsecurity* 库中的动态库导致，因此不得不将 *libsecurity* 库的版本回滚到上一个版本 —— *1.0.0-SNAPSHOT*，回滚后灰度依然未发现问题，接着开始全量，在全量的过程，又发现了跟之前一样的崩溃。

故事到这儿，可能有人就会问了，上一个版本不是没问题么？为什么回滚版本了，在新版本中出现的崩溃为什么会出现在旧版本中？

经过排查发现，原来是 *libsecurity* 库的维护者将 *1.0.1-SNAPSHOT* 中的 *feature* 以 *1.0.0-SNAPSHOT* 的版本号发布到了 *Maven* 仓库中，导致原来的 *1.0.0-SNAPSHOT* 混入了新的代码，所以，即使回滚到了原来的版本，问题依然还存在。

## 解决方案

但平常的开发迭代中，如果 *Code Review* 不够仔细，就容易出现上面的情况，将 *SNAPSHOT* 版本带到线上，为了方便的解决这一问题，*Booster* 提供了 [booster-task-check-snapshot](https://github.com/didi/booster/blob/master/booster-task-check-snapshot) 模块，用于对 *Release* 构建的依赖库版本进行检查，避免依赖 *SNAPSHOT* 版本的库：

```kotlin
internal open class CheckSnapshot : DefaultTask() {

    lateinit var variant: BaseVariant

    @TaskAction
    fun run() {
        if (!variant.buildType.isDebuggable) {
            variant.dependencies.filter {
                it.id.componentIdentifier is MavenUniqueSnapshotComponentIdentifier
            }.map {
                it.id.componentIdentifier as MavenUniqueSnapshotComponentIdentifier
            }.ifNotEmpty { snapshots ->
                println("$CSI_YELLOW ⚠️  ${snapshots.size} SNAPSHOT artifacts found in ${variant.name} variant:$CSI_RESET\n${snapshots.joinToString("\n") { snapshot -> "$CSI_YELLOW→  ${snapshot.displayName}$CSI_RESET" }}")
            }
        }
    }

}
```

## 如何使用

启用 *SNAPSHOT* 检查只需要在根工程的 *build.gradle* 中引入 [booster-task-check-snapshot](https://github.com/didi/booster/blob/master/booster-task-check-snapshot) 模块，如下所示：

```groovy
buildscript {
    ext {
        kotlin_version = '1.3.31'
        booster_version = '4.3.0'
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
        classpath "com.didiglobal.booster:booster-task-check-snapshot:$booster_version"
    }
}
```

然后，在命令行中执行 `checkSnapshot` 任务：

```bash
$ ./gradlew checkSnapshot
```
