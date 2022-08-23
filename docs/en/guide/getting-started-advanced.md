# Getting Started (Advanced)

## Integrating by Init Script

Through the [Initialization Scripts](https://docs.gradle.org/current/userguide/init_scripts.html) provided by Gradle, Booster can be integrated to optimize app performance and stability non-intrusively without modifying the existing code, especially in the CI environment.

Gradle support integration by [Initialization Scripts](https://docs.gradle.org/current/userguide/init_scripts.html) in two forms:

1. Command Line Option
    - Use option `-I` or `--init-script` to specify the [Initialization Scripts](https://docs.gradle.org/current/userguide/init_scripts.html) file on the command line, it's flexible and able to limit the scope of [Initialization Scripts](https://docs.gradle.org/current/userguide/init_scripts.html)
1. Gradle Directory
    - Put a file called `init.gradle` (or `init.gradle.kts` for Kotlin) in the `USER_HOME/.gradle/` directory.
    - Put a file that ends with `.gradle` (or `.init.gradle.kts` for Kotlin) in the `USER_HOME/.gradle/init.d/` directory.
    - Put a file that ends with `.gradle` (or `.init.gradle.kts` for Kotlin) in the `USER_HOME/init.d/` directory.

> [https://docs.gradle.org/current/userguide/init_scripts.html#sec:using_an_init_script](https://docs.gradle.org/current/userguide/init_scripts.html#sec:using_an_init_script)

Take the multi-threading optimizationas the example, creating a file called `init.gradle` in the root project directory with the content shown as below:


<CodeGroup>
  <CodeGroupItem title="Groovy" active>

```groovy
allprojects { project ->
    buildscript {
        ext.booster_version = "4.12.0"
        repositories {
            google()
            mavenCentral()
        }
        dependencies {
            classpath "com.didiglobal.booster:booster-gradle-plugin:$booster_version"
            classpath "com.didiglobal.booster:booster-transform-thread:$booster_version"
        }
    }
    repositories {
        google()
        mavenCentral()
    }
    project.afterEvaluate {
        if (project.extensions.findByName('android') != null) {
            project.apply plugin: 'com.didiglobal.booster'
        }
    }
}
```

  </CodeGroupItem>
  <CodeGroupItem title="Kotlin">

```kotlin
allprojects { project ->
    buildscript {
        val booster_version = "4.12.0"
        repositories {
            google()
            mavenCentral()
        }
        dependencies {
            classpath("com.didiglobal.booster:booster-gradle-plugin:$booster_version")
            classpath("com.didiglobal.booster:booster-transform-thread:$booster_version")
        }
    }
    repositories {
        google()
        mavenCentral()
    }
    project.afterEvaluate {
        if (project.extensions.getByName("android") != null) {
            project.plugins.apply("com.didiglobal.booster")
        }
    }
}
```

  </CodeGroupItem>
</CodeGroup>

So that we can integrate with Booster by specifying the [Initialization Scripts](https://docs.gradle.org/current/userguide/init_scripts.html) option on command line：

```bash
./gradlew -I init.gradle assembleDebug
```

It's also OK to integrate with Booster by using *Gradle* directory.
