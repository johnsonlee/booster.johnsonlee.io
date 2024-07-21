# 迁移到 v5.x

## Transform API

Transform API 没有任何变更，不需要做迁移。

## Task API

### VariantProcessor

将 `process`  方法中的 `BaseVariant` 替换为 `Variant`：

<Badge text="v4.x" />

<CodeGroup>
<CodeGroupItem title="Kotlin" active>

```kotlin
override fun process(variant: BaseVariant) {
    // ...
}
```

</CodeGroupItem>
</CodeGroup>

<Badge text="v5.x" />

<CodeGroup>
<CodeGroupItem title="Kotlin" active>

```kotlin
override fun process(variant: Variant) {
    // ...
}
```

</CodeGroupItem>
</CodeGroup>

## Gradle Compat

### AGPInterface

在 Booster 5.0.0 中，`AGPInterface` 中所有带 `BaseVariant` 的 API 已替换为 `Variant`，并废弃了一些 `Task` 相关的 API，虽然没有彻底删除，但不建议使用，基本上可以认为是不可用 -- 运行时无法获取到 AGP 的 `Task`

### Project Extension

和 `AGPInterface` 类似，尽可能保留了 v4.x 中存在的 API，将方法中的 `BaseVariant` 参数替换为了 `Variant`，个别方法做了重构。

#### getAndroid / getAndroidOrNull

将 `Project.getAndroid(...)` 替换为 `Project.getAndroidComponents()`；将 `Project.getAndroidOrNull(...)` 替换为 `Project.getAndroidComponentsOrNull()`：

<Badge text="v4.x" />

<CodeGroup>
<CodeGroupItem title="Kotlin" active>

```kotlin
val android = getAndroidOrNull<BaseExtension>()
```

</CodeGroupItem>
</CodeGroup>

<Badge text="v5.x" />

<CodeGroup>
<CodeGroupItem title="Kotlin" active>

```kotlin
val androidComponents = getAndroidComponentsOrNull<AndroidComponentsExtension<*, *, *>>()
```

</CodeGroupItem>
</CodeGroup>

#### getResolvedArtifactResults

将 `Project.getResolvedArtifactResults(...)` 方法中的 variant 替换为 filter：

<Badge text="v4.x" />

<CodeGroup>
<CodeGroupItem title="Kotlin" active>

```kotlin
val result: Set<ResolvedArtifactResult> = project.getResolvedArtifactResults(
    true,
    variant
)
```

</CodeGroupItem>
</CodeGroup>

<Badge text="v5.x" />

<CodeGroup>
<CodeGroupItem title="Kotlin" active>

```kotlin
val result: Set<ResolvedArtifactResult> = project.getResolvedArtifactResults(
    true,
    variant.filterByNameOrBuildType()
)
```

</CodeGroupItem>
</CodeGroup>
