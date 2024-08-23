package com.distimer.app

import android.content.Intent
import android.os.Build
import android.util.Log
import androidx.core.content.ContextCompat.startForegroundService
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod


//class StopwatchServiceModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
//
//    override fun getName(): String {
//        return "StopwatchServiceModule"
//    }
//
//    @ReactMethod
//    fun startService(intent: Intent) {
//        Log.v("asdf","asdf");
//        val it: Intent = Intent(getReactContext(this), com.distimer.app.StopwatchService::class.java)
//
//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
//            Log.v("asdf","asdf");
//           startForegroundService(reactApplicationContext, it)
//        }
//    }
//}

class TimerNotificationServiceModule internal constructor(private var reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "TimerNotificationServiceModule"
    }

    @ReactMethod
    fun startService(subject: String, startAt: String) {
        val serviceIntent: Intent = Intent(
            reactApplicationContext,
            TimerNotificationService::class.java
        )
        serviceIntent.putExtra("Subject", subject)
        serviceIntent.putExtra("StartAt", startAt)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
           startForegroundService(reactApplicationContext, serviceIntent)
        }
    }

    @ReactMethod
    fun stopService() {
        val serviceIntent: Intent = Intent(
            reactApplicationContext,
            TimerNotificationService::class.java
        )
        reactApplicationContext.stopService(serviceIntent)
    }

    companion object {
    }
}
