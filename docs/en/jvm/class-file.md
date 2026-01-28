# Class File Format

The structure of a *class* file is shown in the table below:

| Byte Offset                 | Byte Size | Type/Value            | Description                                      |
|-----------------------------|-----------|----------------------|--------------------------------------------------|
| 0                           | 4         | 0xCAFEBABE            | magic number                                     |
| 4                           | 2         | unsigned 16-bit int   | minor version                                    |
| 6                           | 2         | unsigned 16-bit int   | major version                                    |
| 8                           | 2 (cplen) | unsigned 16-bit int   | constant count                                   |
| 10                          | cpsize    | list                  | constant pool (index starts from *1*)            |
| 10+cpsize                   | 2         | unsigned 16-bit int   | access flags                                     |
| 12+cpsize                   | 2         | unsigned 16-bit int   | index of current *Class* in constant pool        |
| 14+cpsize                   | 2         | unsigned 16-bit int   | index of parent *Class* in constant pool         |
| 16+cpsize                   | 2 (ilen)  | unsigned 16-bit int   | number of interfaces implemented by current *Class* |
| 18+cpsize                   | ilen * 2  | unsigned 16-bit int[] | indices of interfaces implemented by current *Class* in constant pool |
| 18+cpsize+isize             | 2         | unsigned 16-bit int   | field count                                      |
| 20+cpsize+isize             | fsize     | list                  | field list                                       |
| 20+cpsize+isize+fsize       | 2         | unsigned 16-bit int   | method count                                     |
| 22+cpsize+isize+fsize       | msize     | list                  | method list                                      |
| 22+cpsize+isize+fsize+msize | 2         | unsigned 16-bit int   | attribute count                                  |
| 24+cpsize+isize+fsize+msize | asize     | list                  | attribute list                                   |

> For more detailed *class* file format, please refer to: [Java Virtual Machine Specification: Chapter 4. The *class* File Format](https://docs.oracle.com/javase/specs/jvms/se8/html/jvms-4.html#jvms-4.1).

## *class* Version

As an *Android* or *Java* developer, most people only care about the *javac* version number. So why do *class* files also have version numbers? -- It's for the JRE to check. Here are two examples:

1. *Java 7* executing a *class* compiled with *Java 8* that contains *lambda* expressions
1. *Java 7* executing a *class* compiled with *Java 8* that does not use any *Java 8* new features

Under normal circumstances, neither of the above scenarios will execute successfully. Why? Because *Java 7* does not support *class* files compiled with *Java 8*. But someone might ask: in the second scenario, I didn't use any *Java 8* new features, so why can't *Java 7* execute it? -- Because of the *major version*. Lower version JREs do not support running higher version *class* files.

How can we make the second scenario work properly? -- When compiling with *Java 8*, specify *-target 1.7* or lower. In *Gradle*, this would be:

```groovy
java {
    targetCompatibility = JavaVersion.VERSION_1_7
}
```

The *major version* for each *Java* version is shown in the table below:

| Java Version | major version |
|--------------|:-------------:|
| Java SE 14   | 58            |
| Java SE 13   | 57            |
| Java SE 12   | 56            |
| Java SE 11   | 55            |
| Java SE 10   | 54            |
| Java SE 9    | 53            |
| Java SE 8    | 52            |
| Java SE 7    | 51            |
| Java SE 6    | 50            |
| Java SE 5    | 49            |
| JDK 1.4      | 48            |
| JDK 1.3      | 47            |
| JDK 1.2      | 46            |
| JDK 1.1      | 45            |

## Constant Pool

Every *class* file has a constant pool. Besides *Integer*, *Float*, *Long*, *Double*, and *String*, it also contains *Class*, *Field* references, *Method* references, and more. Therefore, the constant pool occupies a large portion of the entire *class* file. This is one of the reasons why *Android* uses the *dex* format -- to solve the space waste caused by constant pools. Of course, this is only one of the reasons.

## Attributes

From the structure of the *class* file, we can see that whether it's *class*, *field*, or *method*, *attribute* is always located at the end of its structure. Why isn't it placed at the beginning? The main reason is that the JVM specification supports compilers defining their own specific *attributes* (for example: [Soot](https://github.com/Sable/soot) supports [adding new *attributes* to *class* files](https://git.io/JvbwO)). It's precisely this extensibility of *attributes* that makes them the most complex part of the *class* file structure.

Among the 23 *attributes* defined in the JVM specification, the following 6 are optional for the JVM:

- *SourceFile*
- *SourceDebugExtension*
- *LineNumberTable*
- *LocalVariableTable*
- *LocalVariableTypeTable*
- *Deprecated*

This provides developers who are optimizing application size with an approach to consider.
