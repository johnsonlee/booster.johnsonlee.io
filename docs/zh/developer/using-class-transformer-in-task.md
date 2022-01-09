# 在 *Task* 中使用 *ClassTransformer*

在平常的开发过程中，我们可能需要在 *Task* 中依赖 *Android Transform Pipeline* 的产出物，例如：[booster-task-analyser](https://github.com/didi/booster/blob/master/booster-task-analyser) 就是在 [AnalyserTask](https://github.com/didi/booster/blob/master/booster-task-analyser/src/main/kotlin/com/didiglobal/booster/task/analyser/AnalyserTask.kt) 中对 *Android Transform Pipeline* 的产出物进行静态分析，针对这种应用场景，*Booster* 提供了一系列实用类和扩展方法：

- [booster-api](https://github.com/didi/booster/blob/master/booster-api)

- [VariantTransformHelper.kt](https://github.com/didi/booster/blob/master/booster-api/src/main/kotlin/com/didiglobal/booster/transform/VariantTransformHelper.kt)

## 通过 *VariantProcessor* 创建 *Task*

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

## 通过 *VariantTransformHelper* 复用 *Transformer*

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

## 自定义 *ClassTransformer*

```kotlin
@AutoService(ClassTransformer::class)
class ScannerTransformer : ClassTransformer {

    override fun transform(context: TransformContext, klass: ClassNode): ClassNode {
        // scanning klass
        klass
    }

}
```
