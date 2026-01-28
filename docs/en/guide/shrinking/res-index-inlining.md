# Resource Index Inlining

## The Problem of Resource Index

During the *Android* build process, a resource index is generated for each module (library, application), such as: *R$id.class*, *R$layout.class*, etc. This makes it very convenient for developers to reference resources in code.

For *library* modules, the index values in the *R* file are not constant values. This means that referencing *R* index values in *library* classes is actually done by accessing *R* class *fields*. This is why you cannot use resource indices in *switch-case* statements or *Annotations* in *library* projects. This is why *ButterKnife* created its own *R2* to solve this problem.

The *Android* system defines over *10* resource types. Assuming each module uses *5* resource types, *6* corresponding *class* files will be generated (including *R.class*). Due to the generally increasing complexity of project structures, an *APP* project directly or indirectly references anywhere from dozens to hundreds of *libraries*. Assuming an *APP* references *100* *libraries*, the corresponding *R* files would number at least *500* or more. Both the class count and field count represent significant waste. After all, a single *dex* has a limit of *65535*. Although there's *multi-dex* technology, each additional *dex* adds unnecessary performance overhead to installation and cold startup.

## Unnecessary R Removal

For *Android* projects, typically the *library*'s *R* is just a subset of the *application*'s *R*. Therefore, as long as we have the complete set, the subsets can all be deleted. Moreover, the constant fields in the *application*'s *R* have no further value once they've been compiled (except for reflection). Among *R* fields, *styleable* fields are an exception - they are not constants but `int[]`. So before deleting *R*, we need to determine which can be deleted and which cannot. Based on experience, indices that cannot be deleted include:

1. Fields referenced in *ConstraintLayout*, for example:

    ```xml
    <android.support.constraint.Group
        android:id="@+id/group"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:visibility="visible"
        app:constraint_referenced_ids="button4,button9" />
    ```

    Here, `R.id.button4` and `R.id.button9` must be retained because *ConstraintLayout* calls <a href="https://developer.android.com/reference/android/content/res/TypedArray#getResourceId(int,%20int)">TypedArray.getResourceId(int, int)</a> to get the *id* indices for `button4` and `button9`.

    In summary, attributes in *ConstraintLayout* that reference other *ids* include:
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
    Therefore, *Booster* parses *xml* files to extract these attributes.

1. Other resources that obtain index values through <a href="https://developer.android.com/reference/android/content/res/TypedArray#getResourceId(int,%20int)">TypedArray.getResourceId(int, int)</a> or <a href="https://developer.android.com/reference/android/content/res/Resources#getIdentifier(java.lang.String,%20java.lang.String,%20java.lang.String)">Resources.getIdentifier(String, String, String)</a>

    For these cases, a full bytecode scan is required to determine which places call <a href="https://developer.android.com/reference/android/content/res/TypedArray#getResourceId(int,%20int)">TypedArray.getResourceId(int, int)</a> or <a href="https://developer.android.com/reference/android/content/res/Resources#getIdentifier(java.lang.String,%20java.lang.String,%20java.lang.String)">Resources.getIdentifier(String, String, String)</a>. Considering the performance cost of adding another *Transform*, *Booster* provides a whitelist configuration approach to retain these resource indices.

## Unnecessary *Field* Removal

Since *Android* resource indices are only *32*-bit integers with the format: `PP` `TT` `NNNN`, where:

  - `PP` is the *Package ID*, default is `0x7f`;
  - `TT` is the *Resource Type ID*, incrementing from `1`;
  - `NNNN` is the *Name ID*, incrementing from `1`;

To save space, when building an *application*, all resource indices of the same type are re-indexed. Therefore, *library* projects cannot determine the final resource index values during build time. This is why resource indices in *library* projects are variables rather than constants. Since the final index value for each resource can be determined in the *application* project, why not replace the resource indices in *libraries* with constants as well? This way, the redundant *fields* can be deleted, which can reduce the number of *dex* files to some extent. The benefits are quite considerable.

There are several ways to obtain constant index values during compilation:

1. Reflect the *R* class file
1. Parse the *R* class file
1. Parse the *Symbol List (R.txt)*

Through *benchmark* testing, parsing the *Symbol List* approach was found to have the best performance. Therefore, obtain the mapping relationship between all resource names and index values before *Transform*, then replace the [getfield](../jvm/instructions.html#getfield) instruction with the [ldc](../jvm/instructions.html#ldc) instruction during the *Transform* process.

## Getting Started

To enable resource index inlining, simply include [booster-transform-r-inline](https://github.com/didi/booster/blob/master/booster-transform-r-inline), as shown below:


```groovy
buildscript {
    ext {
        kotlin_version = "1.5.31"
        booster_version = "4.16.3"
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

        /* Include this module */
        classpath "com.didiglobal.booster:booster-transform-r-inline:$booster_version"
    }
}
```

## Ignoring Specified Resources

[booster-transform-r-inline](https://github.com/didi/booster/blob/master/booster-transform-r-inline) supports ignoring specified resources through properties.

| Property                             | Description                                              |
|:-------------------------------------|----------------------------------------------------------|
| `booster.transform.r.inline.ignores` | Resource qualifiers to ignore (comma-separated, supports wildcards) |

### Configuring by *gradle.properties*

```properties
booster.transform.r.inline.ignores=android/*,androidx/*
```

### Configuring by Command Line

```bash
$ ./gradlew assembleDebug -Pbooster.transform.r.inline.ignores=android/*,androidx/*
```
