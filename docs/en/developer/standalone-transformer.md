# Standalone Transformer

In daily development, we may need to scan certain *JAR* files, *class* files, or artifacts from the *Android Transform Pipeline* outside of the *Gradle* environment to obtain some results. For this purpose, *Booster* provides a series of utility classes and extension methods to help developers improve efficiency:

- [booster-transform-util](https://github.com/didi/booster/tree/master/booster-transform-util)

    - [transform.kt](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/transform.kt)
    - [TransformHelper.kt](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/TransformHelper.kt)

- [booster-transform-asm](https://github.com/didi/booster/tree/master/booster-transform-asm)

    - [AsmTransformer](https://github.com/didi/booster/blob/master/booster-transform-asm/src/main/kotlin/com/didiglobal/booster/transform/asm/AsmTransformer.kt)

- [booster-transform-javassist](https://github.com/didi/booster/tree/master/booster-transform-javassist)

    - [JavassistTransformer](https://github.com/didi/booster/blob/master/booster-transform-javassist/src/main/kotlin/com/didiglobal/booster/transform/javassist/JavassistTransformer.kt)


## Runtime Instrumentation

In a *Java* environment, you might need to modify certain *Class* at runtime. We can easily implement this using `Transformer`.

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

Using [TransformHelper](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/TransformHelper.kt), we can easily scan the artifacts of the *Android Transform Pipeline*:

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

Using the extension methods provided above, we can easily scan *class* files in a *JAR* file:

```kotlin
File("some.jar").transform(File("out")) { bytecode ->
    val klass = bytecode.asClassNode()
    println(klass.name)
    bytecode
}
```

Or

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

