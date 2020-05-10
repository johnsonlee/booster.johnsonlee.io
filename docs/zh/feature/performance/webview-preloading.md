# WebView 预加载

## WebView 的问题

很多 *Android* 开发者都碰到类似这样的 ANR ：

```
"main" prio=5 tid=1 Waiting
  | group="main" sCount=1 dsCount=0 obj=0x756e2a88 self=0x7253895a00
  | sysTid=5256 nice=-10 cgrp=default sched=0/0 handle=0x72577baa98
  | state=S schedstat=( 362198032 46014107 637 ) utm=24 stm=11 core=3 HZ=100
  | stack=0x7fc2f0d000-0x7fc2f0f000 stackSize=8MB
  | held mutexes=
  at java.lang.Object.wait!(Native method)
  - waiting on <0x0a4a9cf4> (a java.lang.Object)
  at java.lang.Thread.parkFor$(Thread.java:2127)
  - locked <0x0a4a9cf4> (a java.lang.Object)
  at sun.misc.Unsafe.park(Unsafe.java:325)
  at java.util.concurrent.locks.LockSupport.park(LockSupport.java:161)
  at java.util.concurrent.FutureTask.awaitDone(FutureTask.java:421)
  at java.util.concurrent.FutureTask.get(FutureTask.java:163)
  at android.os.AsyncTask.get(AsyncTask.java:514)
  at org.chromium.content.browser.BrowserStartupController.prepareToStartBrowserProcess(BrowserStartupController.java:57)
  at org.chromium.content.browser.BrowserStartupController.startBrowserProcessesSync(BrowserStartupController.java:16)
  at org.chromium.android_webview.AwBrowserProcess$1.run(AwBrowserProcess.java:14)
  at org.chromium.base.ThreadUtils.runOnUiThreadBlocking(ThreadUtils.java:10)
  at com.android.webview.chromium.WebViewChromiumFactoryProvider.startChromiumLocked(WebViewChromiumFactoryProvider.java:219)
  at com.android.webview.chromium.WebViewChromiumFactoryProvider.ensureChromiumStartedLocked(WebViewChromiumFactoryProvider.java:151)
  at com.android.webview.chromium.WebViewChromiumFactoryProvider.startYourEngines(WebViewChromiumFactoryProvider.java:239)
  - locked <0x064f5c1d> (a java.lang.Object)
  at com.android.webview.chromium.WebViewChromium.init(WebViewChromium.java:30)
  at android.webkit.WebView.<init>(WebView.java:636)
  at android.webkit.WebView.<init>(WebView.java:572)
  at android.webkit.WebView.<init>(WebView.java:555)
  at android.webkit.WebView.<init>(WebView.java:542)
  at java.lang.reflect.Constructor.newInstance0!(Native method)
  at java.lang.reflect.Constructor.newInstance(Constructor.java:430)
  at android.view.LayoutInflater.createView(LayoutInflater.java:645)
  at android.view.LayoutInflater.createViewFromTag(LayoutInflater.java:787)
  at android.view.LayoutInflater.createViewFromTag(LayoutInflater.java:727)
  at android.view.LayoutInflater.rInflate(LayoutInflater.java:858)
  at android.view.LayoutInflater.rInflateChildren(LayoutInflater.java:821)
  at android.view.LayoutInflater.inflate(LayoutInflater.java:518)
  - locked <0x09493e92> (a java.lang.Object[])
  at android.view.LayoutInflater.inflate(LayoutInflater.java:426)
  at com.xxx.xxx.xxx.xxx.view.fragment.WebViewFragment.onCreateView(WebViewFragment.java:99)
  at android.support.v4.app.Fragment.performCreateView(Fragment.java:2189)
  at android.support.v4.app.FragmentManagerImpl.moveToState(FragmentManager.java:1299)
  at android.support.v4.app.FragmentManagerImpl.moveFragmentToExpectedState(FragmentManager.java:1528)
  at android.support.v4.app.FragmentManagerImpl.moveToState(FragmentManager.java:1595)
  at android.support.v4.app.BackStackRecord.executeOps(BackStackRecord.java:757)
  at android.support.v4.app.FragmentManagerImpl.executeOps(FragmentManager.java:2355)
  at android.support.v4.app.FragmentManagerImpl.executeOpsTogether(FragmentManager.java:2146)
  at android.support.v4.app.FragmentManagerImpl.optimizeAndExecuteOps(FragmentManager.java:2098)
  at android.support.v4.app.FragmentManagerImpl.execPendingActions(FragmentManager.java:2008)
  at android.support.v4.app.FragmentController.execPendingActions(FragmentController.java:388)
  at android.support.v4.app.FragmentActivity.onStart(FragmentActivity.java:607)
  at android.support.v7.app.AppCompatActivity.onStart(AppCompatActivity.java:178)
  at android.app.Instrumentation.callActivityOnStart(Instrumentation.java:1248)
  at android.app.Activity.performStart(Activity.java:6699)
  at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:2629)
  at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:2727)
  at android.app.ActivityThread.-wrap12(ActivityThread.java:-1)
  at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1478)
  at android.os.Handler.dispatchMessage(Handler.java:102)
  at android.os.Looper.loop(Looper.java:154)
  at android.app.ActivityThread.main(ActivityThread.java:6121)
  at java.lang.reflect.Method.invoke!(Native method)
  at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:889)
  at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:779)
```

