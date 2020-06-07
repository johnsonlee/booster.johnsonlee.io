# 选择字节码操作框架

## ASM vs Javassist

很多开发者在选择字节码操作框架之初，都会有所疑惑，到底是选择 *Javassist* 呢？还是 *ASM* 呢？我们可能从以下几个方面来对比一下两者之间的差异，以及适用范围：

| 特性           | Javassist                                | ASM                                      |
|:---------------|:-----------------------------------------|:-----------------------------------------|
| 包大小         | 771 KB (3.27)                            | 265 KB (6.0 BETA)                        |
| 性能           | 劣于 *ASM*                               | 优于 *Javassist*                         |
| API 封装程度   | 高                                       | 低                                       |
| 功能完备程度   | 完备                                     | 完备                                     |
| 对开发者的要求 | 基本了解 *class* 文件格式和 *JVM* 指令集 | 需要精通 *class* 文件格式和 *JVM* 指令集 |
| 学习曲线       | 平缓                                     | 陡峭                                     |
| 文档及手册     | 简单明了                                 | 有些繁琐（Vistor 模式让初学者有点懵）    |

从上面的对比来看，我想各位读者已经有所选择，对我个人而言，如果是初学者，建议选择 *Javassist*，毕竟上手快，学习起来比较容易，如果是对性能、包体积方面要求比较高，建议选择 *ASM*。

所以，为了照顾到尽可能多的开发者，*Booster* 对两者都做了支持，看过 *Booster* 的源码的同学可能会问，为什么 *Booster* 的大部分实现都是基于 *ASM* 呢？究竟有哪些考量？

## ASM & Javassist 性能测试

*Booster* 最初在选择字节码操作框架的时候，最主要的考量因素是性能，*Booster* 作为质量优化框架，不仅自身模块在性能上要求做到极致，也要让其他开发者基于 *Booster* 开发的功能在性能上也要表现卓越，所以，针对 *Javassist* 和 *ASM* 在字节码处理方面的性能作了 *benchmark* 测试，以下是通过处理 *guava-28.2-jre.jar* 来对比二者之间的性能：

```kotlin
@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.MILLISECONDS)
@Fork(value = 2, jvmArgs = ["-Xms2G", "-Xmx2G"])
@State(Scope.Benchmark)
open class JavassistVsAsmBenchmark {

    private lateinit var file: File

    @Setup
    fun setup() {
        this.file = File.createTempFile("guava-", "-28.2-jre.jar")
        javaClass.classLoader.getResourceAsStream("guava-28.2-jre.jar").use { input ->
            file.outputStream().use { output ->
                input!!.copyTo(output)
            }
        }
    }

    @Benchmark
    fun transformJarUsingAsm() {
        TransformHelper(this.file, AndroidSdk.getAndroidJar().parentFile)
                .transform(transformers = *arrayOf(AsmTransformer(AsmThreadTransformer())))
    }

    @Benchmark
    fun transformJarUsingJavassist() {
        TransformHelper(this.file, AndroidSdk.getAndroidJar().parentFile)
                .transform(transformers = *arrayOf(JavassistTransformer(JavassistThreadTransformer())))
    }

    @TearDown
    fun teardown() {
        this.file.delete()
    }

}
```

> *Benchmark* 测试代码：https://github.com/johnsonlee/booster-benchmark

*Benchmark* 测试结果如下：

|Benchmark                                          | Mode | Cnt |   Score |    Error | Units |
|:--------------------------------------------------|------|-----|---------|----------|-------|
|JavassistVsAsmBenchmark.transformJarUsingAsm       | avgt |  10 | 203.489 | ± 52.174 | ms/op |
|JavassistVsAsmBenchmark.transformJarUsingJavassist | avgt |  10 | 277.695 | ± 10.801 | ms/op |

从上面的结果来看，*ASM* 平均耗时更低

## 其它选择

除了 *ASM* 和 *Javassist* 以外，*Booster* 同样支持使用其它的字节码框架，比如：[Apache BCEL](https://commons.apache.org/bcel/)，只不过，*ASM* 和 *Javassist* 是 *Booster* 默认提供了支持，如果要在项目中使用 [Apache BCEL](https://commons.apache.org/bcel/) 该如何实现呢？—— 请参阅下一节[「自定义 Transformer」](./custom-transformer/)。
