# Android 7.1 Toast 崩溃

相信很多 *Android* 开发者都见过像这样的崩溃：

```
android.view.WindowManager$BadTokenException: Unable to add window -- token android.os.BinderProxy@e2815e is not valid; is your activity running?
    at android.view.ViewRootImpl.setView(ViewRootImpl.java:679)
    at android.view.WindowManagerGlobal.addView(WindowManagerGlobal.java:342)
    at android.view.WindowManagerImpl.addView(WindowManagerImpl.java:93)
    at android.widget.Toast$TN.handleShow(Toast.java:459)
    at android.widget.Toast$TN$2.handleMessage(Toast.java:342)
    at android.os.Handler.dispatchMessage(Handler.java:102)
    at android.os.Looper.loop(Looper.java:154)
    at android.app.ActivityThread.main(ActivityThread.java:6119)
    at java.lang.reflect.Method.invoke(Native Method) 
```

## 根本原因

通过 *APM* 平台分析发现，这个问题仅发生在 *Android 7.1 (API Level 25)* 版本，所以断定，这是 *Android 7.1* 的系统 bug，通过查看源码，我们可以看到：

```java
public class Toast {

    final TN mTN;

    public void handleShow(IBinder windowToken) {
        if (localLOGV) Log.v(TAG, "HANDLE SHOW: " + this + " mView=" + mView
                + " mNextView=" + mNextView);
        if (mView != mNextView) {
            // remove the old view if necessary
            handleHide();
            mView = mNextView;
            Context context = mView.getContext().getApplicationContext();
            String packageName = mView.getContext().getOpPackageName();
            if (context == null) {
                context = mView.getContext();
            }
            mWM = (WindowManager)context.getSystemService(Context.WINDOW_SERVICE);
            // We can resolve the Gravity here by using the Locale for getting
            // the layout direction
            final Configuration config = mView.getContext().getResources().getConfiguration();
            final int gravity = Gravity.getAbsoluteGravity(mGravity, config.getLayoutDirection());
            mParams.gravity = gravity;
            if ((gravity & Gravity.HORIZONTAL_GRAVITY_MASK) == Gravity.FILL_HORIZONTAL) {
                mParams.horizontalWeight = 1.0f;
            }
            if ((gravity & Gravity.VERTICAL_GRAVITY_MASK) == Gravity.FILL_VERTICAL) {
                mParams.verticalWeight = 1.0f;
            }
            mParams.x = mX;
            mParams.y = mY;
            mParams.verticalMargin = mVerticalMargin;
            mParams.horizontalMargin = mHorizontalMargin;
            mParams.packageName = packageName;
            mParams.hideTimeoutMilliseconds = mDuration ==
                Toast.LENGTH_LONG ? LONG_DURATION_TIMEOUT : SHORT_DURATION_TIMEOUT;
            mParams.token = windowToken;
            if (mView.getParent() != null) {
                if (localLOGV) Log.v(TAG, "REMOVE! " + mView + " in " + this);
                mWM.removeView(mView);
            }
            if (localLOGV) Log.v(TAG, "ADD! " + mView + " in " + this);
            mWM.addView(mView, mParams); // 👈👈👈👈 崩溃发生在这里
            trySendAccessibilityEvent();
        }
    }

    private static class TN extends ITransientNotification.Stub {

        final Handler mHandler = new Handler() {
            @Override
            public void handleMessage(Message msg) {
                switch (msg.what) {
                    case SHOW: {
                        IBinder token = (IBinder) msg.obj;
                        handleShow(token);
                        break;
                    }
                    case HIDE: {
                        handleHide();
                        // Don't do this in handleHide() because it is also invoked by handleShow()
                        mNextView = null;
                        break;
                    }
                    case CANCEL: {
                        handleHide();
                        // Don't do this in handleHide() because it is also invoked by handleShow()
                        mNextView = null;
                        try {
                            getService().cancelToast(mPackageName, TN.this);
                        } catch (RemoteException e) {
                        }
                        break;
                    }
                }
            }
        };

    }

}
```

## 解决思路

在 *Android O (API Level 26)* 源码中，这个问题已经被修复了，修复方法就是简单粗暴的 `try-catch`：

