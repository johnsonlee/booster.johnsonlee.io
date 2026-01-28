# Toast Crash on Android 7.1

Many *Android* developers have encountered crashes like this:

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

## The Root Cause

Through analysis on the *APM* platform, it was found that this issue only occurs on *Android 7.1 (API Level 25)*. Therefore, it's determined to be a system bug in *Android 7.1*. By examining the source code, we can see:

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
            mWM.addView(mView, mParams); // The crash occurs here
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

## How To Solve It?

In the *Android O (API Level 26)* source code, this issue has been fixed. The fix is a simple `try-catch`:

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
            } catch (WindowManager.BadTokenException e) { // Ignore the exception
                /* ignore */
            }
        }
    }

}
```

Therefore, *Booster* also simply `catch`es the exception. However, instead of catching `mWM.addView(mView, mParams)`, it catches the `mHandler` of the internal class `Toast$TN` by setting a `Handler.Callback`:

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

In [booster-transform-toast](https://github.com/didi/booster/blob/master/booster-transform-toast), the `show()` method calls of the `Toast` class and its subclasses are replaced with `ShadowToast.show(Toast)`.

## Getting Started

To fix the *Android 7.1* `Toast` bug, simply include [booster-transform-toast](https://github.com/didi/booster/blob/master/booster-transform-toast), as shown below:


```groovy
buildscript {
    ext {
        kotlin_version = "1.5.31"
        booster_version = "4.16.3"
    }
    repositories {
        mavenCentral()
        google()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.5.0'
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
        classpath "com.didiglobal.booster:booster-gradle-plugin:$booster_version"

        /* Include this module */
        classpath "com.didiglobal.booster:booster-transform-toast:$booster_version"
    }
}
```
