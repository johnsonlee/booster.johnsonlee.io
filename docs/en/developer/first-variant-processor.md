# Frist VariantProcessor

## Introducing Booster

准备好工程后，接下来在 *Java Library* 工程或者 *Android* 工程的 *buildSrc* 目录中的 *build.gradle* 文件中，引入 *Booster* 依赖：

```groovy
buildscript {
    ext {
        agp_version = '3.5.0'
        kotlin_version = '1.3.31'
        booster_version = '4.9.0'
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
    /* 👇👇👇👇 引用这三个模块 👇👇👇👇 */
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
`VariantProcessor` 构造方法中的 `Project` 参数是可选的
:::

## Verifying FirstVariantProcessor

在 *Android* 工程下，执行 *assemble* 任务：

```bash
$ ./gradlew assembleDebug
```

观察控制台的标准输出，是否有如下内容：

```
app: debug
app: release
```