```java
public class Toast {

    final TN mTN;

    public void handleShow(IBinder windowToken) {
        if (localLOGV) Log.v(TAG, "HANDLE SHOW: " + this + " mView=" + mView
                + " mNextView=" + mNextView);
        // If a cancel/hide is pending - no need to show - at this point
        // the window token is already invalid and no need to do any work.
        if (mHandler.hasMessages(CANCEL) || mHandler.hasMessages(HIDE)) {
            return;
        }
        if (mView != mNextView) {
            // remove the old view if necessary
            handleHide();
            mView = mNextView;
            Context context = mView.getContext().getApplicationContext();
            String packageName = mView.getContext().getOpPackageName();
            if (context == null) {
                context = mView.getContext();
            }
            mWM = (WindowManager)context.getSystemService(Context.WINDOW_SERVICE);
            // We can resolve the Gravity here by using the Locale for getting
            // the layout direction
            final Configuration config = mView.getContext().getResources().getConfiguration();
            final int gravity = Gravity.getAbsoluteGravity(mGravity, config.getLayoutDirection());
            mParams.gravity = gravity;
            if ((gravity & Gravity.HORIZONTAL_GRAVITY_MASK) == Gravity.FILL_HORIZONTAL) {
                mParams.horizontalWeight = 1.0f;
            }
            if ((gravity & Gravity.VERTICAL_GRAVITY_MASK) == Gravity.FILL_VERTICAL) {
                mParams.verticalWeight = 1.0f;
            }
            mParams.x = mX;
            mParams.y = mY;
            mParams.verticalMargin = mVerticalMargin;
            mParams.horizontalMargin = mHorizontalMargin;
            mParams.packageName = packageName;
            mParams.hideTimeoutMilliseconds = mDuration ==
                Toast.LENGTH_LONG ? LONG_DURATION_TIMEOUT : SHORT_DURATION_TIMEOUT;
            mParams.token = windowToken;
            if (mView.getParent() != null) {
                if (localLOGV) Log.v(TAG, "REMOVE! " + mView + " in " + this);
                mWM.removeView(mView);
            }
            if (localLOGV) Log.v(TAG, "ADD! " + mView + " in " + this);
            // Since the notification manager service cancels the token right
            // after it notifies us to cancel the toast there is an inherent
            // race and we may attempt to add a window after the token has been
            // invalidated. Let us hedge against that.
            try {
                mWM.addView(mView, mParams);
                trySendAccessibilityEvent();
            } catch (WindowManager.BadTokenException e) { // 👈👈👈👈 忽略掉异常
                /* ignore */
            }
        }
    }

}
```

所以，*Booster* 也简单粗暴的将异常 `catch` 住，只不过，`catch` 的不是 `mWM.addView(mView, mParams)`，而是 `Toast$TN` 这个内部类的 `mHandler`，给它设置一个 `Handler.Callback`：

```java
public class ShadowToast {

    /**
     * Fix {@code WindowManager$BadTokenException} for Android N
     *
     * @param toast
     *         The original toast
     */
    public static void show(final Toast toast) {
        if (Build.VERSION.SDK_INT == 25) {
            workaround(toast).show();
        } else {
            toast.show();
        }
    }

    private static Toast workaround(final Toast toast) {
        final Object tn = getFieldValue(toast, "mTN");
        if (null == tn) {
            Log.w(TAG, "Field mTN of " + toast + " is null");
            return toast;
        }

        final Object handler = getFieldValue(tn, "mHandler");
        if (handler instanceof Handler) {
            if (setFieldValue(handler, "mCallback", new CaughtCallback((Handler) handler))) {
                return toast;
            }
        }

        final Object show = getFieldValue(tn, "mShow");
        if (show instanceof Runnable) {
            if (setFieldValue(tn, "mShow", new CaughtRunnable((Runnable) show))) {
                return toast;
            }
        }

        Log.w(TAG, "Neither field mHandler nor mShow of " + tn + " is accessible");
        return toast;
    }

}
```

在 [booster-transform-toast](https://github.com/didi/booster/blob/master/booster-transform-toast) 中，将 `Toast` 类及其子类的 `show()` 方法调用替换成 `ShadowToast.show(Toast)`。

## 如何使用

修复 `Toast` 在 *Android 7.1* 的 bug 只需要引入 [booster-transform-toast](https://github.com/didi/booster/blob/master/booster-transform-toast) 即可，如下所示：


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

        /* 👇👇👇👇 引用这个模块 👇👇👇👇 */
        classpath "com.didiglobal.booster:booster-transform-toast:$booster_version"
    }
}
```
