# Multi-Round Transform

在 *Booster* 中，`Transformer` 是基于单轮 *transform* 的 *pipeline* 而设计的，但有一些特殊情况下，需要先从字节码中收集到完整的信息后，才能进行 *transform*，而这是与 `Transformer` 的设计相违背的，为了支持在 *transform* 之前收集更多的信息，*Booster* 提供了 [Collector](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/Collector.kt#L9) 工具接口，让开发者可以很方便的实现该需求。

*Booster* 提供的以下几种 `Collector`:

* [Collectors.ClassNameCollector](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/Collector.kt#L16)
* [Collectors.ServiceCollector](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/Collector.kt#L26)

## 使用 ServiceCollector 收集 SPI 服务

```kotlin
@AutoService(ClassTransformer::class)
class MyTransformer : ClassTransformer {

    private val services: MutableMap<String, Collection<String>> = mutableMapOf()

    override fun onPreTransform(context: TransformContext) {
        services += context.collect(Collectors.ServiceCollector)
    }

    override fun transform(context: TransformContext, klass: ClassNode): ClassNode {
        // TODO transform with services
        return klass
    }
}
```

## 自定义 Collector

开发者只根据自己的需要实现 [Collector](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/Collector.kt#L9) 接口：

```kotlin
class MyCollector : Collector<String> {

    override fun accept(name: String): Boolean = true

    override fun collect(name: String, data: () -> ByteArray): String {
        val klass = data().asClassNode()
        // TODO
        return ...
    }

}
```

然后，在 `onPreTransform` 方法中调用扩展方法 `TransformContext.collect(Collector)`：

```kotlin
override fun onPreTransform(context: TransformContext) {
    val info = context.collect(MyCollector())
    // TODO ...
}
```
