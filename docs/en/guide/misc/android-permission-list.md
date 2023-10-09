# Android 权限清单

在工程规模足够复杂的项目中，要想清楚的知道哪些库使用了哪些权限，着实不是一件简单的事情，为了方便开发者排查权限相关的问题，*Booster 提供了 [booster-task-list-permission](https://github.com/didi/booster/blob/master/booster-task-list-permission) 模块，用于列出工程中依赖的 *AAR* 中使用的所有 *Android* 权限。

## 如何使用

在根工程的 *build.gradle* 中引入 [booster-task-list-permission](https://github.com/didi/booster/blob/master/booster-task-list-permission) 模块，如下所示：

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

        /* 👇👇👇👇 引用这个模块 👇👇👇👇 */
        classpath "com.didiglobal.booster:booster-task-list-permission:$booster_version"
    }
}
```

然后，在命令行中执行 `listPermissions` 任务：

```bash
$ ./gradlew listPermissions
```
