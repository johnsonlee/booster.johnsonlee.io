# Standalone Transformer

在平常的开发过程中，我们可能需要脱离 *Gradle* 环境，对某些个 *JAR*、 *class* 文件或者是 *Android Transform Pipeline* 的产物进行扫描来得到一些结果，鉴于此，*Booster* 提供了一系列实用工具类和扩展方法，来帮助开发者提升效率：

- [booster-transform-util](https://github.com/didi/booster/tree/master/booster-transform-util)

    - [transform.kt](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/transform.kt)
    - [TransformHelper.kt](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/TransformHelper.kt)

- [booster-transform-asm](https://github.com/didi/booster/tree/master/booster-transform-asm)

    - [AsmTransformer](https://github.com/didi/booster/blob/master/booster-transform-asm/src/main/kotlin/com/didiglobal/booster/transform/asm/AsmTransformer.kt)

- [booster-transform-javassist](https://github.com/didi/booster/tree/master/booster-transform-javassist)

    - [JavassistTransformer](https://github.com/didi/booster/blob/master/booster-transform-javassist/src/main/kotlin/com/didiglobal/booster/transform/javassist/JavassistTransformer.kt)


## Runtime Instrumentation

一般在 *Java* 环境中，可能会需要在运行时修改某些特定的 *Class* ，我们可以通过 `Transformer` 很容易的实现。

### Custom ClassLoader

```kotlin
class TransformerClassLoader : URLClassLoader {

    private val transformer: Transformer

    constructor(
            delegate: URLClassLoader,
            factory: (ClassLoader) -> Transformer
    ) : super(delegate.urLs) {
        this.transformer = factory(this)
    }

    constructor(
            delegate: URLClassLoader,
            factory: (ClassLoader, Iterable<Transformer>) -> Transformer,
            vararg transformer: Transformer
    ) : super(delegate.urLs) {
        this.transformer = factory(this, transformer.asIterable())
    }

    private val classpath: Collection<File> by lazy {
        this.urLs.map { File(it.path) }
    }

    private val context: TransformContext by lazy {
        object : AbstractTransformContext(javaClass.name, javaClass.name, emptyList(), classpath, classpath) {}
    }

    override fun findClass(name: String): Class<*> {
        val bytecode = transformer.run {
            try {
                onPreTransform(context)
                getResourceAsStream("${name.replace('.', '/')}.class")?.use(InputStream::readBytes)?.let {
                    transform(context, it)
                } ?: throw IOException("Read class $name failed")
            } finally {
                onPostTransform(context)
            }
        }

        return defineClass(name, bytecode, 0, bytecode.size)
    }

}
```

### Using ASM

```kotlin
val delegate = Thread.currentThread().contextClassLoader as URLClassLoader
val tcl = TransformerClassLoader(delegate) {
    AsmTransformer(it)
}
Class.forName("io.johnsonlee.booster.SimpleClass", tcl)
```

### Using Javassist

```kotlin
val delegate = Thread.currentThread().contextClassLoader as URLClassLoader
val tcl = TransformerClassLoader(delegate) {
    JavassistTransformer(it)
}
Class.forName("io.johnsonlee.booster.SimpleClass", tcl)
```

## Analysing Intermediate Artifacts

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

## Analysing JAR File

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

## Analysing Class File

```kotlin
val klass = File("Some.class").asClassNode()
println(klass.name)
```

