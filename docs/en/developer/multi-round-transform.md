# Multi-Round Transform

In *Booster*, `Transformer` is designed based on a single-round *transform* *pipeline*. However, in some special cases, complete information needs to be collected from bytecode before *transform* can proceed. Such requirements are not easy to implement through `Transformer`. To support collecting more information before *transform*, *Booster* provides the [Collector API](https://github.com/didi/booster/blob/master/booster-transform-spi/src/main/kotlin/com/didiglobal/booster/transform/Collector.kt#L7) and [Supervisor API](https://github.com/didi/booster/blob/master/booster-transform-spi/src/main/kotlin/com/didiglobal/booster/transform/Collector.kt#L23), allowing developers to easily implement this requirement.

## What is `Collector`?

`Collector` is a functional complement to the unidirectional pipeline of `Transformer`, used to collect information from the transform pipeline, and also determines whether the pipeline input needs to be updated.

## What is `Supervisor`?

`Supervisor` is a special type of `Collector` that only observes the transform pipeline and collects information, but does not affect the update of pipeline input.

## Provided `Collector`

* [Collectors.ClassNameCollector](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/Collectors.kt#L25)
* [Collectors.ServiceCollector](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/Collector.kt#L26)
* [NameCollector](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/Collectors.kt#L53)
* [RegexCollector](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/Collectors.kt#L65)

## Provided `Supervisor`

* [ClassDescriptorSupervisor](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/Supervisors.kt#L19)
* [ClassNameSupervisor](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/Supervisors.kt#L37)
* [ServiceSupervisor](https://github.com/didi/booster/blob/master/booster-transform-util/src/main/kotlin/com/didiglobal/booster/transform/util/Supervisors.kt#L55)

## Collecting SPI Services

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

## Force Update Transform Inputs

In the example below, `NameCollector` is used to indicate that we are interested in inputs in the transform pipeline that contain `io/johnsonlee/framework/ServiceRegistry.class`. If a matching input is found, it will be force-updated during each transform, regardless of whether it's an incremental build. The code is as follows:

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

## Custom Collector/Supervisor

Developers can implement the [Collector](https://github.com/didi/booster/blob/master/booster-transform-spi/src/main/kotlin/com/didiglobal/booster/transform/Collector.kt#L7) interface according to their needs:

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

Then, register it in the `onPreTransform` method:

```kotlin
override fun onPreTransform(context: TransformContext) {
    context.registerCollector(MyCollector())
    // TODO ...
}
```
