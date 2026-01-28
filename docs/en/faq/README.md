# FAQ

When using *Booster*, you may encounter some issues. Below are some common problems and their solutions.

## NoSuchMethodError: kotlin.io.ByteStreamKt.readBytes(Ljava/io/InputStream;)[B

::: tip
Upgrade the *Kotlin* version to `1.3.10` or higher

```groovy
classpath 'org.jetbrains.kotlin:kotlin-gradle-plugin:1.3.10'
```
:::

## NoSuchFieldError: JAVA_LETTER_OR_DIGIT

::: tip
The *Guava* version required by *Android Gradle Plugin* is lower than `26.0`, while other libraries depend on *Guava* version `26.0` or higher

`CharMatcher.JAVA_LETTER_OR_DIGIT` was removed in *Guava* version `26.0`

- Upgrade the *Android Gradle Plugin* version

    ```groovy
    classpath 'com.android.tools.build:gradle:3.3.0'
    ```
:::

## IllegalAccessError: tried to access method com.google.common.io.Files.fileTreeTraverser()

::: tip
The *Guava* version required by *Android Gradle Plugin* is lower than `25.0`

`com.google.common.io.Files.fileTreeTraverser()` was removed in *Guava* version `25.0`

Check whether the *Guava* version referenced in your project is correct, and ensure that the build script depends on the *JRE* version of *Guava*
:::

## NoSuchFieldError: ASCII

::: tip
- Upgrade the *Android Gradle Plugin* version

    ```groovy
    classpath 'com.android.tools.build:gradle:3.4.2'
    ```

- Upgrade the *Gradle Wrapper* version

    ```properties
    distributionUrl=https\://services.gradle.org/distributions/gradle-5.1.1-all.zip
    ```

- Upgrade the *Kotlin* version to `1.3.10` or higher

    ```groovy
    classpath 'org.jetbrains.kotlin:kotlin-gradle-plugin:1.3.10'
    ```
:::

## How to Check the Referenced *Guava* Version

::: tip
Run the *buildEnv* task to view the dependencies of the project's *build* script:

```bash
$ ./gradlew buildEnv
```
:::

## Remove the Guava Version Dependency from Booster

If all the above methods do not work and you do not want to upgrade the *Android Gradle Plugin* version, consider excluding *Guava* from *Booster*'s dependencies:

::: tip
```gradle
classpath("com.didiglobal.booster:booster-gradle-plugin:${booster_version}") {
    exclude group: 'com.google.guava'
}
```
:::
