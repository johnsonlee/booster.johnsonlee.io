# ZIP File Compression

## The AP_ File

在 *Android* 的构建流程中，真正将 *dex*, *resources*, *assets*, *so* 等文件合并成 *APK* 的工作是在 *package Task* 里完的，而在 *APK* 生成之前，其实已经有了原型—— *AP_* 文件，也就是 *processRes Task* 的产物，里面的内容包括：

1. `AndroidManifest.xml`
1. `res/*`
1. `resources.arsc`

其中 `res/*` 是合并后的所有资源，`resources.arsc` 则是 `res/*` 的索引表（详见：[Resource Table 概述](../agp/resource-table.html)），通过 `file` 命令查看一下文件格式：

```bash
$ file ./build/intermediates/processed_res/debug/out/resources-debug.ap_
```
得到如下输出结果：
```
./build/intermediates/processed_res/debug/out/resources-debug.ap_: Zip archive data
```

原来 *AP_* 文件就是一个普通的 *ZIP* 文件，通过 `unzip` 命令查看该文件内容：

```bash
$ unzip -lv ./build/intermediates/processed_res/debug/out/resources-debug.ap_
```
得到如下输出结果：
```
Archive:  ./build/intermediates/processed_res/debug/out/resources-debug.ap_
 Length   Method    Size  Cmpr    Date    Time   CRC-32   Name
--------  ------  ------- ---- ---------- ----- --------  ----
    2240  Defl:N      816  64% 01-01-1980 08:00 ad4de798  AndroidManifest.xml
     388  Defl:N      217  44% 01-01-1980 08:00 1d501a5f  res/anim/abc_fade_in.xml
     388  Defl:N      218  44% 01-01-1980 08:00 0bab7627  res/anim/abc_fade_out.xml
     852  Defl:N      376  56% 01-01-1980 08:00 6225a06b  res/anim/abc_grow_fade_in_from_bottom.xml
     508  Defl:N      258  49% 01-01-1980 08:00 41a0b5fb  res/anim/abc_popup_enter.xml
     508  Defl:N      260  49% 01-01-1980 08:00 aa2f234a  res/anim/abc_popup_exit.xml
     852  Defl:N      376  56% 01-01-1980 08:00 687167d1  res/anim/abc_shrink_fade_out_from_bottom.xml
     396  Defl:N      228  42% 01-01-1980 08:00 505f4409  res/anim/abc_slide_in_bottom.xml
     396  Defl:N      229  42% 01-01-1980 08:00 62c18818  res/anim/abc_slide_in_top.xml
     396  Defl:N      227  43% 01-01-1980 08:00 7280bebd  res/anim/abc_slide_out_bottom.xml
     396  Defl:N      228  42% 01-01-1980 08:00 6c5848d3  res/anim/abc_slide_out_top.xml
     388  Defl:N      217  44% 01-01-1980 08:00 a5fe5082  res/anim/abc_tooltip_enter.xml
     388  Defl:N      217  44% 01-01-1980 08:00 82fd0cc5  res/anim/abc_tooltip_exit.xml

     ......

    2060  Stored     2060   0% 01-01-1980 08:00 1d1cb314  res/mipmap-mdpi-v4/ic_launcher.png
    2783  Stored     2783   0% 01-01-1980 08:00 c64dbd08  res/mipmap-mdpi-v4/ic_launcher_round.png
    2963  Stored     2963   0% 01-01-1980 08:00 78bc849d  res/mipmap-hdpi-v4/ic_launcher.png
    4905  Stored     4905   0% 01-01-1980 08:00 ac8a9f01  res/mipmap-hdpi-v4/ic_launcher_round.png
    4490  Stored     4490   0% 01-01-1980 08:00 bd833a1f  res/mipmap-xhdpi-v4/ic_launcher.png
    6895  Stored     6895   0% 01-01-1980 08:00 56433f6e  res/mipmap-xhdpi-v4/ic_launcher_round.png
    6387  Stored     6387   0% 01-01-1980 08:00 ef9c5596  res/mipmap-xxhdpi-v4/ic_launcher.png
   10413  Stored    10413   0% 01-01-1980 08:00 32b2e261  res/mipmap-xxhdpi-v4/ic_launcher_round.png
    9128  Stored     9128   0% 01-01-1980 08:00 84b40e39  res/mipmap-xxxhdpi-v4/ic_launcher.png
   15132  Stored    15132   0% 01-01-1980 08:00 d8318666  res/mipmap-xxxhdpi-v4/ic_launcher_round.png
     448  Defl:N      222  50% 01-01-1980 08:00 f568abe3  res/mipmap-anydpi-v26/ic_launcher.xml
     448  Defl:N      222  50% 01-01-1980 08:00 f568abe3  res/mipmap-anydpi-v26/ic_launcher_round.xml
  260132  Stored   260132   0% 01-01-1980 08:00 ab649898  resources.arsc
--------          -------  ---                            -------
  609517           510626  16%                            440 files
```

