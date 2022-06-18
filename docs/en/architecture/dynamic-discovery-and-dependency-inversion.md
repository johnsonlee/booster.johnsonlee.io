# 动态发现与依赖反转

## 动态发现

为了让各个特性模块保持高度的独立性和开发的便利性，*Booster* 采用了动态发现的方式来加载各个特性模块，只需要在 *classpath* 中引入相应的模块即可，如下所示：

```groovy
buildscript {

    ext.booster_version = '4.10.0'

    dependencies {
        classpath "com.didiglobal.booster:booster-gradle-plugin:$booster_version"

        // ......

        classpath "com.didiglobal.booster:booster-task-analyser:$booster_version"
        classpath "com.didiglobal.booster:booster-transform-thread:$booster_version"
        classpath "com.didiglobal.booster:booster-transform-webview:$booster_version"
        classpath "com.didiglobal.booster:booster-transform-shared-preferences:$booster_version"

        // ......
    }

}
```

## 依赖反转

要在运行时动态的发现和加载第三方的类，比较典型的解决方案是采用依赖注入的方式来实现，目前比较流行的依赖注入框架有：

1. [Spring Framework](https://spring.io/projects/spring-framework)
1. [Google Guice](https://github.com/google/guice)
1. [Dagger](https://github.com/google/dagger)

## Service Provider Interface

除此之外，*JDK* 从 *1.6* 开始，便提供了 [SPI (Service Provider Interface)](https://docs.oracle.com/javase/tutorial/sound/SPI-intro.html) 的机制，来解决在 *JDK* 中调用第三方 *Library* 的问题，在 *JDK* 中，比较常见的 *SPI* 调用有：

1. *JDBC* 驱动的加载，详见：`java.sql.DriverManager`

    ```java
    private static void loadInitialDrivers() {
        String drivers;
        try {
            drivers = AccessController.doPrivileged(new PrivilegedAction<String>() {
                public String run() {
                    return System.getProperty("jdbc.drivers");
                }
            });
        } catch (Exception ex) {
            drivers = null;
        }
        // If the driver is packaged as a Service Provider, load it.
        // Get all the drivers through the classloader
        // exposed as a java.sql.Driver.class service.
        // ServiceLoader.load() replaces the sun.misc.Providers()

        AccessController.doPrivileged(new PrivilegedAction<Void>() {
            public Void run() {

                ServiceLoader<Driver> loadedDrivers = ServiceLoader.load(Driver.class);
                Iterator<Driver> driversIterator = loadedDrivers.iterator();

                /* Load these drivers, so that they can be instantiated.
                 * It may be the case that the driver class may not be there
                 * i.e. there may be a packaged driver with the service class
                 * as implementation of java.sql.Driver but the actual class
                 * may be missing. In that case a java.util.ServiceConfigurationError
                 * will be thrown at runtime by the VM trying to locate
                 * and load the service.
                 *
                 * Adding a try catch block to catch those runtime errors
                 * if driver not available in classpath but it's
                 * packaged as service and that service is there in classpath.
                 */
                try{
                    while(driversIterator.hasNext()) {
                        driversIterator.next();
                    }
                } catch(Throwable t) {
                // Do nothing
                }
                return null;
            }
        });

        println("DriverManager.initialize: jdbc.drivers = " + drivers);

        if (drivers == null || drivers.equals("")) {
            return;
        }
        String[] driversList = drivers.split(":");
        println("number of Drivers:" + driversList.length);
        for (String aDriver : driversList) {
            try {
                println("DriverManager.Initialize: loading " + aDriver);
                Class.forName(aDriver, true,
                        ClassLoader.getSystemClassLoader());
            } catch (Exception ex) {
                println("DriverManager.Initialize: load failed: " + ex);
            }
        }
    }
    ```

1. 打印服务查找，详见：`javax.print.PrintServiceLookup`

    ```java
    private static ArrayList getAllLookupServices() {
        synchronized (PrintServiceLookup.class) {
            ArrayList listOfLookupServices = getListOfLookupServices();
            if (listOfLookupServices != null) {
                return listOfLookupServices;
            } else {
                listOfLookupServices = initListOfLookupServices();
            }
            try {
                java.security.AccessController.doPrivileged(
                     new java.security.PrivilegedExceptionAction() {
                        public Object run() {
                            Iterator<PrintServiceLookup> iterator =
                                ServiceLoader.load(PrintServiceLookup.class).
                                iterator();
                            ArrayList los = getListOfLookupServices();
                            while (iterator.hasNext()) {
                                try {
                                    los.add(iterator.next());
                                }  catch (ServiceConfigurationError err) {
                                    /* In the applet case, we continue */
                                    if (System.getSecurityManager() != null) {
                                        err.printStackTrace();
                                    } else {
                                        throw err;
                                    }
                                }
                            }
                            return null;
                        }
                });
            } catch (java.security.PrivilegedActionException e) {
            }

            return listOfLookupServices;
        }
    }
    ```

1. 基于事件驱动的 *XML* 解析，详见：`javax.xml.parsers.FactoryFinder`

    ```java
    /*
     * Try to find provider using the ServiceLoader API
     *
     * @param type Base class / Service interface  of the factory to find.
     *
     * @return instance of provider class if found or null
     */
    private static <T> T findServiceProvider(final Class<T> type) {
        try {
            return AccessController.doPrivileged(new PrivilegedAction<T>() {
                public T run() {
                    final ServiceLoader<T> serviceLoader = ServiceLoader.load(type);
                    final Iterator<T> iterator = serviceLoader.iterator();
                    if (iterator.hasNext()) {
                        return iterator.next();
                    } else {
                        return null;
                    }
                 }
            });
        } catch(ServiceConfigurationError e) {
            // It is not possible to wrap an error directly in
            // FactoryConfigurationError - so we need to wrap the
            // ServiceConfigurationError in a RuntimeException.
            // The alternative would be to modify the logic in
            // FactoryConfigurationError to allow setting a
            // Throwable as the cause, but that could cause
            // compatibility issues down the road.
            final RuntimeException x = new RuntimeException(
                    "Provider for " + type + " cannot be created", e);
            final FactoryConfigurationError error =
                    new FactoryConfigurationError(x, x.getMessage());
            throw error;
        }
    }
    ```

由于 *SPI* 简单易用，而且无需依赖额外的类库，所以，*Booster* 选择了通过 *SPI* 的方式，来实现功能模块的动态发现与加载。

从上面的例子，我们可以发现，它们都是通过 `java.util.ServiceLoader` 来完成 *SPI* 实现类的动态加载，那 `ServiceLoader` 究竟是如何做到的呢？让我们来看看 `ServiceLoader` 的源代码：

```java
public final class ServiceLoader<S>
    implements Iterable<S>
{
    private static final String PREFIX = "META-INF/services/";


    ......

    public void reload() {
        providers.clear();
        lookupIterator = new LazyIterator(service, loader);
    }

    // Private inner class implementing fully-lazy provider lookup
    //
    private class LazyIterator
        implements Iterator<S>
    {

        Class<S> service;
        ClassLoader loader;
        Enumeration<URL> configs = null;
        Iterator<String> pending = null;
        String nextName = null;

        private LazyIterator(Class<S> service, ClassLoader loader) {
            this.service = service;
            this.loader = loader;
        }

        private boolean hasNextService() {
            if (nextName != null) {
                return true;
            }
            if (configs == null) {
                try {
                    String fullName = PREFIX + service.getName();
                    if (loader == null)
                        configs = ClassLoader.getSystemResources(fullName);
                    else
                        configs = loader.getResources(fullName);
                } catch (IOException x) {
                    fail(service, "Error locating configuration files", x);
                }
            }
            while ((pending == null) || !pending.hasNext()) {
                if (!configs.hasMoreElements()) {
                    return false;
                }
                pending = parse(service, configs.nextElement());
            }
            nextName = pending.next();
            return true;
        }

        private S nextService() {
            if (!hasNextService())
                throw new NoSuchElementException();
            String cn = nextName;
            nextName = null;
            Class<?> c = null;
            try {
                c = Class.forName(cn, false, loader);
            } catch (ClassNotFoundException x) {
                fail(service,
                     "Provider " + cn + " not found");
            }
            if (!service.isAssignableFrom(c)) {
                fail(service,
                     "Provider " + cn  + " not a subtype");
            }
            try {
                S p = service.cast(c.newInstance());
                providers.put(cn, p);
                return p;
            } catch (Throwable x) {
                fail(service,
                     "Provider " + cn + " could not be instantiated",
                     x);
            }
            throw new Error();          // This cannot happen
        }

        public boolean hasNext() {
            if (acc == null) {
                return hasNextService();
            } else {
                PrivilegedAction<Boolean> action = new PrivilegedAction<Boolean>() {
                    public Boolean run() { return hasNextService(); }
                };
                return AccessController.doPrivileged(action, acc);
            }
        }

        public S next() {
            if (acc == null) {
                return nextService();
            } else {
                PrivilegedAction<S> action = new PrivilegedAction<S>() {
                    public S run() { return nextService(); }
                };
                return AccessController.doPrivileged(action, acc);
            }
        }

        public void remove() {
            throw new UnsupportedOperationException();
        }

    }

    ......

}
```

从上面的代码，我们可以发现，`ServiceLoader` 实现动态加载的关键在于 `ServiceLoader$LazyIterator`，它通过 `ClassLoader` 从 *classpath* 中查找名称为 `META-INF/services/${InterfaceName}` 的 *SPI* 配置资源，并从中逐行读取接口对应的实现类的类名，然后通过反射来实例化该接口的实现类。

基于这一原理，只要 *SPI* 配置存在于 *classpath* 中，就能在运行时被 `ServiceLoader` 查找到，这也是为什么使用 *Booster* 模块只需要在 *buildscript* 的 *dependencies* 中加上一行 `classpath` 就可以自动启用该特性的原因。

## Google AutoService

通过 `ServiceLoader$LazyIterator` 我们了解到，要通过 `ServiceLoader` 来查找 *SPI* 实现类，必须在 `META-INF/services/` 中对相应的接口进行配置，如果 *SPI* 接口比较多的话，配置起来就会比较繁琐，而且手动配置还容易出错，为了解决这一问题，*Google* 提供了根据 *Annotation* 自动生成 *SPI* 配置的工具 —— [AutoService](https://github.com/google/auto/tree/master/service)，只需要在 *SPI* 接口的实现类上加上 `@AutoService(InterfaceName.class)`，如下所示：

```kotlin
@AutoService(ClassTransformer::class)
class MyTransformer : ClassTransformer {

    // ...

}
```

然后在 `build.gradle` 配置 `annotationProcessor`。

### Java 版

```groovy
dependencies {
    // ...
    annotationProcessor "com.google.auto.service:auto-service:1.0"
    // ...
}
```

### Kotlin 版

```groovy
dependencies {
    // ...
    kapt "com.google.auto.service:auto-service:1.0"
    // ...
}
```


关于更完整的示例代码，请参见：[第一个 Transformer](../developer/first-class-transformer.md)。
