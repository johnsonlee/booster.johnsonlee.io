# Migrate to v5.x

## Transform API

There are no changes to the Transform API and no migration is required.

## Task API

### VariantProcessor

Replace `BaseVariant` with `Variant` in the `process` method:

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

In Booster 5.0.0, all APIs with `BaseVariant` in `AGPInterface` have been replaced with `Variant`, and some `Task` related APIs have been deprecated. Although they have not been completely deleted, they are not recommended to be used and can basically be considered unusable -- the `Task` will be null at runtime.

### Project Extension

Similar to `AGPInterface`, the `Project` extension APIs in v4.x is retained as much as possible, the `BaseVariant` parameter in the method is replaced with `Variant`, and some methods are refactored.

#### getAndroid / getAndroidOrNull

Replace `Project.getAndroid(...)` with `Project.getAndroidComponents()`, and replace `Project.getAndroidOrNull(...)` with `Project.getAndroidComponentsOrNull()`:

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

Replace variant with filter in `Project.getResolvedArtifactResults(...)` method

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
