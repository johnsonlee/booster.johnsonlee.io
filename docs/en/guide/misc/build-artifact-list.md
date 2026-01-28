# Build Artifact List

When developing *Gradle* plugins for *Android* projects, internal *API*s are often used. Understanding the details of the *Android* build process and internal implementations is necessary to insert specific *Task*s at the appropriate time to obtain intermediate artifacts from *AGP*. To help *Gradle Plugin* developers, *Booster* provides the [booster-task-list-artifact](https://github.com/didi/booster/blob/master/booster-task-list-artifact) module for listing the build intermediate artifacts of *Android* projects.

## Getting Started

Include the [booster-task-list-artifact](https://github.com/didi/booster/blob/master/booster-task-list-artifact) module in the root project's *build.gradle*, as shown below:

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
        classpath "com.didiglobal.booster:booster-task-list-artifact:$booster_version"
    }
}
```

Then, execute the `listArtifacts` task from the command line:

```bash
$ ./gradlew listArtifacts
```
