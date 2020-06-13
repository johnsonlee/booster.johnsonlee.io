# 字节码操作

## Transformer

在 *Booster* 中，跟字节码相关的操作都是通过 [Transformer](https://github.com/didi/booster/blob/master/booster-transform-spi/src/main/kotlin/com/didiglobal/booster/transform/Transformer.kt) 来完成，它是对字节码转换的简单抽象，以字节码的二进制做为输入，经过转换后，输出字节码二进制，它与具体使用哪种字节码操作框架无关，开发者可以自己选择跟字节码操作框架相关的特定实现， *Booster* 提供了两种实现：

1. 基于 *ASM* 的实现：[AsmTransformer](https://github.com/didi/booster/blob/master/booster-transform-asm/src/main/kotlin/com/didiglobal/booster/transform/asm/AsmTransformer.kt)
1. 基于 *Javassist* 的实现：[JavassistTransformer](https://github.com/didi/booster/blob/master/booster-transform-javassist/src/main/kotlin/com/didiglobal/booster/transform/javassist/JavassistTransformer.kt)

## 自定义 Transformer

除了 [AsmTransformer](https://github.com/didi/booster/blob/master/booster-transform-asm/src/main/kotlin/com/didiglobal/booster/transform/asm/AsmTransformer.kt) 和 [JavassistTransformer](https://github.com/didi/booster/blob/master/booster-transform-javassist/src/main/kotlin/com/didiglobal/booster/transform/javassist/JavassistTransformer.kt) 外，*Booster* 允许开发者实现自己的 [Transformer](https://github.com/didi/booster/blob/master/booster-transform-spi/src/main/kotlin/com/didiglobal/booster/transform/Transformer.kt)，以 [Apache Commons BCEL](http://commons.apache.org/proper/commons-bcel/) 为例：

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
需要注意的是，带 `ClassLoader` 参数的构造方法不是必须的，但会影响在 *BcelTransformer* 中通过 `ServiceLoader` 加载自定义的 *ClassTransformer*。
:::
