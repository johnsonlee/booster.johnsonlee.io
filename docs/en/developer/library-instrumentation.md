# Library Instrumentation

## What Is Library Instrumentation?

Typically, we modify or inject bytecode in *ClassTransformer*. What if the bytecode injected in *ClassTransformer* depends on another library (JAR / AAR)? There are several approaches:

1. Embed the library in *resources*, then copy it to the *Transform* output directory in *ClassTransformer*
1. Download from remote to the *Transform* output directory
1. ......

What if this library (JAR / AAR) depends on other libraries (JAR / AAR)? Although this makes things more complicated, it's not impossible. We can integrate dependency management tools like *Maven* or *Ivy*.

What if a transitive dependency library already exists in the *APP*, but the version differs from what the *APP* depends on? In this case, the previous methods become difficult to implement. Is there a simpler approach? Of course there is - this is the original intention behind designing *VariantProcessor*, to make large-scale bytecode injection easier.

## How It Works?

First, let's review the respective responsibilities of *ClassTransformer* and *VariantProcessor*:

- *ClassTransformer* is mainly used for bytecode manipulation. It's not easy for *ClassTransformer* to handle content other than bytecode, such as resources, creating *Task*, etc.
- *VariantProcessor* is mainly responsible for work other than bytecode manipulation, such as creating *Task*, accessing build intermediate artifacts, etc.

Why design it this way? There are mainly two considerations:

1. Clearer division of responsibilities
1. Decoupling *ClassTransformer* from *Gradle API*

  On one hand, this facilitates unit testing; on the other hand, it allows *ClassTransformer* to be reused in non-*Gradle* projects.


## Practice

Many *Android* developers have encountered dynamic library loading failures, for example:

```
java.lang.UnsatisfiedLinkError: Couldn't load xxx from loader dalvik.system.PathClassLoader: findLibrary returned null
  at java.lang.Runtime.loadLibrary(Runtime.java:365)
  at java.lang.System.loadLibrary(System.java:535)
  at com.your.app.NativeClass.<clinit>(Native.java:16)
  ... 63 more
```

We can use [ReLinker](https://github.com/KeepSafe/ReLinker) to prevent such crashes. How to use *Booster* to inject [ReLinker](https://github.com/KeepSafe/ReLinker)? This question is left as an exercise for the readers.
