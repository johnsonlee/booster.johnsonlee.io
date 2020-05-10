# 脱离 *Gradle* 环境

在平常的开发过程中，我们可能需要脱离 *Gradle* 环境，对某些个 *JAR*、 *class* 文件或者是 *Android Transform Pipeline* 的产物进行扫描来得到一些结果，鉴于此，*Booster* 提供了一系列实用工具类和扩展方法，来帮助开发者提升效率：

- [booster-transform-util](https://github.com/didi/booster/tree/master/booster-transform-util)

    - [transform.kt](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/transform.kt)
    - [TransformHelper.kt](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/TransformHelper.kt)

- [booster-transform-asm](https://github.com/didi/booster/tree/master/booster-transform-asm)

    - [AsmTransformer](https://github.com/didi/booster/blob/master/booster-transform-asm/src/main/kotlin/com/didiglobal/booster/transform/asm/AsmTransformer.kt)


## 扫描 *Android Transform Pipeline* 的产物

通过 [TransformHelper](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/TransformHelper.kt)，我们就可以很方便对 *Android Transform Pipeline* 的产物进行扫描：

```kotlin
val variant = "debug"
val input = File("build").file("intermediates", "transforms", "booster", variant)
val output = File(System.getProperty("java.io.tmpdir"))

TransformHelper(input).transform(output, AsmTransformer(object : ClassTransformer {
    override fun transform(context: TransformContext, klass: ClassNode): ClassNode {
        println(klass.name)
        return klass
    }
}))
```

## 扫描 *JAR* 文件

通过上面提供的扩展方法，我们可以很方便的扫描 *JAR* 文件中的 *class*：

```kotlin
File("some.jar").transform(File("out")) { bytecode ->
    val klass = bytecode.asClassNode()
    println(klass.name)
    bytecode
}
```

或者

```kotlin
JarFile("some.jar").use { jar ->
    jar.entries().iterator().forEach { entry ->
        jar.transform(entry.name) { klass ->
            println(klass.name)
        }
    }
}
```

## 扫描 *class* 文件

```kotlin
val klass = File("Some.class").asClassNode()
println(klass.name)
```
