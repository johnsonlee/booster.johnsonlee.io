# Multi-Round Transform

在 *Booster* 中，`Transformer` 是基于单轮 *transform* 的 *pipeline* 而设计的，但有一些特殊情况下，需要先从字节码中收集到完整的信息后，才能进行 *transform*，而这样的需求通过 `Transformer` 是不太容易实现的，为了支持在 *transform* 之前收集更多的信息，*Booster* 提供了 [Collector API](https://github.com/didi/booster/blob/master/booster-transform-spi/src/main/kotlin/com/didiglobal/booster/transform/Collector.kt#L7) 和 [Supervisor API](https://github.com/didi/booster/blob/master/booster-transform-spi/src/main/kotlin/com/didiglobal/booster/transform/Collector.kt#L23)，让开发者可以很方便的实现该需求。

## 什么是 `Collector`？

`Collector` 是在功能上对 `Transformer` 单向管道的补充，用于从 transform pipeline 中收集信息，同时也决定着 pipeline 的输入是否需要更新。

## 什么是 `Supervisor`？

`Supervisor` 是一种特殊的 `Collector`，它只是观察 transform pipeline ，并收集信息，但不会影响 pipeline 输入的更新。

## Booster 提供的 `Collector`

* [Collectors.ClassNameCollector](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/Collectors.kt#L25)
* [Collectors.ServiceCollector](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/Collector.kt#L26)
* [NameCollector](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/Collectors.kt#L53)
* [RegexCollector](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/Collectors.kt#L65)

## Booster 提供的 `Supervisor`

* [ClassDescriptorSupervisor](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/Supervisors.kt#L19)
* [ClassNameSupervisor](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/Supervisors.kt#L37)
* [ServiceSupervisor](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/Supervisors.kt#L55)

## 使用 ServiceSupervisor 收集 SPI 服务

```kotlin
@AutoService(ClassTransformer::class)
class MyTransformer : ClassTransformer {

    private val services: MutableList<Pair<String, Collection<String>>> = mutableListOf()

    override fun onPreTransform(context: TransformContext) {
        context.registerCollector(ServiceSupervisor() {
            services += it
        })
    }

    override fun transform(context: TransformContext, klass: ClassNode) = klass.apply {
        services.forEach { (api, implementation) ->
            // TODO ...
        }
    }
}
```

## 使用 NameCollector 强制更新 pipeline

下面的例子中，通过 `NameCollector` 来表示要关注 transform pipeline 中包含有 `io/johnsonlee/framework/ServiceRegistry.class` 的输入，如果匹配到对应的输入，就会在每次 transform 的时候更行强制更新，无论是否是增量构建，代码如下所示：

```kotlin
@AutoService(ClassTransformer::class)
class ServiceRegistryTransformer : ClassTransformer {

    private val services: MutableList<Pair<String, Collection<String>>> = mutableListOf()

    override fun onPreTransform(context: TransformContext) {
        context.registerCollector(ServiceSupervisor() {
            services += it
        })
        context.registerCollector(NameCollector("io/johnsonlee/framework/ServiceRegistry.class"))
    }

    override fun transform(context: TransformContext, klass: ClassNode) = klass.apply {
        when (klass.name) {
            "io/johnsonlee/framework/ServiceRegistry" -> {
                // TODO generate service registry
            }
        }
    }

}
```

## 自定义 Collector/Supervisor

开发者只根据自己的需要实现 [Collector](https://github.com/didi/booster/blob/master/booster-transform-spi/src/main/kotlin/com/didiglobal/booster/transform/Collector.kt#L7) 接口：

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

然后，在 `onPreTransform` 方法中进行注册：

```kotlin
override fun onPreTransform(context: TransformContext) {
    context.registerCollector(MyCollector())
    // TODO ...
}
```
