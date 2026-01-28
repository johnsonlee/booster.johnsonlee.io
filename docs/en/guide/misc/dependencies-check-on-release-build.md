# Release Build Dependency Check

In the daily release process of an *APP*, version rollbacks are sometimes necessary for various reasons. Although *Tags* are created on *Git* before release, rolling back to the original *Tag* doesn't guarantee building an *APK* identical to the original one, even on the same machine. One important factor affecting rollbacks is dependency version management. Why is dependency version management so important? Let's illustrate with a story.

> A certain *APP* in version *v1.2.0* depended on the *libsecurity* library with version *1.0.0-SNAPSHOT*. Subsequently, the *APP* was about to release *v1.3.0*, which depended on *libsecurity* library version *1.0.1-SNAPSHOT*. After gray release testing showed no obvious issues, full release began. However, during the rollout, a new crash was discovered that was increasing rapidly. Investigation revealed it was caused by a native library in *libsecurity*, so the *libsecurity* version had to be rolled back to the previous version - *1.0.0-SNAPSHOT*. After rollback, gray release still showed no issues, and full release began again. During full release, the same crash as before appeared again.

At this point, some might ask: wasn't the previous version working fine? Why would a crash that appeared in the new version appear in the old version after rolling back?

Investigation revealed that the *libsecurity* library maintainer had published the *features* from *1.0.1-SNAPSHOT* to the *Maven* repository using the *1.0.0-SNAPSHOT* version number, causing the original *1.0.0-SNAPSHOT* to contain new code. Therefore, even after rolling back to the original version, the problem persisted.

## The Solution

In regular development iterations, if *Code Review* isn't thorough enough, situations like the above can easily occur where *SNAPSHOT* versions are released to production. To conveniently solve this problem, *Booster* provides the [booster-task-check-snapshot](https://github.com/didi/booster/blob/master/booster-task-check-snapshot) module for checking dependency library versions in *Release* builds to avoid depending on *SNAPSHOT* version libraries:

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
                println("$CSI_YELLOW Warning: ${snapshots.size} SNAPSHOT artifacts found in ${variant.name} variant:$CSI_RESET\n${snapshots.joinToString("\n") { snapshot -> "$CSI_YELLOW->  ${snapshot.displayName}$CSI_RESET" }}")
            }
        }
    }

}
```

## Getting Started

To enable *SNAPSHOT* checking, simply include the [booster-task-check-snapshot](https://github.com/didi/booster/blob/master/booster-task-check-snapshot) module in the root project's *build.gradle*, as shown below:

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
        classpath "com.didiglobal.booster:booster-task-check-snapshot:$booster_version"
    }
}
```

Then, execute the `checkSnapshot` task from the command line:

```bash
$ ./gradlew checkSnapshot
```
