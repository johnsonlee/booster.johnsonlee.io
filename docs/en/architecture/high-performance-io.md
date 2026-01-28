# High-Performance File System I/O

## Single File System I/O

In the [Bytecode Processing Pipeline](./transformer-pipeline.md) chapter, we learned that *Android Gradle Plugin* processes bytecode in a pipeline manner. `BoosterTransform`, as a node in the *Transform Pipeline*, is responsible for receiving input (*JAR* or directory) from `TransformStream`, processing it, and then outputting it to the specified path. *Booster* processes *JAR* files by reading and processing them simultaneously, rather than extracting the *JAR* to disk first and then reading. The benefits of this approach are:

1. Reduced *I/O* overhead;

    If you first extract the *JAR* to disk and then read the *class* files within, you need to write to the file system again after processing each *class*. This invisibly adds *2N* extra *I/O* operations (*N* being the number of *class* files in the *JAR*). Additionally, directory traversal also incurs performance overhead. Through *benchmark* testing, we found that the extract-then-process approach performs far worse than the read-while-processing approach.

1. Avoids the problem of *class* files being overwritten by same-named *class* files when different *JARs* contain classes with the same name;

    During normal development, some modules may package local *JARs* into *AARs*. If two different modules depend on different versions of the same local *JAR*, the extract-first approach might mask this situation, or worse, an older version might overwrite a newer version, leading to many unpredictable issues.

## Parallel I/O

### Parallel Processing of Classes

In the [Bytecode Processing Pipeline](./transformer-pipeline.md) chapter, we learned that *Booster* adopts a parallel *Transformer Pipeline* solution. Furthermore, after bytecode processing is complete, the output *JAR* is also written in parallel. Through *benchmark* testing on `$ANDROID_HOME/platforms/android-28/android.jar`, we found that the average time for sequential *I/O* is almost double that of parallel *I/O*. The *benchmark* test results are shown in the following table:

| Benchmark                           | Mode | Cnt |    Score |   Error  | Units |
|-------------------------------------|:----:|:---:|:--------:|:--------:|:-----:|
| transformJarFileSequentially        | avgt |  10 | 1261.791 | ± 13.966 | ms/op |
| transformJarFileWithFixedThreadPool | avgt |  10 |  708.439 | ± 37.973 | ms/op |

### Parallel File Traversal

Typically, we traverse directories using `File.listFiles(...)` or `FileTreeWalker`. For a small number of files, there are no significant drawbacks. However, for projects with thousands of *class* files, this sequential file system traversal shows obvious performance deficiencies. To maximize build speed, *Booster* provides the [FileSearch](https://github.com/didi/booster/blob/master/booster-kotlinx/src/main/kotlin/com/didiglobal/booster/kotlinx/FileSearch.kt) utility class, which implements parallel file system traversal through the [Fork/Join Framework](https://docs.oracle.com/javase/tutorial/essential/concurrency/forkjoin.html). Both *class* file traversal and image resource traversal use parallel traversal.

Additionally, the [booster-kotlinx](https://github.com/didi/booster/blob/master/booster-kotlinx) module provides a series of extension methods to enhance plugin development convenience. For details, please refer to: [Package com.didiglobal.booster.kotlinx](https://reference.johnsonlee.io/booster/com.didiglobal.booster.kotlinx/index.html)
