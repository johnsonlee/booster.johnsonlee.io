# AAPT2 Output Reversing

## Why Reverse AAPT2 Output

Based on our understanding of the Android project build process from the previous chapter, if we want to process resources in an APP, we typically retrieve them from the output of the *processRes* task. However, starting from *Android Gradle Plugin 3.0.0*, the output of the *processRes* task is no longer the original resource files, but binary files encoded in a specific format (*AAPT2*).

Many optimization features in *Booster* depend on parsing these binary resources compiled by *AAPT2*, for example:

1. [booster-task-analyser](https://github.com/didi/booster/tree/master/booster-task-analyser) uses custom *Views* in layout files as entry points for static analysis to build a *Call Graph*;
1. [booster-transform-r-inline](https://github.com/didi/booster/tree/master/booster-transform-r-inline) extracts resource *IDs* referenced by *ConstraintLayout* from layout files;
1. [booster-task-compression-pngquant](https://github.com/didi/booster/tree/master/booster-task-compression-pngquant) and [booster-task-compression-cwebp](https://github.com/didi/booster/tree/master/booster-task-compression-cwebp) retrieve image resource names and their source file paths from *&#42;.png.flat* files;
1. [booster-task-resource-deredundancy](https://github.com/didi/booster/tree/master/booster-task-resource-deredundancy) retrieves the *Configuration* of image resources from *&#42;.png.flat* files;

## What is AAPT2?

*AAPT2* (*Android* Asset Packaging Tool) is a build tool that *Android Studio* and *Android Gradle Plugin* use to compile and package application resources. *AAPT2* parses resources, indexes them, and compiles them into a binary format optimized for the Android platform.

The *AAPT2* executable is distributed with the *Build Tools* of the *Android SDK*. Taking *Build Tools 29.0.0* as an example, the *aapt2* executable is located at:

```
$ANDROID_HOME/build-tools/29.0.0/aapt2
```

Starting from *Android Gradle Plugin 3.0.0*, *AAPT2* is enabled by default. Compared to *AAPT*, the resource packaging process has been split from a single compilation process into two stages: "compilation" and "linking".

### Compilation Phase

All types of Android resources are compiled through *AAPT2*. Resource compilation uses the *compile* subcommand. After successful compilation, an intermediate binary file with the *.flat* extension is generated. Normally, each input resource file corresponds to one output *.flat* file, which is then used in the subsequent linking phase.

#### Compiling a Single Resource

```bash
$ aapt2 compile -o build ./app/src/main/res/mipmap-xxxhdpi/ic_launcher.png
```

#### Compiling Multiple Resources

```bash
$ aapt2 compile -o build \
    ./app/src/main/res/mipmap-xxxhdpi/ic_launcher.png \
    ./app/src/main/res/layout/activity_main.xml \
    ./app/src/main/res/values/strings.xml
```

#### Compiling an Entire Directory

```bash
$ aapt2 compile -o build/resources.ap_  --dir ./app/src/main/res/
```

View the contents of *build/resources.ap_* using the *unzip* command:

```bash
$ unzip -lv build/resources.ap_
```

The result is as follows:

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
Note: For resource files, the input file path must conform to the following structure: path/`resource-type`[-`configuration`]/file. Otherwise, the following error will be reported:

*error: invalid file path '...'*
:::

### Linking Phase

In the linking phase, *AAPT2* merges all intermediate files (*.flat* files) generated during the compilation phase and packages them into a *ZIP* archive (the prototype of the final *APK*, which cannot be installed normally because it does not include *DEX* files and is unsigned).

Resource linking uses the *link* subcommand, as shown below:

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

## AAPT2 Container Format

During the *AAPT2* compilation phase, intermediate binary files with the *.flat* extension are generated. This file format with *.flat* as the extension is called the *AAPT2* container. An *AAPT2* container file consists of two main parts: the file header and resource entries. Each field in the container is represented in little-endian byte order:

### AAPT2 File Header

| Field         | Bytes  | Description                                                           |
|---------------|:------:|-----------------------------------------------------------------------|
| `magic`       | 4      | *AAPT2* container file identifier: `AAPT` or `0x54504141`             |
| `version`     | 4      | *AAPT2* container version                                             |
| `entry_count` | 4      | Number of entries in the container (one *flat* file can contain multiple resource entries) |

### AAPT2 Resource Entry

| Field          | Bytes          | Description                                                                                |
|----------------|:--------------:|--------------------------------------------------------------------------------------------|
| `entry_type`   | 4              | Resource type (currently only two types are supported: `RES_TABLE(0x00000000)` or `RES_FILE (0x00000001)`) |
| `entry_length` | 8              | Resource data length                                                                       |
| `data`         | `entry_length` | Resource data                                                                              |

#### Resource Table

When `entry_type` is `0x00000000`, `data` represents a *protobuf* serialized [ResourceTable](https://github.com/aosp-mirror/platform_frameworks_base/blob/master/tools/aapt2/Resources.proto) structure.

#### Resource File

When `entry_type` is `0x00000001`, `data` represents a resource file with the following format:

| Field            | Bytes         | Description                                                                                                                                                                  |
|------------------|:-------------:|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `header_size`    | 4             | Length of `header`                                                                                                                                                           |
| `data_size`      | 8             | Length of `data`                                                                                                                                                             |
| `header`         | `header_size` | *protobuf* serialized [CompiledFile](https://github.com/aosp-mirror/platform_frameworks_base/blob/master/tools/aapt2/ResourcesInternal.proto) structure                      |
| `header_padding` | `x`           | *0-3* padding bytes for 32-bit alignment of `data`                                                                                                                           |
| `data`           | `data_size`   | Resource file content (*PNG*, binary *XML*, or *protobuf* serialized [XmlNode](https://github.com/aosp-mirror/platform_frameworks_base/blob/master/tools/aapt2/Resources.proto) structure) |
| `data_padding`   | `y`           | *0-3* padding bytes for 32-bit alignment of `data`                                                                                                                           |

> AAPT2 format specification: https://github.com/aosp-mirror/platform_frameworks_base/blob/master/tools/aapt2/formats.md

### Compatibility Issues with the *flat* Format

Although *Android Gradle Plugin 3.0.0* enabled *AAPT2* by default, the format of *AAPT2* output (*flat* files) was not stabilized until *Android Gradle Plugin 3.2.0*. So what did the *flat* file format look like in versions before *3.2.0*?

#### Resource File

Through reverse engineering analysis of *flat* files, we have reconstructed the *flat* file format produced by versions before *Android Gradle Plugin 3.2.0*, as shown in the following table:

| Field            | Bytes          | Description                                                                                                                                          |
|------------------|:--------------:|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `entry_type`     | 4              | Resource type (typically: `RES_FILE (0x00000001)`)                                                                                                   |
| `entry_length`   | 8              | Resource data length                                                                                                                                 |
| `header`         | `header_size`  | *protobuf* serialized [CompiledFile](https://github.com/didi/booster/blob/master/booster-aapt2/src/main/proto/ResourcesInternalLegacy.proto#L20)     |
| `header_padding` | `x`            | *0-3* padding bytes for 32-bit alignment of `data`                                                                                                   |
| `data`           | `entry_length` | Resource data                                                                                                                                        |
| `data_padding`   | `y`            | *0-3* padding bytes for 32-bit alignment of `data`                                                                                                   |

#### Resource Table

The format of *Resource Table* is relatively simple. It is essentially the *protobuf* serialized result of [ResourceTable](https://github.com/aosp-mirror/platform_frameworks_base/blob/0c80895c203640148da94bf04a57f1965a1c0d3d/tools/aapt2/Format.proto#L69).

> Regarding reverse engineering tools for binary files, *Linux*-like systems come with the *xxd* command, which can directly output the hexadecimal format of binary files:
>
> ```bash
> $ xxd ./build/intermediates/res/merged/debug/mipmap-hdpi_ic_launcher.png.flat
> ```
>
> Or use *VIM* to open the binary file:
>
> ```bash
> $ vim ./build/intermediates/res/merged/debug/mipmap-hdpi_ic_launcher.png.flat
> ```
>
> Then enter the following in *VIM*:
>
> ```vim
> :%!xxd
> ```

## Relationship Between *flat* and *AAPT* Output

In versions before *Android Gradle Plugin 3.0*, the main outputs of *AAPT* were of *3* types:

1. Compiled binary XML, such as layout *XML* files;
1. String Pool, embedded in *Resource Table*, generally does not exist independently;
1. Resource Table, such as *ARSC* files;

Most data structures in *AAPT2* have been re-encoded using *protobuf*, but some data structures still reuse the *AAPT* format, such as *String Pool*. We can see this from the *proto* definition of *AAPT2*:

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

## Significance of the *AAPT2* Container

Why does *AAPT2* encode intermediate outputs in the *flat* format? The main reason is that *AAPT2* has split the resource packaging process into two stages: "compilation phase" and "linking phase". In order to obtain more detailed information about resources during the linking phase, such as resource names, configuration information (*Configuration*), etc., the resource metadata is encoded together with the resource itself into the *AAPT2* container file. This way, the resource linking process can be completely decoupled from the compilation process. Moreover, for incremental builds, this greatly improves resource packaging performance.

## Accessing *aapt2* in *Gradle* Plugins

### Versions Below *AGP 3.5.0*

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

### Versions Above *AGP 3.5.0*

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

## Executing *aapt2* Commands in Code

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

To facilitate parsing *flat* files in *Gradle* plugins, *Booster* provides the [booster-aapt2](https://github.com/didi/booster/tree/master/booster-aapt2) module, which offers [BinaryParser](https://github.com/didi/booster/blob/master/booster-aapt2/src/main/kotlin/com/didiglobal/booster/aapt2/BinaryParser.kt) and [Aapt2Parser](https://github.com/didi/booster/blob/master/booster-aapt2/src/main/kotlin/com/didiglobal/booster/aapt2/Aapt2Parser.kt) to parse compiled resources. Due to differences between *Android Gradle Plugin* versions that cause inconsistencies in *AAPT2* intermediate output formats, [booster-aapt2](https://github.com/didi/booster/tree/master/booster-aapt2) shields these subtle differences to simplify the parsing process of compiled resource files.

### Usage

Add the [booster-aapt2](https://github.com/didi/booster/tree/master/booster-aapt2) dependency in *build.gradle*, as shown below:

```groovy
buildscript {
    ext {
        kotlin_version = "1.5.31"
        booster_version = "4.16.3"
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

        /* 👇👇👇👇 Reference this module 👇👇👇👇 */
        classpath "com.didiglobal.booster:booster-aapt2:$booster_version"
    }
}
```

Then, use [BinaryParser](https://github.com/didi/booster/blob/master/booster-aapt2/src/main/kotlin/com/didiglobal/booster/aapt2/BinaryParser.kt) and [Aapt2Parser](https://github.com/didi/booster/blob/master/booster-aapt2/src/main/kotlin/com/didiglobal/booster/aapt2/Aapt2Parser.kt) to parse compiled resource files:

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
