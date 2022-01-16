# AAPT2 产物逆向

## 为什么要逆向 *AAPT2* 产物

根据上一章我们对 *Android* 工程的构建流程的了解，如果要处理 *APP* 中的资源，一般会选择从 *processRes* 任务的产出物中获取，而从 *Android Gradle Plugin 3.0.0* 开始，*processRes* 任务的产出物已经不再是原始的资源文件了，而是由特定的格式（*AAPT2*）所编码的二进制。

在 *Booster* 的优化特性中，有很多特性的来实现都依赖于解析这些被 *AAPT2* 编译过的二进制资源，例如：

1. [booster-task-analyser](https://github.com/didi/booster/tree/master/booster-task-analyser) 以布局文件中的自定义 *View* 作为静态分析的入口来构建 *Call Graph*；
1. [booster-transform-r-inline](https://github.com/didi/booster/tree/master/booster-transform-r-inline) 从布局文件中提取 *ConstraintLayout* 引用的资源 *ID*；
1. [booster-task-compression-pngquant](https://github.com/didi/booster/tree/master/booster-task-compression-pngquant) 和 [booster-task-compression-cwebp](https://github.com/didi/booster/tree/master/booster-task-compression-cwebp) 从 *&#42;.png.flat* 文件中获取图片资源名称及其源文件路径；
1. [booster-task-resource-deredundancy](https://github.com/didi/booster/tree/master/booster-task-resource-deredundancy) 从 *&#42;.png.flat* 文件中获取图片资源的 *Configuration*；

## 什么是 AAPT2 ?

*AAPT2*（*Android* 资源打包工具）是一个构建工具，*Android Studio* 和 *Android Gradle Plugin* 使用它来编译和打包应用的资源。*AAPT2* 会解析资源、为资源编制索引，并将资源编译为针对 Android 平台进行过优化的二进制格式。

*AAPT2* 的可执行文件随 *Android SDK* 的 *Build Tools* 一起发布，以 *Build Tools 29.0.0* 为例，*aapt2* 可执行文件位于：

```
$ANDROID_HOME/build-tools/29.0.0/aapt2
```

从 *Android Gradle Plugin 3.0.0* 开始，*AAPT2* 默认开启，相对于 *AAPT*，资源打包流程由原来的单一编译过程拆分为「编译」和「链接」两个阶段。

### 编译阶段

*Android* 所有类型的资源的编译都是通过 *AAPT2* 来完成，资源的编译使用 *compile* 子命令，编译成功后，会生成一个扩展名为 *.flat* 的中间二进制文件，正常情况下，每一个输入的资源文件对应输出一个 *.flat* 文件，然后在后续的链接阶段使用。

#### 编译单个资源

```bash
$ aapt2 compile -o build ./app/src/main/res/mipmap-xxxhdpi/ic_launcher.png
```

#### 编译多个资源

```bash
$ aapt2 compile -o build \
    ./app/src/main/res/mipmap-xxxhdpi/ic_launcher.png \
    ./app/src/main/res/layout/activity_main.xml \
    ./app/src/main/res/values/strings.xml
```

#### 编译整个目录

```bash
$ aapt2 compile -o build/resources.ap_  --dir ./app/src/main/res/
```

通过 *unzip* 命令查看 *build/resources.ap_* 文件内容：

```bash
$ unzip -lv build/resources.ap_
```

结果如下：

```
Archive:  build/resources.ap_
 Length   Method    Size  Cmpr    Date    Time   CRC-32   Name
--------  ------  ------- ---- ---------- ----- --------  ----
    2964  Stored     2964   0% 01-01-1980 08:00 222c02e4  drawable-v24_ic_launcher_foreground.xml.flat
   10400  Stored    10400   0% 01-01-1980 08:00 c51d04d8  drawable_ic_launcher_background.xml.flat
    1004  Stored     1004   0% 01-01-1980 08:00 b7942223  layout_activity_main.xml.flat
     468  Stored      468   0% 01-01-1980 08:00 719ae087  mipmap-anydpi-v26_ic_launcher.xml.flat
     480  Stored      480   0% 01-01-1980 08:00 51d410e6  mipmap-anydpi-v26_ic_launcher_round.xml.flat
    3076  Stored     3076   0% 01-01-1980 08:00 b7c61139  mipmap-hdpi_ic_launcher.png.flat
    5032  Stored     5032   0% 01-01-1980 08:00 4e0c4c11  mipmap-hdpi_ic_launcher_round.png.flat
    2172  Stored     2172   0% 01-01-1980 08:00 8403a200  mipmap-mdpi_ic_launcher.png.flat
    2908  Stored     2908   0% 01-01-1980 08:00 fa7067cb  mipmap-mdpi_ic_launcher_round.png.flat
    4604  Stored     4604   0% 01-01-1980 08:00 7d50d1c1  mipmap-xhdpi_ic_launcher.png.flat
    7020  Stored     7020   0% 01-01-1980 08:00 b81236dd  mipmap-xhdpi_ic_launcher_round.png.flat
    6504  Stored     6504   0% 01-01-1980 08:00 087eaa8c  mipmap-xxhdpi_ic_launcher.png.flat
   10544  Stored    10544   0% 01-01-1980 08:00 a3248946  mipmap-xxhdpi_ic_launcher_round.png.flat
    9056  Stored     9056   0% 01-01-1980 08:00 da999b7f  mipmap-xxxhdpi_ic_launcher.png.flat
   15260  Stored    15260   0% 01-01-1980 08:00 3c9e8eea  mipmap-xxxhdpi_ic_launcher_round.png.flat
     296  Stored      296   0% 01-01-1980 08:00 eeebffe4  values-v13_styles.arsc.flat
     296  Stored      296   0% 01-01-1980 08:00 08cc005e  values-v21_styles.arsc.flat
     332  Stored      332   0% 01-01-1980 08:00 3050ad73  values_colors.arsc.flat
     248  Stored      248   0% 01-01-1980 08:00 b5f978d1  values_strings.arsc.flat
     284  Stored      284   0% 01-01-1980 08:00 b1096c78  values_styles.arsc.flat
--------          -------  ---                            -------
   82948            82948   0%                            20 files
```

::: warning
注意：对于资源文件，输入文件的路径必须符合以下结构：path/`resource-type`[-`configuration`]/file，否则，会报如下错误：

*error: invalid file path '...'*
:::

### 链接阶段

在链接阶段，*AAPT2* 会合并在编译阶段生成的所有中间文件（*.flat* 文件），并将它们打包成 *ZIP* 包（最终 *APK* 的原型，由于不包括 *DEX* 文件且未签名，所以无法正常安装）。

链接资源使用 *link* 子命令，如下所示：

```bash
$ aapt2 link -o build/resources.ap_ \
    -I $ANDROID_HOME/platforms/android-29/android.jar \
    --manifest build/intermediates/manifests/full/debug/AndroidManifest.xml \
    build/layout_activity_main.xml.flat \
    build/values_styles.arsc.flat \
    build/values_colors.arsc.flat \
    build/values_strings.arsc.flat \
    build/mipmap-xxxhdpi_ic_launcher.png.flat \
    build/mipmap-xxxhdpi_ic_launcher_round.png.flat
```

## AAPT2 容器格式

在 *AAPT2* 的编译阶段，会生成扩展名为 *.flat* 的中间二进制文件，这种以 *.flat* 作为扩展名的文件格式，被称之为 *AAPT2* 容器，*AAPT2* 容器文件由文件头和资源项两大部分组成，容器中的各个字段以小端（*Little-Endian*）字节序表示：

### AAPT2 文件头

| 字段          | 字节数 | 描述                                                      |
|---------------|:------:|-----------------------------------------------------------|
| `magic`       | 4      | *AAPT2* 容器文件标识：`AAPT` 或 `0x54504141`              |
| `version`     | 4      | *AAPT2* 容器版本                                          |
| `entry_count` | 4      | 容器中包含的条目数（一个 *flat* 文件中可以包含多个资源项）|

### AAPT2 资源项

| 字段          | 字节数         | 描述                                                                              |
|---------------|:--------------:|-----------------------------------------------------------------------------------|
| `entry_type`  | 4              | 资源类型（目前仅支持两种类型：`RES_TABLE(0x00000000)` 或 `RES_FILE (0x00000001)`）|
| `entry_length`| 8              | 资源数据长度                                                                      |
| `data`        | `entry_length` | 资源数据                                                                          |

#### Resource Table

当 `entry_type`为 `0x00000000` 时，`data` 表示 *protobuf* 序列化的 [ResourceTable](https://github.com/aosp-mirror/platform_frameworks_base/blob/master/tools/aapt2/Resources.proto) 结构

#### Resource File

当 `entry_type`为 `0x00000001` 时，`data` 表示资源文件，格式如下：

| 字段             | 字节数        | 描述                                                                                                                                                                        |
|------------------|:-------------:|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `header_size`    | 4             | `header` 的长度                                                                                                                                                             |
| `data_size`      | 8             | `data` 的长度                                                                                                                                                               |
| `header`         | `header_size` | 表示 *protobuf* 序列化的 [CompiledFile](https://github.com/aosp-mirror/platform_frameworks_base/blob/master/tools/aapt2/ResourcesInternal.proto) 结构                       |
| `header_padding` | `x`           | *0-3* 个填充字节，用于 `data` 32 位对齐                                                                                                                                 |
| `data`           | `data_size`   | 资源文件内容（*PNG*, 二进制 *XML* 或者 *protobuf* 序列化的 [XmlNode](https://github.com/aosp-mirror/platform_frameworks_base/blob/master/tools/aapt2/Resources.proto) 结构）|
| `data_padding`   | `y`           | *0-3* 个填充字节，用于 `data` 32 位对齐                                                                                                                                        |

> AAPT2 格式规范：https://github.com/aosp-mirror/platform_frameworks_base/blob/master/tools/aapt2/formats.md

### *flat* 格式的兼容性问题

虽然 *Android Gradle Plugin 3.0.0* 已经默认启用 *AAPT2*，但是 *AAPT2* 的产出物（*flat* 文件）的格式直到 *Android Gradle Plugin 3.2.0* 才稳定下来，那 *3.2.0* 以前的版本产出的 *flat* 文件格式到底是什么样子呢？

#### Resource File

通过逆向分析 *flat* 文件，我们还原了 *Android Gradle Plugin 3.2.0* 以前的版本产出的 *flat* 文件格式，如下表所示：

| 字段             | 字节数         | 描述                                                                                                                                                |
|------------------|:--------------:|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| `entry_type`     | 4              | 资源类型（通常为：`RES_FILE (0x00000001)`）                                                                                                         |
| `entry_length`   | 8              | 资源数据长度                                                                                                                                        |
| `header`         | `header_size`  | 表示 *protobuf* 序列化的 [CompiledFile](https://github.com/didi/booster/blob/master/booster-aapt2/src/main/proto/ResourcesInternalLegacy.proto#L20) |
| `header_padding` | `x`            | *0-3* 个填充字节，用于 `data` 32 位对齐                                                                                                             |
| `data`           | `entry_length` | 资源数据                                                                                                                                            |
| `data_padding`   | `y`            | *0-3* 个填充字节，用于 `data` 32 位对齐                                                                                                             |
#### Resource Table

*Resource Table* 的格式比较简单，其实就是 [ResourceTable](https://github.com/aosp-mirror/platform_frameworks_base/blob/0c80895c203640148da94bf04a57f1965a1c0d3d/tools/aapt2/Format.proto#L69) 的 *protobuf* 序列化结果。

> 关于二进制文件的逆向工具，类 *Linux* 系统都自带 *xxd* 命令，可以直接输出二进制文件的十六进制格式：
>
> ```bash
> $ xxd ./build/intermediates/res/merged/debug/mipmap-hdpi_ic_launcher.png.flat
> ```
>
> 或者使用 *VIM* 打开二进制文件
>
> ```bash
> $ vim ./build/intermediates/res/merged/debug/mipmap-hdpi_ic_launcher.png.flat
> ```
>
> 然后在 *VIM* 中输入：
>
> ```vim
> :%!xxd
> ```

## *flat* 与 *AAPT* 产物的关系

在 *Android Gradle Plugin 3.0* 以前的版本中，*AAPT* 的产物主要有 *3* 类：

1. 已编译的二进制 XML，例如：布局 *XML* 文件；
1. 字符串池（*String Pool*），内嵌于 *Resource Table* 中，一般不会独立存在；
1. 资源表（*Resource Table*），例如：*ARSC* 文件；

*AAPT2* 的大部分数据结构都采用 *protobuf* 重新进行编码，但还有一小部分数据结构仍然复用了*AAPT* 的格式，例如：*String Pool* ，我们从 *AAPT2* 的 *proto* 定义便可以看出来：

```protobuf
message StringPool {
  bytes data = 1;
}

message ResourceTable {
  // The string pool containing source paths referenced throughout the resource table. This does
  // not end up in the final binary ARSC file.
  StringPool source_pool = 1;

  // Resource definitions corresponding to an Android package.
  repeated Package package = 2;
}
```

## *AAPT2* 容器的意义

*AAPT2* 为什么要将中间产物编码成 *flat* 格式呢？主要原因在于 *AAPT2* 将资源打包过程拆分成了两个阶段：「编译阶段」和「链接阶段」，为了在链接阶段得到资源更详细的信息，例如：资源名称、配置信息（*Configuration*） 等，因此，直接将资源的元信息连同资源本身一同编码进 *AAPT2* 容器文件中，这样，资源链接的过程可以完全与编译过程解耦了，而且，对于增量构建来说，这样大大提升了资源打包的性能。

## 在 *Gradle* 插件中访问 *aapt2*

### *AGP 3.5.0* 以下版本

```kotlin
fun findAapt2(project: Project) {
    project.applicationVariants.forEach { variant ->
        val variantImpl = variant as ApplicationVariantImpl;
        val buildTool = variantImpl.variantData.scope.globalScope.androidBuilder.buildToolInfo;
        val aapt2 = buildTool.getPath(BuildToolInfo.PathId.AAPT2);
        // do something with aapt2
    }
}
```

### *AGP 3.5.0* 以上版本

```kotlin
fun findAapt2(project: Project) {
    project.applicationVariants.forEach { variant ->
        val variantImpl = variant as ApplicationVariantImpl;
        val buildTool = variantImpl.variantData.scope.globalScope.androidBuilder.buildToolInfoProvider.get();
        val aapt2 = buildTool.getPath(BuildToolInfo.PathId.AAPT2);
        // do something with aapt2
    }
}
```

## 在代码中执行 *aapt2* 命令

```kotlin
fun runAapt2(project: Project, aapt2: String, args: List<String>) {
    val rc = project.exec { spec ->
        spec.isIgnoreExitValue = true
        spec.commandLine = listOf(aapt2) + args
    }

    when (rc.exitValue) {
        0 -> println("Aapt2 execute successful")
        else -> println("Aapt2 execute failed: ${rc.exitValue}")
    }
}
```

## Booster Aapt2

为了便于在 *Gradle* 插件中解析 *flat* 文件，*Booster* 提供了 [booster-aapt2](https://github.com/didi/booster/tree/master/booster-aapt2) 模块，提供了 [BinaryParser](https://github.com/didi/booster/blob/master/booster-aapt2/src/main/kotlin/com/didiglobal/booster/aapt2/BinaryParser.kt) 以及 [Aapt2Parser](https://github.com/didi/booster/blob/master/booster-aapt2/src/main/kotlin/com/didiglobal/booster/aapt2/Aapt2Parser.kt) 来解析已编译的资源，由于 *Android Gradle Plugin* 版本间存在差异导致 *AAPT2* 中间产物格式不一致，而 [booster-aapt2](https://github.com/didi/booster/tree/master/booster-aapt2) 屏蔽了这些细微的差异，以简化已编译资源文件的解析过程。

### 使用方法

在 *build.gradle* 中引入 [booster-aapt2](https://github.com/didi/booster/tree/master/booster-aapt2) 依赖，如下所示：

```groovy
buildscript {
    ext {
        kotlin_version = '1.3.31'
        booster_version = '4.4.0'
    }
    repositories {
        mavenLocal()
        mavenCentral()
        google()
        jcenter()
        maven { url 'https://oss.sonatype.org/content/repositories/public/' }
        maven { url 'https://oss.sonatype.org/content/repositories/snapshots/' }
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.5.0'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"

        /* 👇👇👇👇 引用这个模块 👇👇👇👇 */
        classpath "com.didiglobal.booster:booster-aapt2:$booster_version"
    }
}
```

然后，通过 [BinaryParser](https://github.com/didi/booster/blob/master/booster-aapt2/src/main/kotlin/com/didiglobal/booster/aapt2/BinaryParser.kt) 和 [Aapt2Parser](https://github.com/didi/booster/blob/master/booster-aapt2/src/main/kotlin/com/didiglobal/booster/aapt2/Aapt2Parser.kt) 来解析已编译的资源文件：

```kotlin
fun parseCompiledResource(res: File) {
    val container = BinaryParser(res).use { parser ->
        parser.parseAapt2Container()
    }

    container.entries.map {
        it as Aapt2Container.ResFile
    }.forEach { res ->
        // do something with parsed resource
    }
}
```
