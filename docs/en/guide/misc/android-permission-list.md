# Android Permission List

In projects with sufficiently complex engineering structures, it's not a simple task to know exactly which libraries use which permissions. To help developers troubleshoot permission-related issues, *Booster* provides the [booster-task-list-permission](https://github.com/didi/booster/blob/master/booster-task-list-permission) module for listing all *Android* permissions used in the *AAR* dependencies of the project.

## Getting Started

Include the [booster-task-list-permission](https://github.com/didi/booster/blob/master/booster-task-list-permission) module in the root project's *build.gradle*, as shown below:

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
        classpath "com.didiglobal.booster:booster-task-list-permission:$booster_version"
    }
}
```

Then, execute the `listPermissions` task from the command line:

```bash
$ ./gradlew listPermissions
```
