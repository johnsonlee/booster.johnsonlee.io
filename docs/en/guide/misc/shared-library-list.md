# Shared Library List

In projects with sufficiently complex engineering structures, it can be troublesome for developers to know exactly which libraries have introduced which native libraries. To help developers troubleshoot issues related to native libraries, *Booster* provides the [booster-task-list-shared-library](https://github.com/didi/booster/blob/master/booster-task-list-shared-library) module for listing all native libraries used in the *AAR* dependencies of the project.

## Getting Started

Include the [booster-task-list-shared-library](https://github.com/didi/booster/blob/master/booster-task-list-shared-library) module in the root project's *build.gradle*, as shown below:

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
        classpath "com.didiglobal.booster:booster-task-list-shared-library:$booster_version"
    }
}
```

Then, execute the `listSharedLibraries` task from the command line:

```bash
$ ./gradlew listSharedLibraries
```
