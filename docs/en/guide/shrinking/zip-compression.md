# ZIP File Compression

## The AP_ File

In the *Android* build process, the actual work of merging *dex*, *resources*, *assets*, *so*, and other files into an *APK* is done in the *package Task*. Before the *APK* is generated, there's already a prototype - the *AP_* file, which is the artifact of the *processRes Task*. It contains:

1. `AndroidManifest.xml`
1. `res/*`
1. `resources.arsc`

Where `res/*` are all merged resources, and `resources.arsc` is the index table for `res/*` (see: [Resource Table Overview](../agp/resource-table.html)). We can check the file format using the `file` command:

```bash
$ file ./build/intermediates/processed_res/debug/out/resources-debug.ap_
```
This produces the following output:
```
./build/intermediates/processed_res/debug/out/resources-debug.ap_: Zip archive data
```

It turns out the *AP_* file is just a regular *ZIP* file. Let's view its contents using the `unzip` command:

```bash
$ unzip -lv ./build/intermediates/processed_res/debug/out/resources-debug.ap_
```
This produces the following output:
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

Column 2 *Method* shows the compression method used when storing files in the *ZIP* file. Refer to [ZipEntry.setMethod(int)](https://docs.oracle.com/javase/8/docs/api/java/util/zip/ZipEntry.html#setMethod-int-) in *JDK References*:

| setMethod |
|:----------|
| `public void setMethod(int method)`<br><br>Sets the compression method for the entry.<br><br>**Parameters:** <br>*method - the compression method, either `STORED` or `DEFLATED`*<br> **Throws:**<br> *IllegalArgumentException - if the specified compression method is invalid*<br> |

About the definitions of `STORED` and `DEFLATED`:

| STORED                                                                               |
|:-------------------------------------------------------------------------------------|
| `public static final int STORED` <br><br>Compression method for uncompressed entries.|

| DEFLATED                                                                                        |
|:------------------------------------------------------------------------------------------------|
| `public static final int DEFLATED` <br><br>Compression method for compressed (deflated) entries.|

Therefore, files packaged with *ZIP* are not necessarily all compressed; some are uncompressed. This is easy to understand - files like images, audio, and video are already encoded and compressed, and compressing them again with *ZIP* won't reduce their size much. Some may even become larger after compression. This opens another door for APK size optimization.

## The Solution

Since the *AP_* file is the artifact of the *processRes Task*, we can re-compress the *AP_* file directly after the *processRes Task* completes. The logic is simple and clear:

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

To enable *ZIP* compression, simply include [booster-task-compression-processed-res](https://github.com/didi/booster/blob/master/booster-task-compression-processed-res), as shown below:


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
        classpath "com.didiglobal.booster:booster-gradle-plugin:$booster_version"

        /* Include this module */
        classpath "com.didiglobal.booster:booster-task-compression-processed-res:$booster_version"
    }
}
```

## *7-zip* Compression

[7-zip](https://www.7-zip.org/) works on the same principle as *ZIP* compression, but *7-zip* uses the higher compression ratio *LZMA* and *LZMA2* algorithms for better size reduction. It's recommended to use [AndResguard](https://github.com/shwenzhang/AndResGuard). Although *7-zip* compression results are very significant, there can be some side effects - it may cause *Google Play*'s optimization algorithm to fail.

## Is It Really Necessary to Compress *arsc* or *so*?

From a technical perspective, *Google* officially does not recommend compressing *resources.arsc* and *so*, as this prevents them from being directly *mmap*ed into memory. However, from a business perspective, if the *APK* size becomes a factor hindering user growth, and compressing *resources.arsc* and *so* has significant positive benefits for user growth, why not?
