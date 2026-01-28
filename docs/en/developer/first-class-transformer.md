# First ClassTransformer

## Create Project

Before writing your first *ClassTransformer*, you need a *Java* or *Kotlin* project. There are two types of project structures.

### buildSrc Project

If you already have an *Android* project, you can create a *buildSrc* directory directly in the project root directory. *Gradle* will treat *buildSrc* as a build project, compile and test it, and then add it to the *buildscript* *classpath*. For projects with multiple subprojects, there can only be one *buildSrc* directory in the project root. For complex builds, using *buildSrc* to organize build scripts is preferred.

Then create the following directory structure under the *buildSrc* directory:

```
buildSrc/
├── build.gradle
└── src
    └── main
        ├── java
        └── kotlin
```

> For *Android* developers, the *buildSrc* approach is recommended as it's easier to get started within a single project.

### Standalone Java Project

If you need to share the *ClassTransformer* across multiple *Android* projects, a standalone *Java* project would be more appropriate.

We can create a *Java* project using the *gradle* command:

```bash
$ mkdir BoosterDemo                 # Create BoosterDemo project
$ cd BoosterDemo && gradle init     # Initialize project
```

Then select the project type:

```
Starting a Gradle Daemon (subsequent builds will be faster)

Select type of project to generate:
  1: basic
  2: application
  3: library
  4: Gradle plugin
Enter selection (default: basic) [1..4]
```

Here, we select *3: library*. Next, select the language:

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

Here you can choose according to your preference: *Groovy* / *Java* / *Kotlin* / *Scala*. Let's assume we select *4: Kotlin*:

Next, select the build script *DSL*:

```
Select build script DSL:
  1: Groovy
  2: Kotlin
Enter selection (default: Kotlin) [1..2]
```

If you're not familiar with *Kotlin DSL*, you can select *1: Groovy*:

Then, enter the project name, or use the default project name (directory name):

```
Project name (default: BoosterDemo):
```

Then enter the source code package name:

```
Source package (default: BoosterDemo): io.johnsonlee.booster.demo
```

Now, the *Java Library* project is created.

```
.
├── build.gradle
├── gradle
│   └── wrapper
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
├── gradlew
├── gradlew.bat
├── settings.gradle
└── src
    ├── main
    │   ├── kotlin
    │   │   └── io
    │   │       └── johnsonlee
    │   │           └── booster
    │   │               └── Library.kt
    │   └── resources
    └── test
        ├── kotlin
        │   └── io
        │       └── johnsonlee
        │           └── booster
        │               └── LibraryTest.kt
        └── resources
```

::: tip
If using a standalone *Java Library* project, you need to publish the *Java Library* project to a Maven repository before integrating it into an Android project. For example, to publish to the local Maven repository:

```bash
./gradlew publishToMavenLocal
```
:::

## Introducing Booster

After preparing the project, add the *Booster* dependency in the *build.gradle* file of the *Java Library* project or the *buildSrc* directory of the *Android* project:

```groovy
buildscript {
    ext {
        agp_version = "4.0.0"
        booster_version = "4.16.3"
        kotlin_version = "1.5.31"
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
    api "com.android.tools.build:gradle:$agp_version"
    /* 👇👇👇👇 Reference these two modules 👇👇👇👇 */
    kapt "com.google.auto.service:auto-service:1.0"
    api "com.didiglobal.booster:booster-api:$booster_version"
}
```

## ASM-Based Class Transformer

The ASM-based *ClassTransformer* requires adding the [booster-transform-asm](https://github.com/didi/booster/tree/master/booster-transform-asm) dependency in `dependencies`:

```groovy
dependencies {
    api "com.android.tools.build:gradle:$agp_version"
    /* 👇👇👇👇 Reference these three modules 👇👇👇👇 */
    kapt "com.google.auto.service:auto-service:1.0"
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

## Javassist-Based Class Transformer

The Javassist-based *ClassTransformer* requires adding the [booster-transform-javassist](https://github.com/didi/booster/tree/master/booster-transform-javassist) dependency in `dependencies`:

```groovy
dependencies {
    api "com.android.tools.build:gradle:$agp_version"
    /* 👇👇👇👇 Reference these three modules 👇👇👇👇 */
    kapt "com.google.auto.service:auto-service:1.0"
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

## Configuring Android Project

At this point, the first *ClassTransformer* is basically complete. Next, configure *Booster* in the *build.gradle* of the *Android* project:

```groovy
buildscript {
    ext {
        agp_version = "4.0.0"
        booster_version = "4.16.3"
        kotlin_version = "1.5.31"
    }
    repositories {
        mavenCentral()
        google()
    }
    dependencies {
        classpath "com.android.tools.build:gradle:$agp_version"
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"

        /* 👇👇👇👇 Reference Booster Gradle plugin 👇👇👇👇 */
        classpath "com.didiglobal.booster:booster-gradle-plugin:$booster_version"
    }
}

allprojects {
    repositories {
        mavenCentral()
        google()
    }
}

apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'

/* 👇👇👇👇 Apply Booster plugin 👇👇👇👇 */
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

## Verifying the FirstClassTransformer

In the *Android* project, execute the *assemble* task:

```bash
$ ./gradlew assembleDebug
```

Observe the console standard output to see if it contains content like:

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
