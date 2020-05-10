# 第一个 ClassTransformer

## 创建工程

在写第一个 *ClassTransformer* 之前，需要有一个 *Java* 或 *Kotlin* 工程，这里有两种工程形式。

### 独立的 Java 工程

我们可以通过 *gradle* 命令，来创建一个 *Java* 工程：

```bash
$ mkdir BoosterDemo                 # 创建 BoosterDemo 工程 
$ cd BoosterDemo && gradle init     # 初始化工程
```

然后选择工程类型：

```
Starting a Gradle Daemon (subsequent builds will be faster)

Select type of project to generate:
  1: basic
  2: application
  3: library
  4: Gradle plugin
Enter selection (default: basic) [1..4]
```

这里，我们选择 *3: library*，接下来，选择语言：

```
Select implementation language:
  1: C++
  2: Groovy
  3: Java
  4: Kotlin
  5: Scala
  6: Swift
Enter selection (default: Java) [1..6]
```

这里可以根据自己的喜好选择： *Groovy* / *Java* / *Kotlin* ／ *Scala* 其中之一，假设，我们选择 *4: Kotlin*：

接下来，选择构建脚本的 *DSL*：

```
Select build script DSL:
  1: Groovy
  2: Kotlin
Enter selection (default: Kotlin) [1..2]
```

如果对 *Kotlin DSL* 不太熟的话，可以选择 *1: Groovy*：

然后，输入工程名，或者用默认的工程名（目录名）：

```
Project name (default: BoosterDemo):
```

然后输入源代码的包名：

```
Source package (default: BoosterDemo): io.johnsonlee.booster.demo
```

这样，*Java Library* 工程就创建好了。

```
.
├── build.gradle
├── gradle
│   └── wrapper
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── gradlew
├── gradlew.bat
├── settings.gradle
└── src
    ├── main
    │   ├── kotlin
    │   │   └── io
    │   │       └── johnsonlee
    │   │           └── booster
    │   │               └── Library.kt
    │   └── resources
    └── test
        ├── kotlin
        │   └── io
        │       └── johnsonlee
        │           └── booster
        │               └── LibraryTest.kt
        └── resources
```

### buildSrc 工程

如果已经有一个 *Android* 工程了，可能直接在工程根目录新建一个 *buildSrc* 目录，*Gradle* 会把 *buildSrc* 当作构建工程，对它进行编译和测试，然后将其加入 *buildscript* 的 *classpath* 中，对于有多个子程的项目来说，只能有一个 *buildSrc* 目录位于工程根目录，对于复杂的构建来说，优先选择通过 *buildSrc* 来组织构建脚本。

然后在 *buildSrc* 目录下，创建如下目录结构：

```
buildSrc/
├── build.gradle
└── src
    └── main
        ├── java
        └── kotlin
```

> 对于 *Android* 开发者来说，推荐用 *buildSrc* 的方式，这样在一个工程中，上手更容易。

## 引入 *Booster*

准备好工程后，接下来在 *Java Library* 工程或者 *Android* 工程的 *buildSrc* 目录中的 *build.gradle* 文件中，引入 *Booster* 依赖：

```groovy
buildscript {
    ext {
        kotlin_version = '1.3.31'
        booster_version = '1.6.0'
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
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
}

apply plugin: 'kotlin'
apply plugin: 'kotlin-kapt'

repositories {
    mavenLocal()
    mavenCentral()
    google()
    jcenter()
    maven { url 'https://oss.sonatype.org/content/repositories/public/' }
    maven { url 'https://oss.sonatype.org/content/repositories/snapshots/' }
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
    /* 👇👇👇👇 引用这两个模块 👇👇👇👇 */
    kapt "com.google.auto.service:auto-service:1.0-rc6"
    api "com.didiglobal.booster:booster-api:$booster_version"
}
```

## 基于 ASM

