# 资源索引内联

## 资源索引的问题

*Android* 在构建的过程中，会为每个模块（库、应用）生成一份资源索引，诸如：*R$id.class*，*R$layout.class* 等等，这对于开发者来说，在代码里引用资源十分的方便。

对于 *library* 模块来说，*R* 文件中的索引值并非常量值，以至于 *library* 的类中引用 *R* 索引值的方式其实是调用 *R* 类的 *field* 来实现的，这也是为什么在 *library* 工程中不能在 *switch-case* 语句或者 *Annotation* 中使用资源索引的原因。以至于 *ButterKnife* 创造了独有的 *R2* 来解决这个问题。

*Android* 系统中定义了 *10* 多种资源类型，假设每个模块使用了 *5* 种资源类型，就会生成 *6* 个对应的 *class* 文件（包括 *R.class*），由于工程结构的复杂度普遍上升，在 *APP* 工程中直接或间接引用的 *library* 少则几十，多则上百，假设 *APP* 中引用了 *100* 个 *library*，那对应的 *R* 文件至少是 *500* 个以上，无论是类数量、字段数量都是巨大的浪费，毕竟单个 *dex* 有 *65535* 的限制，虽然有 *multi-dex* 技术，但多一个 *dex* 就会为安装、冷启动增加不必要的性能开销。

## 删除不必要的 R

对于 *Android* 工程来说，通常，*library* 的 *R* 只是 *application* 的 *R* 的一个子集，所以，只要有了全集，子集是可以通通删掉的，而且，*application* 的 *R* 中的常量字段，一旦参与编译后，就再也没有利用价值（反射除外）。在 *R* 的字段，*styleable* 字段是一个例外，它不是常量，它是 `int[]`。所以，删除 *R* 之前，我们要弄清楚要确定哪些是能删的，哪些是不能删的，根据经验来看，不能删的索引有：

1. *ConstraintLayout* 中引用的字段，例如：

    ```xml
    <android.support.constraint.Group
        android:id="@+id/group"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:visibility="visible"
        app:constraint_referenced_ids="button4,button9" />
    ```

    其中，`R.id.button4` 和 `R.id.button9` 是必须要保留的，因为 *ContraintLayout* 会调用 <a href="https://developer.android.com/reference/android/content/res/TypedArray#getResourceId(int,%20int)">TypedArray.getResourceId(int, int)</a> 来获取 `button4` 和 `button9` 的 *id* 索引。

    总结下来，在 *ConstraintLayout* 中引用其它 *id* 的属性如下：
    - `constraint_referenced_ids`
    - `layout_constraintLeft_toLeftOf`
    - `layout_constraintLeft_toRightOf`
    - `layout_constraintRight_toLeftOf`
    - `layout_constraintRight_toRightOf`
    - `layout_constraintTop_toTopOf`
    - `layout_constraintTop_toBottomOf`
    - `layout_constraintBottom_toTopOf`
    - `layout_constraintBottom_toBottomOf`
    - `layout_constraintBaseline_toBaselineOf`
    - `layout_constraintStart_toEndOf`
    - `layout_constraintStart_toStartOf`
    - `layout_constraintEnd_toStartOf`
    - `layout_constraintEnd_toEndOf`
    因此，*Booster* 采用了解析 *xml* 的方式，从 *xml* 中提取以上属性。

1. 其它通过 <a href="https://developer.android.com/reference/android/content/res/TypedArray#getResourceId(int,%20int)">TypedArray.getResourceId(int, int)</a> 或 <a href="https://developer.android.com/reference/android/content/res/Resources#getIdentifier(java.lang.String,%20java.lang.String,%20java.lang.String)">Resources.getIdentifier(String, String, String)</a> 来获取索引值的资源

    针对这种情况，需要对字节码进行全盘扫描才能确定哪些地方调用了 <a href="https://developer.android.com/reference/android/content/res/TypedArray#getResourceId(int,%20int)">TypedArray.getResourceId(int, int)</a> 或 <a href="https://developer.android.com/reference/android/content/res/Resources#getIdentifier(java.lang.String,%20java.lang.String,%20java.lang.String)">Resources.getIdentifier(String, String, String)</a>，考虑到增加一次 *Transform* 带来的性能损耗，*Booster* 提供了通过配置白名单的方式来保留这些资源索引。

## 删除不必要的 *Field*

由于 *Android* 的资源索引只有 *32* 位整型，格式为：`PP` `TT` `NNNN`，其中：

  - `PP` 为 *Package ID*，默认为 `0x7f`；
  - `TT` 为 *Resource Type ID*，从 `1` 开始依次递增；
  - `NNNN` 为 *Name ID*，从 `1` 开始依次递增；

为了节省空间，在构建 *application* 时，所有同类型的资源索引会重排，所以，*library* 工程在构建期间无法确定资源最终的索引值，这就是为什么 *library* 工程中的资源索引是变量而非常量，既然在 *application* 工程中可以确定每个资源最终的索引值了，为什么不将 *library* 中的资源索引也替换为常量呢？这样就可以删掉多余的 *field* 了，在一定程度上可以减少 *dex* 的数量，收益是相当的可观。

在编译期间获取索引常量值有很多种方法：

1. 反射 *R* 类文件
1. 解析 *R* 类文件
1. 解析 *Symbol List (R.txt)*

经过 *benchmark* 测试发现，解析 *Symbol List* 的方案性能最优，因此，在 *Transform* 之前拿到所有资源名称与索引值的映射关系，然后在 *Transform* 的过程中将 [getfield](../jvm/instructions.html#getfield) 指令替换成 [ldc](../jvm/instructions.html#ldc) 指令即可。

## 如何使用

开启资源索引内联只需要引入 [booster-transform-r-inline](https://github.com/didi/booster/blob/master/booster-transform-r-inline) 即可，如下所示：


```groovy
buildscript {
    ext {
        kotlin_version = "1.5.31"
        booster_version = "4.16.2"
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
        classpath "com.didiglobal.booster:booster-transform-r-inline:$booster_version"
    }
}
```

## 忽略特定的资源

[booster-transform-r-inline](https://github.com/didi/booster/blob/master/booster-transform-r-inline) 支持通过属性的方式来忽略指定的资源。

| 属性                                 | 说明                                    |
|:-------------------------------------|-----------------------------------------|
| `booster.transform.r.inline.ignores` | 忽略的资源限定符（逗号分隔，支持通配符）|

### 通过 *gradle.properties* 配置

```properties
booster.transform.r.inline.ignores=android/*,androidx/*
```

### 通过命令行配置

```bash
$ ./gradlew assembleDebug -Pbooster.transform.r.inline.ignores=android/*,androidx/*
```
