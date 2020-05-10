# class 文件格式

*class* 文件的结构如下表所示：

| 字节偏移量                  | 字节数    | 类型／值              | 描述                                    |
|-----------------------------|-----------|-----------------------|-----------------------------------------|
| 0                           | 4         | 0xCAFEBABE            | magic number                            |
| 4                           | 2         | unsigned 16-bit int   | minor version                           |
| 6                           | 2         | unsigned 16-bit int   | major version                           |
| 8                           | 2 (cplen) | unsigned 16-bit int   | 常量数                                  |
| 10                          | cpsize    | list                  | 常量池（索引从 *1* 开始）               |
| 10+cpsize                   | 2         | unsigned 16-bit int   | access flags                            |
| 12+cpsize                   | 2         | unsigned 16-bit int   | 当前 *Class* 在常量池中的索引           |
| 14+cpsize                   | 2         | unsigned 16-bit int   | 父类 *Class* 在常量池中的索引           |
| 16+cpsize                   | 2 (ilen)  | unsigned 16-bit int   | 当前 *Class* 实现的接口数               |
| 18+cpsize                   | ilen * 2  | unsigned 16-bit int[] | 当前 *Class* 实现的接口在常量池中的索引 |
| 18+cpsize+isize             | 2         | unsigned 16-bit int   | 字段数                                  |
| 20+cpsize+isize             | fsize     | list                  | 字段列表                                |
| 20+cpsize+isize+fsize       | 2         | unsigned 16-bit int   | 方法数                                  |
| 22+cpsize+isize+fsize       | msize     | list                  | 方法列表                                |
| 22+cpsize+isize+fsize+msize | 2         | unsigned 16-bit int   | 属性数                                  |
| 24+cpsize+isize+fsize+msize | asize     | list                  | 属性列表                                |

> 更详细的 *class* 文件格式，请参考：[Java Virtual Machine Specification: Chapter 4. The *class* File Format](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-4.html#jvms-4.1)。

## *class* 版本

作为 *Android* 或者 *Java* 开发者，大多都只关心 *javac* 的版本号，为什么 *class* 文件也有版本号呢？—— 是给 JRE 看的，举两个例子：

1. *Java 7* 执行用带有 *Java 8* 编译的带 *lambda* 的 *class*
1. *Java 7* 执行用 *Java 8* 编译的不带 *Java 8* 新特性的 *class*

正常情况下，以上两种情况都不会执行成功，为什么？因为 *Java 7* 不支持 *Java 8* 编译的 *class* ，可是有人会问：第 2 种情况下，我并没有用到 *Java 8* 的新特性，为什么 *Java 7* 就不能执行呢？—— 因为 *major version* 的原因，低版本的 JRE 是不支持运行高版本的 *class* 的。

如何让第 2 种情况也能正常运行呢？—— 在用 *Java 8* 编译时指定 *-target 1.7* 或者更低即可，在 *Gradle* 中则是：

```gradle
java {
    targetCompatibility = JavaVersion.VERSION_1_7
}
```

*Java* 各版本的 *major version* 如下表所示：

| Java Version | major version |
|--------------|:-------------:|
| Java SE 14   | 58            |
| Java SE 13   | 57            |
| Java SE 12   | 56            |
| Java SE 11   | 55            |
| Java SE 10   | 54            |
| Java SE 9    | 53            |
| Java SE 8    | 52            |
| Java SE 7    | 51            |
| Java SE 6    | 50            |
| Java SE 5    | 49            |
| JDK 1.4      | 48            |
| JDK 1.3      | 47            |
| JDK 1.2      | 46            |
| JDK 1.1      | 45            |

## 常量池

每个 *class* 文件中都有一个常量池，除了 *Integer* ，*Float* ，*Long* ，*Double* ，*String* 以外，还有 *Class* ，*Field* 引用，*Method* 引用等等，所以，常量池占了整个 *class* 文件很大一部分空间，这也是为什么 *Android* 采用 *dex* 这种格式，来解决常量池带来空间浪费，当然，这只是其中原因之一。

## 属性

从 *class* 文件的结构，我们可以看出，无论是 *class* 还是 *field* ，抑或是 *method* ，*attribute* 都是位于其结构的最末尾，为什么没放在前面的位置呢？主要是因为 JVM 规范支持编译器定义自己特有的 *attribute* 的（例如：[Soot](https://github.com/Sable/soot) 就支持[给 *class* 文件新增 *attribute*](https://git.io/JvbwO)） ，正是 *attribute* 的可扩展性，这也使得 *attribute* 成为 *class* 文件结构中最复杂的部分。

在 JVM 规范定义的 23 种 *attribute* 中，以下 6 种对于 JVM 来说是可选的：

- *SourceFile*
- *SourceDebugExtension*
- *LineNumberTable*
- *LocalVariableTable*
- *LocalVariableTypeTable*
- *Deprecated*

所以，这给优化应用 size 的开发者提供了一个思路。
