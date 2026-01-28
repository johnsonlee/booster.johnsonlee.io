# Bytecode Manipulation

## Transformer

In *Booster*, all bytecode-related operations are performed through [Transformer](https://github.com/didi/booster/blob/master/booster-transform-spi/src/main/kotlin/com/didiglobal/booster/transform/Transformer.kt), which is a simple abstraction for bytecode transformation. It takes bytecode binary as input and outputs transformed bytecode binary. It is independent of which bytecode manipulation framework is used, allowing developers to choose specific implementations related to their preferred bytecode framework. *Booster* provides two implementations:

1. ASM-based implementation: [AsmTransformer](https://github.com/didi/booster/blob/master/booster-transform-asm/src/main/kotlin/com/didiglobal/booster/transform/asm/AsmTransformer.kt)
1. Javassist-based implementation: [JavassistTransformer](https://github.com/didi/booster/blob/master/booster-transform-javassist/src/main/kotlin/com/didiglobal/booster/transform/javassist/JavassistTransformer.kt)

## Custom Transformer

In addition to [AsmTransformer](https://github.com/didi/booster/blob/master/booster-transform-asm/src/main/kotlin/com/didiglobal/booster/transform/asm/AsmTransformer.kt) and [JavassistTransformer](https://github.com/didi/booster/blob/master/booster-transform-javassist/src/main/kotlin/com/didiglobal/booster/transform/javassist/JavassistTransformer.kt), *Booster* allows developers to implement their own [Transformer](https://github.com/didi/booster/blob/master/booster-transform-spi/src/main/kotlin/com/didiglobal/booster/transform/Transformer.kt). Here's an example using [Apache Commons BCEL](http://commons.apache.org/proper/commons-bcel/):

```kotlin
interface ClassTransformer : TransformerListener {

    fun transform(context: TransformContext, klass: JavaClass) = klass

}

@AutoService(Transformer::class)
class BcelTransformer(val classLoader: ClassLoader) : Transformer {

    private val transformers = ServiceLoader.load(ClassTransformer::class.java, classLoader).sortedBy {
        it.javaClass.getAnnotation(Priority::class.java)?.value ?: 0
    }

    override fun onPreTransform(context: TransformContext) {
        this.transformers.forEach { transformer ->
            transformer.onPreTransform(context)
        }
    }

    override fun onPostTransform(context: TransformContext) {
        this.transformers.forEach { transformer ->
            transformer.onPostTransform(context)
        }
    }

    override fun transform(context: TransformContext, bytecode: ByteArray): ByteArray {
        return ClassParser(bytecode.inputStream(), "").parse().run { klass ->
            TODO("Transform JavaClass with BCEL")
        }.getBytes()
    }

}
```

::: tip
Note that the constructor with `ClassLoader` parameter is not required, but it will affect loading custom *ClassTransformer* via `ServiceLoader` in *BcelTransformer*.
:::
