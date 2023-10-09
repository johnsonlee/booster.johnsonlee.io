# 静态分析

## 静态分析能做什么？

经过大量实践发现，很多问题其实是可以在产品发布或上线之前就能发现的，然而，由于缺乏相应的工具，导致很多问题被隐藏，并带到了线上，直到在用户侧发生，如：卡顿、崩溃、安全问题等等，通过静态分析，我们可以尽可能早的找出这些潜在的问题和风险，在上线之前将其修复，这也是创立 *Booster* 这个项目的初衷。

## Booster 的静态分析解决了什么问题？

[booster-task-analyser](https://github.com/didi/booster/tree/master/booster-task-analyser) 通过黑/白名单的方式对 APP 进行扫描，并生成相应的分析报告，使得开发者对 APP 的质量有一个更全面和深入的了解，并为更深层次的优化提供思路，包括但不限于：

1. 发现潜在的性能问题，如：可能阻塞主线程/ UI 线程的 API 调用；
1. 发现风险 API 调用；
1. 分析依赖关系；

## *Analyser* 的实现思路

### 独立的 Task

*Booster* 的静态分析采用独立的 *task* 来执行，之所以这样设计，主要有几个方面的考虑：

1. 对应用进行静态分析的频率不像构建那么频繁，所以，*Task* 比 *Transformer* 更合适；
1. *CHA (Class Hierarchy Analysis)* 需要提前拿到所有类信息，而 *Transformer* 是流水线处理，也不太合适；
1. 静态分析的过程可能会比较慢，作为 *Transformer* 可能会严重影响构建效率，而且应用的构建并不依赖静态分析的产出物；

*Analyser Task* 的依赖关系如下图所示：

<svg width="514pt" height="188pt" viewBox="0.00 0.00 513.51 188.00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="graph0" class="graph" transform="scale(1 1) rotate(0) translate(4 184)">
<title>analyser</title>
<polygon fill="#ffffff" stroke="transparent" points="-4,4 -4,-184 509.5063,-184 509.5063,4 -4,4"></polygon>
<!-- analyse -->
<g id="node1" class="node">
<title>analyse</title>
<polygon fill="#f18f01" stroke="transparent" points="281.4639,-180 216.9891,-180 216.9891,-144 281.4639,-144 281.4639,-180"></polygon>
<text text-anchor="middle" x="249.2265" y="-157.8" font-family="Helvetica,sans-Serif" font-size="14.00" fill="#ffffff">analyse</text>
</g>
<!-- analyseDebug -->
<g id="node2" class="node">
<title>analyseDebug</title>
<polygon fill="#006e90" stroke="transparent" points="238.2016,-108 132.2514,-108 132.2514,-72 238.2016,-72 238.2016,-108"></polygon>
<text text-anchor="middle" x="185.2265" y="-85.8" font-family="Helvetica,sans-Serif" font-size="14.00" fill="#ffffff">analyseDebug</text>
</g>
<!-- analyse&#45;&gt;analyseDebug -->
<g id="edge1" class="edge">
<title>analyse-&gt;analyseDebug</title>
<path fill="none" stroke="#555555" d="M233.0766,-143.8314C225.5548,-135.3694 216.47,-125.1489 208.2461,-115.8971"></path>
<polygon fill="#555555" stroke="#555555" points="210.8535,-113.5621 201.5938,-108.4133 205.6216,-118.2127 210.8535,-113.5621"></polygon>
</g>
<!-- analyseRelease -->
<g id="node3" class="node">
<title>analyseRelease</title>
<polygon fill="#006e90" stroke="transparent" points="404.8079,-108 289.6451,-108 289.6451,-72 404.8079,-72 404.8079,-108"></polygon>
<text text-anchor="middle" x="347.2265" y="-85.8" font-family="Helvetica,sans-Serif" font-size="14.00" fill="#ffffff">analyseRelease</text>
</g>
<!-- analyse&#45;&gt;analyseRelease -->
<g id="edge2" class="edge">
<title>analyse-&gt;analyseRelease</title>
<path fill="none" stroke="#555555" d="M273.956,-143.8314C286.1427,-134.8779 301.0088,-123.9558 314.1577,-114.2955"></path>
<polygon fill="#555555" stroke="#555555" points="316.5183,-116.9042 322.5049,-108.1628 312.3738,-111.263 316.5183,-116.9042"></polygon>
</g>
<!-- transformClassesWithXxxForDebug -->
<g id="node4" class="node">
<title>transformClassesWithXxxForDebug</title>
<polygon fill="#99c24d" stroke="transparent" points="238.6799,-36 -.2269,-36 -.2269,0 238.6799,0 238.6799,-36"></polygon>
<text text-anchor="middle" x="119.2265" y="-13.8" font-family="Helvetica,sans-Serif" font-size="14.00" fill="#ffffff">transformClassesWithXxxForDebug</text>
</g>
<!-- analyseDebug&#45;&gt;transformClassesWithXxxForDebug -->
<g id="edge3" class="edge">
<title>analyseDebug-&gt;transformClassesWithXxxForDebug</title>
<path fill="none" stroke="#555555" d="M168.5719,-71.8314C160.8151,-63.3694 151.4463,-53.1489 142.9655,-43.8971"></path>
<polygon fill="#555555" stroke="#555555" points="145.4427,-41.4198 136.1053,-36.4133 140.2826,-46.1499 145.4427,-41.4198"></polygon>
</g>
<!-- transformClassesWithXxxForRelease -->
<g id="node5" class="node">
<title>transformClassesWithXxxForRelease</title>
<polygon fill="#99c24d" stroke="transparent" points="505.2865,-36 257.1665,-36 257.1665,0 505.2865,0 505.2865,-36"></polygon>
<text text-anchor="middle" x="381.2265" y="-13.8" font-family="Helvetica,sans-Serif" font-size="14.00" fill="#ffffff">transformClassesWithXxxForRelease</text>
</g>
<!-- analyseRelease&#45;&gt;transformClassesWithXxxForRelease -->
<g id="edge4" class="edge">
<title>analyseRelease-&gt;transformClassesWithXxxForRelease</title>
<path fill="none" stroke="#555555" d="M355.8061,-71.8314C359.5623,-63.8771 364.0522,-54.369 368.2063,-45.5723"></path>
<polygon fill="#555555" stroke="#555555" points="371.4261,-46.9503 372.5313,-36.4133 365.0964,-43.9612 371.4261,-46.9503"></polygon>
</g>
</g>
</svg>

### 类继承分析

类继承关系分析对于静态分析至关重要，它决定了分析结果的准确性和全面性，在 *Transform* 中 *CHA* 是通过 *ClassLoader* 来实现的，相对来说比较简单，参见：[KlassPool](https://github.com/didi/booster/blob/master/booster-transform-spi/src/main/kotlin/com/didiglobal/booster/transform/KlassPool.kt) & [Klass](https://github.com/didi/booster/blob/master/booster-transform-spi/src/main/kotlin/com/didiglobal/booster/transform/Klass.kt)，主要是解决如何判断两个类型是否有继承关系的问题，*Analyser* 的 *CHA* 采用的方式是提前加载所有 *Class*，然后进行分析，主要有以下几个方面的原因：

1. *ClassLoader* 加载 *Class* 时，虽然可以不对类进行初始化，但是 *ClassLoader* 会对 *bytecode* 进行 *verify* ，可能会抛出 *VerifyError* 导致整个分析过程失败；
1. 性能开销 —— *ClassLoader* 加载 *Class* 的性能跟 *ASM* 对比相差甚远；
1. 除了分析类的继承关系外，还需要分析字段和方法以及注解，通过 *Class* 反射得到的信息有限；
1. *Task* 相对于*Transform* 比较独立，如果在 *Transform* 的过程中加载所有的 *Class* ，可能导致内存吃紧，甚至 OOM

### 静态分析入口

任何静态分析都需要入口 (Entry Point)，如果是普通的程序，一般都是 `main` 方法，而对于 Android 应用来说，主要是 `Application` 、四大组件以及 XML 布局等等，所以，首先要找到这些入口。

#### 四大组件

像 `Application` 及四大组件都在 *AndroidManifest.xml* 里，通过 [mergedManifests](https://github.com/didi/booster/blob/master/booster-android-gradle-api/src/main/kotlin/com/didiglobal/booster/gradle/BaseVariant.kt#L150) 就能获取到合并后的 *AndroidManifest.xml*

#### 自定义 View

查找自定义 *View* 最直接的方法就是解析 *Layout XML* ，通过 [mergeRes](https://github.com/didi/booster/blob/master/booster-android-gradle-api/src/main/kotlin/com/didiglobal/booster/gradle/BaseVariant.kt#L158) 就能获取到，只不过是 *AAPT2* 的产物 —— *flat* 文件，这也就是 [booster-aapt2](https://github.com/didi/booster/tree/master/booster-aapt2) 模块的由来。

> 通过实测发现：解析 *flat* 文件的速度不如直接解析 XML 源文件，所以，最终的实现只解析了 *flat* 文件的 *header* 部分，然后通过 *header* 定位到源文件的路径。

#### 线程注释标注的方法和类

Android 本身提供了 [Thread Annotations](https://developer.android.com/studio/write/annotations#thread-annotations)，帮助编译器和静态分析工具提升代码检查的准确性，所以，只要有类或者方法用 [Thread Annotations](https://developer.android.com/studio/write/annotations#thread-annotations) 标注过，则可以认为该类或者方法就是线程入口类或者方法。

  考虑到一些主流的应用框架也有线程注解，因此，*Analyser* 对 *Event Bus* 做了支持，通过 `@Subscribe(threadMode = MAIN)` 标的方法会被识别为主线程入口方法。

## 如何使用

首先在 *build.gradle* 中引用 *booster-task-analyser*：

<CodeGroup>
  <CodeGroupItem title="Groovy" active>

```groovy
buildscript {
    ext.booster_version = "4.16.3"

    dependencies {
        classpath "com.didiglobal.booster:booster-gradle-plugin:$booster_version"
        classpath "com.didiglobal.booster:booster-task-analyser:$booster_version"
    }

}
```

  </CodeGroupItem>
  <CodeGroupItem title="Kotlin">

```kotlin
buildscript {
    val booster_version = "4.16.3"

    dependencies {
        classpath("com.didiglobal.booster:booster-gradle-plugin:$booster_version")
        classpath("com.didiglobal.booster:booster-task-analyser:$booster_version")
    }

}
```

  </CodeGroupItem>
</CodeGroup>

然后在命令行执行 *analyse* 任务：

```bash
$ ./gradlew analyse
```

执行成功之后，在 *build/reports/* 目录中会生成相应的 *dot* 格式的报告，可以通过 *dot* 工具，将 *dot* 文件转换成 *png* 格式：

```bash
$ find build/reports -name '*.dot' | xargs -t -I{} dot -O -Tpng {}
```

## 白名单与黑名单

「白名单」是分析过程中忽略的 API，「黑名单」是分析过程中要匹配的 API，*Booster* 内置了 [whiltelist.txt](https://github.com/didi/booster/blob/master/booster-task-analyser/src/main/resources/whitelist.txt) 和 [blacklist.txt](https://github.com/didi/booster/blob/master/booster-task-analyser/src/main/resources/blacklist.txt)，这些都是项目实践经验所得，当然，*Booster* 也支持自定义「白名单」与「黑名单」。

### 通过 *gradle.properties* 指定黑/白名单

```properties
booster.task.analyser.whitelist=file:///Users/booster/whitelist.txt
booster.task.analyser.blacklist=file:///Users/booster/blacklist.txt
```

### 通过命令行指定黑/白名单

```bash
$ ./gradlew assembleDebug \
    -Pbooster.task.analyser.whitelist=file:///Users/booster/whitelist.txt \
    -Pbooster.task.analyser.blacklist=file:///Users/booster/blacklist.txt
```

*whitelist* 和 *blacklist* 可以是远程的 URL，如:

```bash
./gradlew assembleDebug \
    -Pbooster.task.analyser.whitelist=https://booster.johnsonlee.io/analyser/whitelist.txt
```