其中，第 2 列 *Method* 就是存入 *ZIP* 文件中采用的压缩方法，参考 *JDK References* 中 [ZipEntry.setMethod(int)](https://docs.oracle.com/javase/8/docs/api/java/util/zip/ZipEntry.html#setMethod-int-)：

| setMethod |
|:----------|
| `public void setMethod(int method)`<br><br>Sets the compression method for the entry.<br><br>**Parameters:** <br>*method - the compression method, either `STORED` or `DEFLATED`*<br> **Throws:**<br> *IllegalArgumentException - if the specified compression method is invalid*<br> |

关于 `STORED` 和 `DEFLATED` 的定义：

| STORED                                                                               |
|:-------------------------------------------------------------------------------------|
| `public static final int STORED` <br><br>Compression method for uncompressed entries.|

| DEFLATED                                                                                        |
|:------------------------------------------------------------------------------------------------|
| `public static final int DEFLATED` <br><br>Compression method for compressed (deflated) entries.|

所以，采用 *ZIP* 打包的文件不一定都是压缩过的，也有未压缩的，这也很容易理解，像图片、音频、视频文件，已经编码压缩过，再用 *ZIP* 压缩也根本压缩不了多少，有的可能压缩后比原来还要大，所以，这又为我们做包体积瘦身打开了另一扇大门。

## The Solution

既然 *AP_* 文件是 *processRes Task* 的产物，那我们直接在 *processRes Task* 任务完成之后对 *AP_* 文件进行重新压缩，逻辑简单明了：

```kotlin
@AutoService(VariantProcessor::class)
class ProcessedResourcesCompressionVariantProcessor : VariantProcessor {

    override fun process(variant: BaseVariant) {
        val results = CompressionResults()

        variant.processResTask.doLast {
            variant.compressProcessedRes(results)
            variant.generateReport(results)
        }
    }

}
```

## Getting Started

开启 *ZIP* 压缩只需要引入 [booster-task-compression-processed-res](https://github.com/didi/booster/blob/master/booster-task-compression-processed-res) 即可，如下所示：


```groovy
buildscript {
    ext {
        kotlin_version = '1.3.31'
        booster_version = '4.10.0'
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
        classpath "com.didiglobal.booster:booster-gradle-plugin:$booster_version"

        /* 👇👇👇👇 引用这个模块 👇👇👇👇 */
        classpath "com.didiglobal.booster:booster-task-compression-processed-res:$booster_version"
    }
}
```

## *7-zip* Compression

[7-zip](https://www.7-zip.org/) 与 *ZIP* 压缩的原理相同，只不过 *7-zip* 采用了压缩率更高的 *LZMA* 和 *LZMA2* 算法，瘦身效果更佳，推荐使用 [AndResguard](https://github.com/shwenzhang/AndResGuard)，虽然 *7-zip* 的压缩效果非常显著，但是会存在一些副作用，可能会导致 *Google Play* 的优化算法失效。

## Is It Really Necessary to Compress *arsc* or *so*？

从技术角度来说，*Google* 官方并不推荐对 *resources.arsc* 和 *so* 进行压缩，这样会导致它们不能被直接 *mmap* 到内存，但如果从业务角度来看，如果 *APK* 的大小成为了阻碍用户增长的一个因素，而通过压缩 *resources.arsc* 和 *so* 对用户增长有显著的正向收益，何尝不可呢？

