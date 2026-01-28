# Bytecode Manipulation Frameworks

## ASM vs Javassist

Many developers are confused when first choosing a bytecode manipulation framework - should they choose *Javassist* or *ASM*? Let's compare the differences and applicable scenarios between them from several aspects:

| Feature               | Javassist                                | ASM                                      |
|:----------------------|:-----------------------------------------|:-----------------------------------------|
| Package Size          | 771 KB (3.27)                            | 265 KB (6.0 BETA)                        |
| Performance           | Inferior to *ASM*                        | Superior to *Javassist*                  |
| API Abstraction Level | High                                     | Low                                      |
| Feature Completeness  | Complete                                 | Complete                                 |
| Developer Requirements| Basic understanding of *class* file format and *JVM* instruction set | Proficiency in *class* file format and *JVM* instruction set required |
| Learning Curve        | Gentle                                   | Steep                                    |
| Documentation & Manual| Simple and clear                         | Somewhat tedious (Visitor pattern can be confusing for beginners) |

From the comparison above, I believe readers have already made their choice. Personally, I recommend *Javassist* for beginners since it's quick to get started and easier to learn. If you have high requirements for performance and package size, I recommend *ASM*.

Therefore, to accommodate as many developers as possible, *Booster* supports both. Those who have read the *Booster* source code might ask: why are most of *Booster*'s implementations based on *ASM*? What were the considerations?

## ASM & Javassist Benchmark Test

When *Booster* initially chose a bytecode manipulation framework, the primary consideration was performance. As a quality optimization framework, *Booster* not only requires its own modules to achieve extreme performance, but also expects features developed by other developers based on *Booster* to perform excellently. Therefore, a *benchmark* test was conducted on the bytecode processing performance of *Javassist* and *ASM*. The following shows the performance comparison between the two by processing *guava-28.2-jre.jar*:

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

> *Benchmark* test code: https://github.com/johnsonlee/booster-benchmark

*Benchmark* test results are as follows:

|Benchmark                                          | Mode | Cnt |   Score |    Error | Units |
|:--------------------------------------------------|------|-----|---------|----------|-------|
|JavassistVsAsmBenchmark.transformJarUsingAsm       | avgt |  10 | 203.489 | ± 52.174 | ms/op |
|JavassistVsAsmBenchmark.transformJarUsingJavassist | avgt |  10 | 277.695 | ± 10.801 | ms/op |

From the results above, *ASM* has lower average execution time.

## Apache BCEL

In addition to *ASM* and *Javassist*, *Booster* also supports other bytecode frameworks, such as [Apache Commons BCEL](https://commons.apache.org/bcel/). However, *ASM* and *Javassist* are supported by default in *Booster*. If you want to use [Apache Commons BCEL](https://commons.apache.org/bcel/) in your project, please refer to [Bytecode Manipulation - Custom Transformer](./bytecode-transformer.html#custom-transformer).
