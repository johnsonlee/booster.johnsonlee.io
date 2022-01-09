# FAQ

在使用 *Booster* 的过程中，可能会遇到一些问题，以下列举了一些常见问题及解决办法。

## NoSuchMethodError: kotlin.io.ByteStreamKt.readBytes(Ljava/io/InputStream;)[B

::: tip
升级 *Kotlin* 版本至 `1.3.10` 或更高

```groovy
classpath 'org.jetbrains.kotlin:kotlin-gradle-plugin:1.3.10'
```
:::

## NoSuchFieldError: JAVA_LETTER_OR_DIGIT

::: tip
*Android Gradle Plugin* 依赖的 *Guava* 版本低于 `26.0` 而其它库依赖了 *Guava* `26.0` 以上的版本

`CharMatcher.JAVA_LETTER_OR_DIGIT` 在 *Guava* `26.0` 版本中被移除

- 升级 *Android Gradle Plugin* 版本

    ```groovy
    classpath 'com.android.tools.build:gradle:3.3.0'
    ```
:::

## IllegalAccessError: tried to access method com.google.common.io.Files.fileTreeTraverser()

::: tip
*Android Gradle Plugin* 依赖的 *Guava* 版本低于 `25.0`

`com.google.common.io.Files.fileTreeTraverser()` 在 *Guava*  `25.0` 版本中被移除

检查项目中引用的 *Guava* 版本是否正确，确保构建脚本依赖的是 *Guava* 的 *JRE* 版本
:::

## NoSuchFieldError: ASCII

::: tip
- 升级 *Android Gradle Plugin* 版本

    ```groovy
    classpath 'com.android.tools.build:gradle:3.4.2'
    ```

- 升级 *Gradle Wrapper* 版本

    ```properties
    distributionUrl=https\://services.gradle.org/distributions/gradle-5.1.1-all.zip
    ```

- 升级 *Kotlin* 版本至 `1.3.10` 或更高

    ```groovy
    classpath 'org.jetbrains.kotlin:kotlin-gradle-plugin:1.3.10'
    ```
:::

## 如何检查引用的 *Guava* 版本

::: tip
执行 *buildEnv* 任务查看工程 *build* 脚本的依赖：

```bash
$ ./gradlew buildEnv
```
:::

## 移除 Booster 依赖的 Guava 版本

如果以上所有方法都想升级 *Android Gradle Plugin* 版本，考虑将 *Guava* 从 *Booster* 的依赖中排除：

::: tip
```gradle
classpath("com.didiglobal.booster:booster-gradle-plugin:${booster_version}") {
    exclude group: 'com.google.guava'
}
```
:::