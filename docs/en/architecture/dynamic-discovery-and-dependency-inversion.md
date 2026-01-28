# Dynamic Discovery and Dependency Inversion

## Dynamic Discovery

To keep each feature module highly independent and convenient for development, *Booster* adopts a dynamic discovery approach to load various feature modules. You only need to include the corresponding module in the *classpath*, as shown below:

```groovy
buildscript {

    ext.booster_version = "4.16.3"

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

## Dependency Inversion

To dynamically discover and load third-party classes at runtime, a typical solution is to use dependency injection. Currently popular dependency injection frameworks include:

1. [Spring Framework](https://spring.io/projects/spring-framework)
1. [Google Guice](https://github.com/google/guice)
1. [Dagger](https://github.com/google/dagger)

## Service Provider Interface

In addition, since *JDK 1.6*, the JDK has provided the [SPI (Service Provider Interface)](https://docs.oracle.com/javase/tutorial/sound/SPI-intro.html) mechanism to solve the problem of calling third-party libraries in the JDK. Common *SPI* usages in the JDK include:

1. *JDBC* driver loading, see: `java.sql.DriverManager`

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

1. Print service lookup, see: `javax.print.PrintServiceLookup`

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

1. Event-driven *XML* parsing, see: `javax.xml.parsers.FactoryFinder`

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

Since *SPI* is simple to use and does not require additional libraries, *Booster* chose to implement dynamic discovery and loading of feature modules through *SPI*.

From the examples above, we can see that they all use `java.util.ServiceLoader` to dynamically load *SPI* implementation classes. So how exactly does `ServiceLoader` achieve this? Let's look at the source code of `ServiceLoader`:

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

From the code above, we can see that the key to `ServiceLoader`'s dynamic loading is `ServiceLoader$LazyIterator`. It uses `ClassLoader` to find *SPI* configuration resources named `META-INF/services/${InterfaceName}` from the *classpath*, reads the class names of the interface implementations line by line, and then instantiates the interface implementation classes through reflection.

Based on this principle, as long as the *SPI* configuration exists in the *classpath*, it can be found by `ServiceLoader` at runtime. This is why using *Booster* modules only requires adding a `classpath` line to the *dependencies* in *buildscript* to automatically enable that feature.

## Google AutoService

Through `ServiceLoader$LazyIterator`, we learned that to find *SPI* implementation classes through `ServiceLoader`, you must configure the corresponding interface in `META-INF/services/`. If there are many *SPI* interfaces, configuration becomes tedious, and manual configuration is error-prone. To solve this problem, *Google* provides a tool that automatically generates *SPI* configurations based on *Annotations* — [AutoService](https://github.com/google/auto/tree/master/service). You only need to add `@AutoService(InterfaceName.class)` to the implementation class of the *SPI* interface, as shown below:

```kotlin
@AutoService(ClassTransformer::class)
class MyTransformer : ClassTransformer {

    // ...

}
```

Then configure `annotationProcessor` in `build.gradle`.

### Java Version

```groovy
dependencies {
    // ...
    annotationProcessor "com.google.auto.service:auto-service:1.0"
    // ...
}
```

### Kotlin Version

```groovy
dependencies {
    // ...
    kapt "com.google.auto.service:auto-service:1.0"
    // ...
}
```


For more complete example code, please refer to: [Your First Transformer](../developer/first-class-transformer.md).
