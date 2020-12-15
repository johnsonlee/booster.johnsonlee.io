# 动态库清单

在工程规模足够复杂的项目中，要想清楚的知道哪些库引入了哪些动态库，对于开发者来说，也是一件麻烦的事件，为了方便开发者排查动态库相关的问题，*Booster 提供了 [booster-task-list-shared-library](https://github.com/didi/booster/blob/master/booster-task-list-shared-library) 模块，用于列出工程中依赖的 *AAR* 中使用的所有的动态库。

## 如何使用

在根工程的 *build.gradle* 中引入 [booster-task-list-shared-library](https://github.com/didi/booster/blob/master/booster-task-list-shared-library) 模块，如下所示：

```groovy
buildscript {
    ext {
        kotlin_version = '1.3.31'
        booster_version = '3.1.0'
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
        classpath "com.didiglobal.booster:booster-task-list-shared-library:$booster_version"
    }
}
```

然后，在命令行中执行 `listSharedLibraries` 任务：

```bash
$ ./gradlew listSharedLibraries
```
