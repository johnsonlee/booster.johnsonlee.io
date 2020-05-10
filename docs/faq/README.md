# FAQ

在使用 *Booster* 的过程中，可能会遇到一些问题，以下列举了一些常见问题及解决办法。

## java.lang.NoSuchMethodError: kotlin.io.ByteStreamKt.readBytes(Ljava/io/InputStream;)[B

升级 *Kotlin* 版本至 `1.3.10` 或更高

```groovy
classpath 'org.jetbrains.kotlin:kotlin-gradle-plugin:1.3.10'
```

## java.lang.NoSuchFieldError: ASCII

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
