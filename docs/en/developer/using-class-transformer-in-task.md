# Using ClassTransformer with Task

In daily development, we may need to depend on the artifacts of the *Android Transform Pipeline* in a *Task*. For example, [booster-task-analyser](https://github.com/didi/booster/blob/master/booster-task-analyser) performs static analysis on the artifacts of the *Android Transform Pipeline* in [AnalyserTask](https://github.com/didi/booster/blob/master/booster-task-analyser/src/main/kotlin/com/didiglobal/booster/task/analyser/AnalyserTask.kt). For this use case, *Booster* provides a series of utility classes and extension methods:

- [booster-api](https://github.com/didi/booster/blob/master/booster-api)

- [VariantTransformHelper.kt](https://github.com/didi/booster/blob/master/booster-api/src/main/kotlin/com/didiglobal/booster/transform/VariantTransformHelper.kt)

## Creating *Task* via *VariantProcessor*

```kotlin
@AutoService(VariantProcessor::class)
class ScannerVariantProcessor : VariantProcessor {

    override fun process(variant: BaseVariant) {
        val project = variant.project
        val variantName = variant.name.capitalize()
        val transform = variant.extension.transforms.reversed().first {
            it.scopes.containsAll(TransformManager.SCOPE_FULL_PROJECT)
                    && it.inputTypes.contains(QualifiedContent.DefaultContentType.CLASSES)
        } ?: throw GradleException("No available transform")

        project.tasks.withType(TransformTask::class.java).find {
            it.name.endsWith(variantName) && it.transform == transform
        }?.let { transformTask ->
            project.tasks.create("scan${variantName}", ScannerTask::class.java) {
                it.variant = variant
                it.supplier = {
                    transformTask.outputs.files.single()
                }
            }.dependsOn(transformTask)
        }
    }

}
```

## Reusing *Transformer* via *VariantTransformHelper*

```kotlin
open class ScannerTask : AbstractTask() {

    lateinit var variant: BaseVariant

    lateinit var supplier: () -> File

    @get:Input
    val variantName: String
        get() = variant.name

    @TaskAction
    fun scan() {
        VariantTransformHelper(variant, supplier())
            .transform(project.projectDir, AsmTransformer(ScannerTransformer()))
    }

}
```

## Custom *ClassTransformer*

```kotlin
@AutoService(ClassTransformer::class)
class ScannerTransformer : ClassTransformer {

    override fun transform(context: TransformContext, klass: ClassNode): ClassNode {
        // scanning klass
        klass
    }

}
```
