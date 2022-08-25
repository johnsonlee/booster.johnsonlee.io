# 快速上手（进阶版）

## 无侵入集成

通过 *Gradle* 提供的 [Initialization Scripts](https://docs.gradle.org/current/userguide/init_scripts.html)，这样可以在不修改工程的代码的情况下集成 *Booster* 实现完全无侵入的性能优化，尤其是在 *CI* 环境中。

*Gradle* 支持两类接入 [Initialization Scripts](https://docs.gradle.org/current/userguide/init_scripts.html) 的方式：

1. 命令行参数
    - 通过 `-I` 或者 `--init-script` 指定 [Initialization Scripts](https://docs.gradle.org/current/userguide/init_scripts.html) 文件，这种方式比较灵活，而且能控制 [Initialization Scripts](https://docs.gradle.org/current/userguide/init_scripts.html) 的影响范围。
1. *Gradle* 目录
    - 在 `USER_HOME/.gradle/` 目录下配置 `init.gradle` 文件
    - 在 `USER_HOME/.gradle/init.d/` 目录下配置扩展名为 `.gradle` 的文件（*Kotlin* 则为 `.init.gradle.kts`）
    - 在 `USER_HOME/init.d/` 目录下配置扩展名为 `.gradle` 的文件（*Kotlin* 则为 `.init.gradle.kts`）

以线程优化为例，在工程根目录创建 `init.gradle` 文件，其内容如下：

<CodeGroup>
  <CodeGroupItem title="Groovy" active>

```groovy
allprojects { project ->
    buildscript {
        ext.booster_version = "4.13.0"
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
        val booster_version = "4.13.0"
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

这样，就可以通过命令行指定 [Initialization Scripts](https://docs.gradle.org/current/userguide/init_scripts.html) 参数的方式集成 *Booster* 了：

```bash
./gradlew -I init.gradle assembleDebug
```

当然，也可以通过 *Gradle* 目录的方式来接入 *Booster*。