基于 *ASM* 的 *ClassTransformer* 需要在 `dependencies` 中引入 [booster-transform-asm](https://github.com/didi/booster/tree/master/booster-transform-asm) 依赖：

```groovy
dependencies {
    /* 👇👇👇👇 引用这三个模块 👇👇👇👇 */
    kapt "com.google.auto.service:auto-service:1.0-rc6"
    api "com.didiglobal.booster:booster-api:$booster_version"
    api "com.didiglobal.booster:booster-transform-asm:$booster_version"
}
```

```kotlin
package io.johnsonlee.booster.demo

import com.didiglobal.booster.transform.TransformContext
import com.didiglobal.booster.transform.asm.ClassTransformer
import org.objectweb.asm.tree.ClassNode
import com.google.auto.service.AutoService

@AutoService(ClassTransformer::class)
class FirstClassTransformer : ClassTransformer {

    override fun transform(context: TransformContext, klass: ClassNode): ClassNode {
        println("Transforming ${klass.name}")
        return klass
    }

}
```

## 基于 Javassist

基于 *Javassist* 的 *ClassTransformer* 需要在 `dependencies` 中引入 [booster-transform-javassist](https://github.com/didi/booster/tree/master/booster-transform-javassist) 依赖：

```groovy
dependencies {
    /* 👇👇👇👇 引用这三个模块 👇👇👇👇 */
    kapt "com.google.auto.service:auto-service:1.0-rc6"
    api "com.didiglobal.booster:booster-api:$booster_version"
    api "com.didiglobal.booster:booster-transform-javassist:$booster_version"
}
```

```kotlin
package io.johnsonlee.booster.demo

import com.didiglobal.booster.transform.TransformContext
import com.didiglobal.booster.transform.javassist.ClassTransformer
import com.google.auto.service.AutoService
import javassist.CtClass

@AutoService(ClassTransformer::class)
class FirstClassTransformer : ClassTransformer {

    override fun transform(context: TransformContext, klass: CtClass): CtClass {
        println("Transforming ${klass.name}")
        return klass
    }

}
```

## 配置 *Android* 工程

至此，第一个 *ClassTransformer* 基本完成，接下来在 *Android* 工程的 *build.gradle* 中配置 *Booster*：

```groovy
buildscript {
    ext {
        kotlin_version = '1.3.31'
        booster_version = '1.6.0'
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

        /* 👇👇👇👇 引用 Booster Gradle 插件 👇👇👇👇 */
        classpath "com.didiglobal.booster:booster-gradle-plugin:$booster_version"
    }
}

allprojects {
    repositories {
        mavenLocal()
        mavenCentral()
        google()
        jcenter()
        maven { url 'https://oss.sonatype.org/content/repositories/public/' }
        maven { url 'https://oss.sonatype.org/content/repositories/snapshots/' }
    }
}

apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'

/* 👇👇👇👇 应用 Booster 插件 👇👇👇👇 */
apply plugin: 'com.didiglobal.booster'

android {
    compileSdkVersion 28
    buildToolsVersion "26.0.3"
    defaultConfig {
        applicationId 'io.johnsonlee.booster.demo'
        minSdkVersion 18
        targetSdkVersion 26
        versionCode 1
        versionName '1.0'
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        debug {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}

tasks.withType(org.jetbrains.kotlin.gradle.tasks.KotlinCompile).all {
    kotlinOptions {
        jvmTarget = "1.8"
    }
}

dependencies {
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
    implementation "androidx.appcompat:appcompat:${jetpack_appcompat_version}"
}
```

## 验证 *FirstClassTransformer*

在 *Android* 工程下，执行 *assemble* 任务：

```bash
$ ./gradlew assembleDebug
```

观察控制台的标准输出，是否有如下内容：

```
Transforming kotlinx/android/parcel/TypeParceler
Transforming androidx/appcompat/graphics/drawable/AnimatedStateListDrawableCompat$1
Transforming androidx/appcompat/app/ActionBar$NavigationMode
Transforming kotlinx/android/parcel/WriteWith
Transforming kotlinx/android/parcel/IgnoredOnParcel
Transforming kotlinx/android/parcel/RawValue
Transforming kotlinx/android/parcel/Parcelize
Transforming androidx/appcompat/app/ActionBar$DisplayOptions
Transforming kotlinx/android/extensions/LayoutContainer
Transforming androidx/appcompat/app/ActionBarDrawerToggle$Delegate
Transforming androidx/appcompat/app/ActionBar$TabListener
Transforming androidx/appcompat/app/ActionBar$OnMenuVisibilityListener
Transforming kotlin/jvm/internal/Ref$DoubleRef
......
```