从堆栈来看，根本原因在于 *WebView* 在实例化的时候，需要先初始化 *Chromium* 引擎，而 *Chromium* 引擎又是一个重量级的组件，而且很多初始化的工作都需要在主线程中完成，这样就很容易造成主线程卡顿甚至 *ANR*。

## 预加载 *Chromium* 引擎

有人提出了通过 *WebView* 或者 *WebSettings* 中的静态方法来间接的初始化 *WebView*，比如：

- [WebSettings.getDefaultUserAgent(Context)](https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/webkit/WebSettings.java#1319)

    ```java
    /**
     * Returns the default User-Agent used by a WebView.
     * An instance of WebView could use a different User-Agent if a call
     * is made to {@link WebSettings#setUserAgentString(String)}.
     *
     * @param context a Context object used to access application assets
     */
    public static String getDefaultUserAgent(Context context) {
        return WebViewFactory.getProvider().getStatics().getDefaultUserAgent(context);
    }
    ```

- [WebViewFactoryProvider.Statics](https://android.googlesource.com/platform/frameworks/base/+/master/core/java/android/webkit/WebViewFactoryProvider.java#39) 中的其它方法

这些静态方法只能完成一小部分初始化的工作，对于最终的优化结果来说，并不会有明显的作用，主要的初始化工作是由 [WebViewChromiumAwInit](https://chromium.googlesource.com/chromium/src/android_webview/glue/+/refs/heads/master/java/src/com/android/webview/chromium/WebViewChromiumAwInit.java) 来完成的，整个 *Chromium* 引擎的启动流程如下：

<img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBjb250ZW50U2NyaXB0VHlwZT0iYXBwbGljYXRpb24vZWNtYXNjcmlwdCIgY29udGVudFN0eWxlVHlwZT0idGV4dC9jc3MiIGhlaWdodD0iNDY2cHgiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHN0eWxlPSJ3aWR0aDo5NzJweDtoZWlnaHQ6NDY2cHg7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA5NzIgNDY2IiB3aWR0aD0iOTcycHgiIHpvb21BbmRQYW49Im1hZ25pZnkiPjxkZWZzPjxmaWx0ZXIgaGVpZ2h0PSIzMDAlIiBpZD0iZjlzd2djMnJwdGh5MiIgd2lkdGg9IjMwMCUiIHg9Ii0xIiB5PSItMSI+PGZlR2F1c3NpYW5CbHVyIHJlc3VsdD0iYmx1ck91dCIgc3RkRGV2aWF0aW9uPSIyLjAiLz48ZmVDb2xvck1hdHJpeCBpbj0iYmx1ck91dCIgcmVzdWx0PSJibHVyT3V0MiIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIC40IDAiLz48ZmVPZmZzZXQgZHg9IjQuMCIgZHk9IjQuMCIgaW49ImJsdXJPdXQyIiByZXN1bHQ9ImJsdXJPdXQzIi8+PGZlQmxlbmQgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iYmx1ck91dDMiIG1vZGU9Im5vcm1hbCIvPjwvZmlsdGVyPjwvZGVmcz48Zz48cmVjdCBmaWxsPSIjRkZGRkZGIiBmaWx0ZXI9InVybCgjZjlzd2djMnJwdGh5MikiIGhlaWdodD0iMzk2Ljg1MTYiIHN0eWxlPSJzdHJva2U6ICNBODAwMzY7IHN0cm9rZS13aWR0aDogMS4wOyIgd2lkdGg9IjEwIiB4PSI1Ny41IiB5PSI0OC4yOTY5Ii8+PHJlY3QgZmlsbD0iI0ZGRkZGRiIgZmlsdGVyPSJ1cmwoI2Y5c3dnYzJycHRoeTIpIiBoZWlnaHQ9IjMyMS40MjE5IiBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsiIHdpZHRoPSIxMCIgeD0iMTYyLjUiIHk9IjExNC43MjY2Ii8+PHJlY3QgZmlsbD0iI0ZGRkZGRiIgZmlsdGVyPSJ1cmwoI2Y5c3dnYzJycHRoeTIpIiBoZWlnaHQ9IjIzMi45OTIyIiBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsiIHdpZHRoPSIxMCIgeD0iMjg5IiB5PSIxODkuMTU2MyIvPjxyZWN0IGZpbGw9IiNGRkZGRkYiIGZpbHRlcj0idXJsKCNmOXN3Z2MycnB0aHkyKSIgaGVpZ2h0PSIxNDQuNTYyNSIgc3R5bGU9InN0cm9rZTogI0E4MDAzNjsgc3Ryb2tlLXdpZHRoOiAxLjA7IiB3aWR0aD0iMTAiIHg9IjUwNCIgeT0iMjYzLjU4NTkiLz48cmVjdCBmaWxsPSIjRkZGRkZGIiBmaWx0ZXI9InVybCgjZjlzd2djMnJwdGh5MikiIGhlaWdodD0iNTYuMTMyOCIgc3R5bGU9InN0cm9rZTogI0E4MDAzNjsgc3Ryb2tlLXdpZHRoOiAxLjA7IiB3aWR0aD0iMTAiIHg9IjczOSIgeT0iMzM4LjAxNTYiLz48bGluZSBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsgc3Ryb2tlLWRhc2hhcnJheTogNS4wLDUuMDsiIHgxPSI2MiIgeDI9IjYyIiB5MT0iMzguMjk2OSIgeTI9IjQ1NC4xNDg0Ii8+PGxpbmUgc3R5bGU9InN0cm9rZTogI0E4MDAzNjsgc3Ryb2tlLXdpZHRoOiAxLjA7IHN0cm9rZS1kYXNoYXJyYXk6IDUuMCw1LjA7IiB4MT0iMTY3IiB4Mj0iMTY3IiB5MT0iODAuOTQ1MyIgeTI9IjQ1NC4xNDg0Ii8+PGxpbmUgc3R5bGU9InN0cm9rZTogI0E4MDAzNjsgc3Ryb2tlLXdpZHRoOiAxLjA7IHN0cm9rZS1kYXNoYXJyYXk6IDUuMCw1LjA7IiB4MT0iMjk0IiB4Mj0iMjk0IiB5MT0iMTU1LjM3NSIgeTI9IjQ1NC4xNDg0Ii8+PGxpbmUgc3R5bGU9InN0cm9rZTogI0E4MDAzNjsgc3Ryb2tlLXdpZHRoOiAxLjA7IHN0cm9rZS1kYXNoYXJyYXk6IDUuMCw1LjA7IiB4MT0iNTA5IiB4Mj0iNTA5IiB5MT0iMjI5LjgwNDciIHkyPSI0NTQuMTQ4NCIvPjxsaW5lIHN0eWxlPSJzdHJva2U6ICNBODAwMzY7IHN0cm9rZS13aWR0aDogMS4wOyBzdHJva2UtZGFzaGFycmF5OiA1LjAsNS4wOyIgeDE9Ijc0NCIgeDI9Ijc0NCIgeTE9IjMwNC4yMzQ0IiB5Mj0iNDU0LjE0ODQiLz48cmVjdCBmaWxsPSIjRkVGRUNFIiBmaWx0ZXI9InVybCgjZjlzd2djMnJwdGh5MikiIGhlaWdodD0iMzAuMjk2OSIgc3R5bGU9InN0cm9rZTogI0E4MDAzNjsgc3Ryb2tlLXdpZHRoOiAxLjU7IiB3aWR0aD0iMTA1IiB4PSI4IiB5PSIzIi8+PHRleHQgZmlsbD0iIzAwMDAwMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGxlbmd0aEFkanVzdD0ic3BhY2luZ0FuZEdseXBocyIgdGV4dExlbmd0aD0iOTEiIHg9IjE1IiB5PSIyMi45OTUxIj5MYXlvdXRJbmZsYXRvcjwvdGV4dD48cmVjdCBmaWxsPSIjRkZGRkZGIiBmaWx0ZXI9InVybCgjZjlzd2djMnJwdGh5MikiIGhlaWdodD0iMzk2Ljg1MTYiIHN0eWxlPSJzdHJva2U6ICNBODAwMzY7IHN0cm9rZS13aWR0aDogMS4wOyIgd2lkdGg9IjEwIiB4PSI1Ny41IiB5PSI0OC4yOTY5Ii8+PHJlY3QgZmlsbD0iI0ZGRkZGRiIgZmlsdGVyPSJ1cmwoI2Y5c3dnYzJycHRoeTIpIiBoZWlnaHQ9IjMyMS40MjE5IiBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsiIHdpZHRoPSIxMCIgeD0iMTYyLjUiIHk9IjExNC43MjY2Ii8+PHJlY3QgZmlsbD0iI0ZGRkZGRiIgZmlsdGVyPSJ1cmwoI2Y5c3dnYzJycHRoeTIpIiBoZWlnaHQ9IjIzMi45OTIyIiBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsiIHdpZHRoPSIxMCIgeD0iMjg5IiB5PSIxODkuMTU2MyIvPjxyZWN0IGZpbGw9IiNGRkZGRkYiIGZpbHRlcj0idXJsKCNmOXN3Z2MycnB0aHkyKSIgaGVpZ2h0PSIxNDQuNTYyNSIgc3R5bGU9InN0cm9rZTogI0E4MDAzNjsgc3Ryb2tlLXdpZHRoOiAxLjA7IiB3aWR0aD0iMTAiIHg9IjUwNCIgeT0iMjYzLjU4NTkiLz48cmVjdCBmaWxsPSIjRkZGRkZGIiBmaWx0ZXI9InVybCgjZjlzd2djMnJwdGh5MikiIGhlaWdodD0iNTYuMTMyOCIgc3R5bGU9InN0cm9rZTogI0E4MDAzNjsgc3Ryb2tlLXdpZHRoOiAxLjA7IiB3aWR0aD0iMTAiIHg9IjczOSIgeT0iMzM4LjAxNTYiLz48cG9seWdvbiBmaWxsPSIjQTgwMDM2IiBwb2ludHM9IjExNSw1MC4yOTY5LDEyNSw1NC4yOTY5LDExNSw1OC4yOTY5LDExOSw1NC4yOTY5IiBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsiLz48bGluZSBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsiIHgxPSI2Ny41IiB4Mj0iMTIxIiB5MT0iNTQuMjk2OSIgeTI9IjU0LjI5NjkiLz48cmVjdCBmaWxsPSIjRkVGRUNFIiBmaWx0ZXI9InVybCgjZjlzd2djMnJwdGh5MikiIGhlaWdodD0iMzAuMjk2OSIgc3R5bGU9InN0cm9rZTogI0E4MDAzNjsgc3Ryb2tlLXdpZHRoOiAxLjU7IiB3aWR0aD0iNzciIHg9IjEyNyIgeT0iNDguMjk2OSIvPjx0ZXh0IGZpbGw9IiMwMDAwMDAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBsZW5ndGhBZGp1c3Q9InNwYWNpbmdBbmRHbHlwaHMiIHRleHRMZW5ndGg9IjYzIiB4PSIxMzQiIHk9IjY4LjI5MiI+V2ViVmlldzwvdGV4dD48cG9seWdvbiBmaWxsPSIjQTgwMDM2IiBwb2ludHM9IjE1MC41LDExMC43MjY2LDE2MC41LDExNC43MjY2LDE1MC41LDExOC43MjY2LDE1NC41LDExNC43MjY2IiBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsiLz48bGluZSBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsiIHgxPSI2Ny41IiB4Mj0iMTU2LjUiIHkxPSIxMTQuNzI2NiIgeTI9IjExNC43MjY2Ii8+PHRleHQgZmlsbD0iIzAwMDAwMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTMiIGxlbmd0aEFkanVzdD0ic3BhY2luZ0FuZEdseXBocyIgdGV4dExlbmd0aD0iNjMiIHg9Ijc0LjUiIHk9IjEwOS42NjA2Ij4mbHQ7aW5pdCZndDsoLi4uKTwvdGV4dD48cG9seWdvbiBmaWxsPSIjQTgwMDM2IiBwb2ludHM9IjIwNiwxMjQuNzI2NiwyMTYsMTI4LjcyNjYsMjA2LDEzMi43MjY2LDIxMCwxMjguNzI2NiIgc3R5bGU9InN0cm9rZTogI0E4MDAzNjsgc3Ryb2tlLXdpZHRoOiAxLjA7Ii8+PGxpbmUgc3R5bGU9InN0cm9rZTogI0E4MDAzNjsgc3Ryb2tlLXdpZHRoOiAxLjA7IiB4MT0iMTcyLjUiIHgyPSIyMTIiIHkxPSIxMjguNzI2NiIgeTI9IjEyOC43MjY2Ii8+PHJlY3QgZmlsbD0iI0ZFRkVDRSIgZmlsdGVyPSJ1cmwoI2Y5c3dnYzJycHRoeTIpIiBoZWlnaHQ9IjMwLjI5NjkiIHN0eWxlPSJzdHJva2U6ICNBODAwMzY7IHN0cm9rZS13aWR0aDogMS41OyIgd2lkdGg9IjE0OCIgeD0iMjE4IiB5PSIxMjIuNzI2NiIvPjx0ZXh0IGZpbGw9IiMwMDAwMDAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBsZW5ndGhBZGp1c3Q9InNwYWNpbmdBbmRHbHlwaHMiIHRleHRMZW5ndGg9IjEzNCIgeD0iMjI1IiB5PSIxNDIuNzIxNyI+V2ViVmlld0Nocm9taXVtPC90ZXh0Pjxwb2x5Z29uIGZpbGw9IiNBODAwMzYiIHBvaW50cz0iMjc3LDE4NS4xNTYzLDI4NywxODkuMTU2MywyNzcsMTkzLjE1NjMsMjgxLDE4OS4xNTYzIiBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsiLz48bGluZSBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsiIHgxPSIxNzIuNSIgeDI9IjI4MyIgeTE9IjE4OS4xNTYzIiB5Mj0iMTg5LjE1NjMiLz48dGV4dCBmaWxsPSIjMDAwMDAwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMyIgbGVuZ3RoQWRqdXN0PSJzcGFjaW5nQW5kR2x5cGhzIiB0ZXh0TGVuZ3RoPSI0MSIgeD0iMTc5LjUiIHk9IjE4NC4wOTAzIj5pbml0KC4uLik8L3RleHQ+PHBvbHlnb24gZmlsbD0iI0E4MDAzNiIgcG9pbnRzPSIzNjgsMTk5LjE1NjMsMzc4LDIwMy4xNTYzLDM2OCwyMDcuMTU2MywzNzIsMjAzLjE1NjMiIHN0eWxlPSJzdHJva2U6ICNBODAwMzY7IHN0cm9rZS13aWR0aDogMS4wOyIvPjxsaW5lIHN0eWxlPSJzdHJva2U6ICNBODAwMzY7IHN0cm9rZS13aWR0aDogMS4wOyIgeDE9IjI5OSIgeDI9IjM3NCIgeTE9IjIwMy4xNTYzIiB5Mj0iMjAzLjE1NjMiLz48cmVjdCBmaWxsPSIjRkVGRUNFIiBmaWx0ZXI9InVybCgjZjlzd2djMnJwdGh5MikiIGhlaWdodD0iMzAuMjk2OSIgc3R5bGU9InN0cm9rZTogI0E4MDAzNjsgc3Ryb2tlLXdpZHRoOiAxLjU7IiB3aWR0aD0iMjU0IiB4PSIzODAiIHk9IjE5Ny4xNTYzIi8+PHRleHQgZmlsbD0iIzAwMDAwMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGxlbmd0aEFkanVzdD0ic3BhY2luZ0FuZEdseXBocyIgdGV4dExlbmd0aD0iMjQwIiB4PSIzODciIHk9IjIxNy4xNTE0Ij5XZWJWaWV3Q2hyb21pdW1GYWN0b3J5UHJvdmlkZXI8L3RleHQ+PHBvbHlnb24gZmlsbD0iI0E4MDAzNiIgcG9pbnRzPSI0OTIsMjU5LjU4NTksNTAyLDI2My41ODU5LDQ5MiwyNjcuNTg1OSw0OTYsMjYzLjU4NTkiIHN0eWxlPSJzdHJva2U6ICNBODAwMzY7IHN0cm9rZS13aWR0aDogMS4wOyIvPjxsaW5lIHN0eWxlPSJzdHJva2U6ICNBODAwMzY7IHN0cm9rZS13aWR0aDogMS4wOyIgeDE9IjI5OSIgeDI9IjQ5OCIgeTE9IjI2My41ODU5IiB5Mj0iMjYzLjU4NTkiLz48dGV4dCBmaWxsPSIjMDAwMDAwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMyIgbGVuZ3RoQWRqdXN0PSJzcGFjaW5nQW5kR2x5cGhzIiB0ZXh0TGVuZ3RoPSIxNjkiIHg9IjMwNiIgeT0iMjU4LjUyIj5zdGFydFlvdXJFbmdpbmVzKGJvb2xlYW4pPC90ZXh0Pjxwb2x5Z29uIGZpbGw9IiNBODAwMzYiIHBvaW50cz0iNjM2LDI3My41ODU5LDY0NiwyNzcuNTg1OSw2MzYsMjgxLjU4NTksNjQwLDI3Ny41ODU5IiBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsiLz48bGluZSBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsiIHgxPSI1MTQiIHgyPSI2NDIiIHkxPSIyNzcuNTg1OSIgeTI9IjI3Ny41ODU5Ii8+PHJlY3QgZmlsbD0iI0ZFRkVDRSIgZmlsdGVyPSJ1cmwoI2Y5c3dnYzJycHRoeTIpIiBoZWlnaHQ9IjMwLjI5NjkiIHN0eWxlPSJzdHJva2U6ICNBODAwMzY7IHN0cm9rZS13aWR0aDogMS41OyIgd2lkdGg9IjE4OCIgeD0iNjQ4IiB5PSIyNzEuNTg1OSIvPjx0ZXh0IGZpbGw9IiMwMDAwMDAiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBsZW5ndGhBZGp1c3Q9InNwYWNpbmdBbmRHbHlwaHMiIHRleHRMZW5ndGg9IjE3NCIgeD0iNjU1IiB5PSIyOTEuNTgxMSI+V2ViVmlld0Nocm9taXVtQXdJbml0PC90ZXh0Pjxwb2x5Z29uIGZpbGw9IiNBODAwMzYiIHBvaW50cz0iNzI3LDMzNC4wMTU2LDczNywzMzguMDE1Niw3MjcsMzQyLjAxNTYsNzMxLDMzOC4wMTU2IiBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsiLz48bGluZSBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsiIHgxPSI1MTQiIHgyPSI3MzMiIHkxPSIzMzguMDE1NiIgeTI9IjMzOC4wMTU2Ii8+PHRleHQgZmlsbD0iIzAwMDAwMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTMiIGxlbmd0aEFkanVzdD0ic3BhY2luZ0FuZEdseXBocyIgdGV4dExlbmd0aD0iMTY5IiB4PSI1MjEiIHk9IjMzMi45NDk3Ij5zdGFydFlvdXJFbmdpbmVzKGJvb2xlYW4pPC90ZXh0PjxsaW5lIHN0eWxlPSJzdHJva2U6ICNBODAwMzY7IHN0cm9rZS13aWR0aDogMS4wOyIgeDE9Ijc0OSIgeDI9Ijc5MSIgeTE9IjM2Ny4xNDg0IiB5Mj0iMzY3LjE0ODQiLz48bGluZSBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsiIHgxPSI3OTEiIHgyPSI3OTEiIHkxPSIzNjcuMTQ4NCIgeTI9IjM4MC4xNDg0Ii8+PGxpbmUgc3R5bGU9InN0cm9rZTogI0E4MDAzNjsgc3Ryb2tlLXdpZHRoOiAxLjA7IiB4MT0iNzUwIiB4Mj0iNzkxIiB5MT0iMzgwLjE0ODQiIHkyPSIzODAuMTQ4NCIvPjxwb2x5Z29uIGZpbGw9IiNBODAwMzYiIHBvaW50cz0iNzYwLDM3Ni4xNDg0LDc1MCwzODAuMTQ4NCw3NjAsMzg0LjE0ODQsNzU2LDM4MC4xNDg0IiBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsiLz48dGV4dCBmaWxsPSIjMDAwMDAwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMyIgbGVuZ3RoQWRqdXN0PSJzcGFjaW5nQW5kR2x5cGhzIiB0ZXh0TGVuZ3RoPSIyMDQiIHg9Ijc1NiIgeT0iMzYyLjA4MjUiPmVuc3VyZUNocm9taXVtU3RhcnRlZExvY2tlZDwvdGV4dD48cG9seWdvbiBmaWxsPSIjQTgwMDM2IiBwb2ludHM9IjUyNSwzOTAuMTQ4NCw1MTUsMzk0LjE0ODQsNTI1LDM5OC4xNDg0LDUyMSwzOTQuMTQ4NCIgc3R5bGU9InN0cm9rZTogI0E4MDAzNjsgc3Ryb2tlLXdpZHRoOiAxLjA7Ii8+PGxpbmUgc3R5bGU9InN0cm9rZTogI0E4MDAzNjsgc3Ryb2tlLXdpZHRoOiAxLjA7IHN0cm9rZS1kYXNoYXJyYXk6IDIuMCwyLjA7IiB4MT0iNTE5IiB4Mj0iNzQzIiB5MT0iMzk0LjE0ODQiIHkyPSIzOTQuMTQ4NCIvPjxwb2x5Z29uIGZpbGw9IiNBODAwMzYiIHBvaW50cz0iMzEwLDQwNC4xNDg0LDMwMCw0MDguMTQ4NCwzMTAsNDEyLjE0ODQsMzA2LDQwOC4xNDg0IiBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsiLz48bGluZSBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsgc3Ryb2tlLWRhc2hhcnJheTogMi4wLDIuMDsiIHgxPSIzMDQiIHgyPSI1MDgiIHkxPSI0MDguMTQ4NCIgeTI9IjQwOC4xNDg0Ii8+PHBvbHlnb24gZmlsbD0iI0E4MDAzNiIgcG9pbnRzPSIxODMuNSw0MTguMTQ4NCwxNzMuNSw0MjIuMTQ4NCwxODMuNSw0MjYuMTQ4NCwxNzkuNSw0MjIuMTQ4NCIgc3R5bGU9InN0cm9rZTogI0E4MDAzNjsgc3Ryb2tlLXdpZHRoOiAxLjA7Ii8+PGxpbmUgc3R5bGU9InN0cm9rZTogI0E4MDAzNjsgc3Ryb2tlLXdpZHRoOiAxLjA7IHN0cm9rZS1kYXNoYXJyYXk6IDIuMCwyLjA7IiB4MT0iMTc3LjUiIHgyPSIyOTMiIHkxPSI0MjIuMTQ4NCIgeTI9IjQyMi4xNDg0Ii8+PHBvbHlnb24gZmlsbD0iI0E4MDAzNiIgcG9pbnRzPSI3OC41LDQzMi4xNDg0LDY4LjUsNDM2LjE0ODQsNzguNSw0NDAuMTQ4NCw3NC41LDQzNi4xNDg0IiBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsiLz48bGluZSBzdHlsZT0ic3Ryb2tlOiAjQTgwMDM2OyBzdHJva2Utd2lkdGg6IDEuMDsgc3Ryb2tlLWRhc2hhcnJheTogMi4wLDIuMDsiIHgxPSI3Mi41IiB4Mj0iMTY2LjUiIHkxPSI0MzYuMTQ4NCIgeTI9IjQzNi4xNDg0Ii8+PCEtLU1ENT1bYzczODE5MzI0YmFiY2I5YmQxOTM2NDkzZTYzNDk3YmZdCkBzdGFydHVtbA0KaGlkZSBmb290Ym94DQphY3RpdmF0ZSBMYXlvdXRJbmZsYXRvcg0KTGF5b3V0SW5mbGF0b3IgLT4gV2ViVmlldyAqKg0KTGF5b3V0SW5mbGF0b3IgLT4gV2ViVmlldyArKyA6IDxpbml0PiguLi4pDQpXZWJWaWV3IC0+IFdlYlZpZXdDaHJvbWl1bSAqKg0KV2ViVmlldyAtPiBXZWJWaWV3Q2hyb21pdW0gKysgOiBpbml0KC4uLikNCldlYlZpZXdDaHJvbWl1bSAtPiBXZWJWaWV3Q2hyb21pdW1GYWN0b3J5UHJvdmlkZXIgKioNCldlYlZpZXdDaHJvbWl1bSAtPiBXZWJWaWV3Q2hyb21pdW1GYWN0b3J5UHJvdmlkZXIgKysgOiBzdGFydFlvdXJFbmdpbmVzKGJvb2xlYW4pDQpXZWJWaWV3Q2hyb21pdW1GYWN0b3J5UHJvdmlkZXIgLT4gV2ViVmlld0Nocm9taXVtQXdJbml0ICoqDQpXZWJWaWV3Q2hyb21pdW1GYWN0b3J5UHJvdmlkZXIgLT4gV2ViVmlld0Nocm9taXVtQXdJbml0ICsrIDogc3RhcnRZb3VyRW5naW5lcyhib29sZWFuKQ0KV2ViVmlld0Nocm9taXVtQXdJbml0IC0+IFdlYlZpZXdDaHJvbWl1bUF3SW5pdCA6IGVuc3VyZUNocm9taXVtU3RhcnRlZExvY2tlZA0KcmV0dXJuDQpyZXR1cm4NCnJldHVybg0KcmV0dXJuDQpAZW5kdW1sDQoKUGxhbnRVTUwgdmVyc2lvbiAxLjIwMjAuMDdiZXRhOChVbmtub3duIGNvbXBpbGUgdGltZSkKKEdQTCBzb3VyY2UgZGlzdHJpYnV0aW9uKQpKYXZhIFJ1bnRpbWU6IEphdmEoVE0pIFNFIFJ1bnRpbWUgRW52aXJvbm1lbnQKSlZNOiBKYXZhIEhvdFNwb3QoVE0pIDY0LUJpdCBTZXJ2ZXIgVk0KSmF2YSBWZXJzaW9uOiAxLjcuMF8yNS1iMTUKT3BlcmF0aW5nIFN5c3RlbTogTGludXgKRGVmYXVsdCBFbmNvZGluZzogVVRGLTgKTGFuZ3VhZ2U6IGVuCkNvdW50cnk6IFVTCi0tPjwvZz48L3N2Zz4=">

以下是启动 *Chromium* 引擎的关键代码：

```java
public class WebViewChromiumAwInit {

    protected void startChromiumLocked() {
        try (ScopedSysTraceEvent event =
                        ScopedSysTraceEvent.scoped("WebViewChromiumAwInit.startChromiumLocked")) {
            TraceEvent.setATraceEnabled(mFactory.getWebViewDelegate().isTraceTagEnabled());
            assert Thread.holdsLock(mLock) && ThreadUtils.runningOnUiThread();
            // The post-condition of this method is everything is ready, so notify now to cover all
            // return paths. (Other threads will not wake-up until we release |mLock|, whatever).
            mLock.notifyAll();
            if (mStarted) {
                return;
            }
            final Context context = ContextUtils.getApplicationContext();
            BuildInfo.setFirebaseAppId(AwFirebaseConfig.getFirebaseAppId());
            JNIUtils.setClassLoader(WebViewChromiumAwInit.class.getClassLoader());
            ResourceBundle.setAvailablePakLocales(
                    new String[] {}, AwLocaleConfig.getWebViewSupportedPakLocales());
            BundleUtils.setIsBundle(ProductConfig.IS_BUNDLE);
            // We are rewriting Java resources in the background.
            // NOTE: Any reference to Java resources will cause a crash.
            try (ScopedSysTraceEvent e =
                            ScopedSysTraceEvent.scoped("WebViewChromiumAwInit.LibraryLoader")) {
                LibraryLoader.getInstance().ensureInitialized();
            }
            PathService.override(PathService.DIR_MODULE, "/system/lib/");
            PathService.override(DIR_RESOURCE_PAKS_ANDROID, "/system/framework/webview/paks");
            initPlatSupportLibrary();
            doNetworkInitializations(context);
            waitUntilSetUpResources();
            // NOTE: Finished writing Java resources. From this point on, it's safe to use them.
            AwBrowserProcess.configureChildProcessLauncher();
            // finishVariationsInitLocked() must precede native initialization so the seed is
            // available when AwFeatureListCreator::SetUpFieldTrials() runs.
            finishVariationsInitLocked();
            AwBrowserProcess.start();
            AwBrowserProcess.handleMinidumpsAndSetMetricsConsent(true /* updateMetricsConsent */);
            mSharedStatics = new SharedStatics();
            if (BuildInfo.isDebugAndroid()) {
                mSharedStatics.setWebContentsDebuggingEnabledUnconditionally(true);
            }
            mFactory.getWebViewDelegate().setOnTraceEnabledChangeListener(
                    new WebViewDelegate.OnTraceEnabledChangeListener() {
                        @Override
                        public void onTraceEnabledChange(boolean enabled) {
                            TraceEvent.setATraceEnabled(enabled);
                        }
                    });
            mStarted = true;
            RecordHistogram.recordSparseHistogram("Android.WebView.TargetSdkVersion",
                    context.getApplicationInfo().targetSdkVersion);
            try (ScopedSysTraceEvent e = ScopedSysTraceEvent.scoped(
                         "WebViewChromiumAwInit.initThreadUnsafeSingletons")) {
                // Initialize thread-unsafe singletons.
                AwBrowserContext awBrowserContext = getBrowserContextOnUiThread();
                mGeolocationPermissions = new GeolocationPermissionsAdapter(
                        mFactory, awBrowserContext.getGeolocationPermissions());
                mWebStorage =
                        new WebStorageAdapter(mFactory, mBrowserContext.getQuotaManagerBridge());
                mAwTracingController = getTracingController();
                mServiceWorkerController = awBrowserContext.getServiceWorkerController();
                mAwProxyController = new AwProxyController();
            }
            mFactory.getRunQueue().drainQueue();
            maybeLogActiveTrials(context);
        }
    }

}
```

为了避免线程上下文切换导致的副作用，*Booster* 采用了完全在主线程中初始化的方案：

```java
public class ShadowWebView {

    public static void preloadWebView(final Application app) {
        try {
            app.getMainLooper().getQueue().addIdleHandler(new MessageQueue.IdleHandler() {
                @Override
                public boolean queueIdle() {
                    startChromiumEngine();
                    return false;
                }
            });
        } catch (final Throwable t) {
            Log.e(TAG, "Oops!", t);
        }
    }

    private static void startChromiumEngine() {
        try {
            final long t0 = SystemClock.uptimeMillis();
            final Object provider = invokeStaticMethod(Class.forName("android.webkit.WebViewFactory"), "getProvider");
            invokeMethod(provider, "startYourEngines", new Class[]{boolean.class}, new Object[]{true});
            Log.i(TAG, "Start chromium engine complete: " + (SystemClock.uptimeMillis() - t0) + " ms");
        } catch (final Throwable t) {
            Log.e(TAG, "Start chromium engine error", t);
        }
    }
}
```

`ShadowWebView` 通过 [WebViewTransformer](https://github.com/didi/booster/blob/master/booster-transform-webview/src/main/kotlin/com/didiglobal/booster/transform/webview/WebViewTransformer.kt) 在 *Application* `onCreate()` 回调中注入 `ShadowWebView.preloadWebView()`，当主线程 `IDLE` 时，启动 *Chromium* 引擎。

该方案的优点是无侵入、接入成本低，缺点是由于这种方式反射了非公开 API，可能存在兼容性问题。

