# 高性能文件系统 I/O

## 仅一次文件系统 I/O

在 [字节码处理流水线](./transformer-pipeline.md) 这一章中，我们了解到 *Android Gradle Plugin* 是以流水线的方式来处理字节码的，`BoosterTransform` 作为 *Transform Pipeline* 中的一个节点，负责从 `TransformStream` 中接收输入（*JAR* 或者目录），然后经过处理后，再输出到指定的路径，*Booster* 对 *JAR* 文件的处理方式是一边读一边进行处理，而不是将 *JAR* 解压到磁盘再读，这样作的好处有：

1. 减少 *I/O* 开销；

    如果是先将 *JAR* 解压到磁盘再读取其中的 *class*，每处理完一个 *class* 还需要再写一次文件，无形中会多出 *2N* 次 *I/O* 操作（*N* 为 *JAR* 中 *class* 的数量），而且遍历目录也会存在性能损耗，通过 *benchmark* 测试，我们发现，先解压再处理的方式在性能表现上远不及一边读一边处理。

1. 避免因不同的 *JAR* 中包含同名的 *class* 导致解压到磁盘时被同名的 *class* 所覆盖的问题；

    在平常的开发过程中，可能有些模块会将本地 *JAR* 打包进 *AAR* 中，如果两个不同的模块都依赖了相同的本地 *JAR* 的不同版本，采用先解压的方式可能会将这种情况掩盖，更有可能旧版本覆盖新版本等诸多无法预测的问题。

## 并行 I/O

### 并行处理 class

在 [字节码处理流水线](./transformer-pipeline.md) 这一章中，我们了解到 *Booster* 采用了并行 *Transfomer Pipeline* 的方案，不仅如此，在字节码处理完成之后，输出 *JAR* 的过程中，同样采用了并行写的方式，通过对 `$ANDROID_HOME/platforms/android-28/android.jar` 进行 *benchmark* 测试，我们发现串行 *I/O* 的平均耗时几乎是并行 *I/O* 一倍，*benchmark* 测试结果如下表所示：

| Benchmark                           | Mode | Cnt |    Score |   Error  | Units |
|-------------------------------------|:----:|:---:|:--------:|:--------:|:-----:|
| transformJarFileSequentially        | avgt |  10 | 1261.791 | ± 13.966 | ms/op |
| transformJarFileWithFixedThreadPool | avgt |  10 |  708.439 | ± 37.973 | ms/op |

### 并行遍历文件

通常我们遍历目录会使用 `File.listFiles(...)` 或者 `FileTreeWalker`，对于为数不多的文件来说，并没有什么弊端，但是，对于拥有成千上万个 *class* 的工程来说，这种串行遍历文件系统的方式在性能上就会表现出明显的不足，为了最大限度的提升构建速度，*Booster* 提供了 [FileSearch](https://github.com/didi/booster/blob/master/booster-kotlinx/src/main/kotlin/com/didiglobal/booster/kotlinx/FileSearch.kt) 实用类，通过 [Fork/Join Framework](https://docs.oracle.com/javase/tutorial/essential/concurrency/forkjoin.html) 来实现文件系统的并行遍历，像 *class* 文件遍历，图片资源遍历等都使用了并行遍历的方式。

另外，[booster-kotlinx](https://github.com/didi/booster/blob/master/booster-kotlinx) 模块还提供了一系列的扩展方法来提升插件开发的便利性，详情请参见：[Package com.didiglobla.booster.kotlinx](https://reference.johnsonlee.io/booster/com.didiglobal.booster.kotlinx/index.html)
