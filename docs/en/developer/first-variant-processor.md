# Frist VariantProcessor

## Introducing Booster

After preparing the project, add the *Booster* dependency in the *build.gradle* file of the *Java Library* project or the *buildSrc* directory of the *Android* project:

```groovy
buildscript {
    ext {
        agp_version = "3.5.0"
        kotlin_version = "1.5.31"
        booster_version = "4.16.3"
    }
    repositories {
        mavenCentral()
        google()
    }
    dependencies {
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
}

apply plugin: 'kotlin'
apply plugin: 'kotlin-kapt'

repositories {
    mavenCentral()
    google()
}

sourceSets {
    main {
        java {
            srcDirs += []
        }
        kotlin {
            srcDirs += ['src/main/kotlin', 'src/main/java']
        }
    }
    test {
        java {
            srcDirs += []
        }
        kotlin {
            srcDirs += ['src/main/kotlin', 'src/main/java']
        }
    }
}

compileKotlin {
    kotlinOptions.jvmTarget = JavaVersion.VERSION_1_8
}

compileTestKotlin {
    kotlinOptions.jvmTarget = JavaVersion.VERSION_1_8
}

dependencies {
    api gradleApi()
    /* 👇👇👇👇 Reference these three modules 👇👇👇👇 */
    kapt "com.google.auto.service:auto-service:1.0"
    api 'com.android.tools.build:gradle:$agp_version'
    api "com.didiglobal.booster:booster-api:$booster_version"
}
```

## Custom VariantProcessor

```kotlin
package io.johnsonlee.booster.demo

import com.android.build.gradle.api.BaseVariant
import com.didiglobal.booster.gradle.project
import com.didiglobal.booster.task.spi.VariantProcessor
import com.google.auto.service.AutoService

@AutoService(VariantProcessor::class)
class SimpleVariantProcessor(val project: Project) : VariantProcessor {

    init {
        println("${project.name}")
    }

    override fun process(variant: BaseVariant) {
        println("${variant.project.name}: ${variant.name}")
    }

}
```

::: tip
The `Project` parameter in the `VariantProcessor` constructor is optional.
:::

## Verifying FirstVariantProcessor

In the *Android* project, execute the *assemble* task:

```bash
$ ./gradlew assembleDebug
```

Observe the console standard output to see if it contains content like:

```
app: debug
app: release
```

