# Library Instrumentation

## What Is Library Instrumentation?

通常，我们会在 *ClassTransformer* 中修改或者注入字节码，如果在 *ClassTransformer* 注入的字节码依赖于另一个类库（JAR / AAR），我们该怎么办呢？办法有很多：

1. 将类库内置到 *resources* 中，然后在 *ClassTransformer* 中将其拷贝到 *Transform* 的输出目录中
1. 从远程下载到 *Transform* 的输出目录中
1. ......

如果这个类库（JAR / AAR）又依赖了其它的类库（JAR / AAR），那我们该怎么办呢？虽然这样会让事情变得很复杂，也不是没有办法，可以把 *Maven* 或者 *Ivy* 等依赖管理工具的类库集成进来。

如果传递依赖的类库在 *APP* 中已经存在，而且跟 *APP* 依赖的类库版本不一致，那我们该怎么办呢？如果是这样的话，前面的方法就不太容易实现了，有没有更简单的办法呢？当然有，这就是设计 *VariantProcessor* 的初衷，让大规模的字节码注入变得更容易。

## How It Works?

首先，我们来回顾一下 *ClassTransformer* 与 *VariantProcessor* 各自的职责：

- *ClassTransformer* 主要用于操作字节码，除了字节码以外的内容，*ClassTransformer* 是不太容易操作的，比如：资源、创建 *Task* 等 
- *VariantProcessor* 主要负责除操作字节码以外的其它工作，比如：创建 *Task*，访问构建中间产物，等等。

为什么要这么设计呢？主要是两方面的考虑：

1. 分工更明确
1. 将 *ClassTransformer* 与 *Gradle API* 解耦

  一方面，便于单元测试，另一方面，可以在非 *Gradle* 工程中复用 *ClassTransformer*


## Practice

相信很多 *Android* 开发者有遇到动态库加载失败的情况，例如：

```
java.lang.UnsatisfiedLinkError: Couldn't load xxx from loader dalvik.system.PathClassLoader: findLibrary returned null
  at java.lang.Runtime.loadLibrary(Runtime.java:365)
  at java.lang.System.loadLibrary(System.java:535)
  at com.your.app.NativeClass.<clinit>(Native.java:16)
  ... 63 more
```

我们可以使用 [ReLinker](https://github.com/KeepSafe/ReLinker) 来避免这种崩溃的发生，如何使用 *Booster* 来完成对 [ReLinker](https://github.com/KeepSafe/ReLinker) 的注入呢？这个问题就留给本书的读者吧。
