# Introduction

## What is Booster?

Booster is an easy-to-use, lightweight, powerful and extensible quality optimization toolkit designed specially for mobile applications. The primary goal is to solve quality problems with the increase of APP complexity, such as performance, stability, and package size, etc.

Booster is not just a framework, it also provides a series of plugins, such as performance detection, multithreading optimization, resources index inlining, redundant resources de-redundancy, resources compression, system bug fixing, etc., which can increase the stability by 15% ~ 25%, and the package size can be reduced by 1MB ~ 10MB, or even more.

## Why Booster?

Quality optimization is a problem faced by all app developers. For apps with tens of millions of DAU, a crash rate of 1 in 10,000 means that thousands of users or devices are affected. For apps that are used for a long time, their stability is related to the product's brand, word of mouth, and user income, so the negative impact should not be underestimated.

With the rapid growth of business and the continuous increase in business complexity, we began to think:

1. How to ensure the app quality continuously?
1. How to identify which business line the problem is coming from when crash happens?
1. Is it possible to detect the potential quality problems before release？
1. Is it possible to optimize app quality globally, and non-intrusively without business code change?

Based on those consideration above, Booster came into being, after more than one year improvement, the bennefits from production data are significant. Since there are only a handful of open source projects based on static analysis in terms of quality optimization, and the threshold for quality optimization is high for app developers, so, we decided to open source Booster, hoping that more develoeprs and apps can benefit from it.

## How Does Booster Solve The Problems?

### Ensuring App Quality Continuously

For the app quality, every performance and stability optimization means investing a lot of manpower and resources. Moreover, with the expansion of business, it is possible that a little bit of achievement that has been achieved with a lot of effort before has been burned by a business requirement, and the most labor-saving way is to automate and standardize, from code style to code review, from development testing to integration testing, from canary release to production release.

Booster provides a framework for Android project quality optimization in the form of *Gradle Plugin*. Regardless of code, resources, dynamic libraries, dependencies, package size, performance, and other monitoring, all can be done by using Booster.

### Efficient Troubleshooting

As developers, we often encounter problems that occurred in a thread that has no context at all, such as *post* a `Runnable` to the main thread message queue, or starting an anonymous thread, when a crash occurs, we don’t know at all where does this `Runnable` or thread come from? This undoubtedly increases the cost of our troubleshooting. How can we help developers identify the root cause quickly?

Booster makes the bytecode instrumentation and class inheritance analysis more convenient by providing the *Transformer SPI*, and it also provides a feature for thread renaming, the troubleshooting will become more efficient by integrating it with the APM system.

### Detecting Issues Before Release

In order to detect potential problems before release, Booster provides the capability of static analysis, performance issues, security risks and codes that violates app store policies can be detected during the build process by analysing the code, resource and intermediate artifacts.

### Optimizing Non-intrusively

When the scale of app project or the organization is large enough, it's very resource-consuming to perform overall performance and stability optimization, this is not to say how high the development cost is, the main cost is actually the cross-team even cross-group communication. For some experimental optimziations, the benefits are uncertain, from business side, they are not willing to toss with you. Therefore, in order to avoid this from happening, Booster uses AOP (Aspect-Oriented Programming) pattern to optimize the overall app performance and stability without intrusion, and it's completely transparent to the business side.
