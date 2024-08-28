package com.distimer.app

import android.content.Context
import android.content.Intent
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule


class ActivityTimer internal constructor(private var reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ActivityTimer"
    }

    private fun sendEvent(eventName: String, params: WritableMap?) {
        reactContext.getJSModule(
            DeviceEventManagerModule.RCTDeviceEventEmitter::class.java
        ).emit(eventName, params)
    }
    private fun onGetStartActivityToken(token: String) {
        var paramsPayloads = Arguments.createMap()
        paramsPayloads.putString("token", token)
        this.sendEvent("onGetStartActivityToken", paramsPayloads)
    }


    @ReactMethod
    fun requestGetStartActivityToken() {
        val pref = this.reactContext.getSharedPreferences("token", Context.MODE_PRIVATE)
        val token: String = pref.getString("token", "") ?: ""
        this.onGetStartActivityToken(token)
    }
    
    @ReactMethod
    fun startTimer() {
        // TODO: Create timer start handler
    }
    @ReactMethod
    fun stopTimer() {
        val serviceIntent: Intent = Intent(
            reactContext,
            TimerNotificationService::class.java
        )
        reactContext.stopService(serviceIntent)
    }

}
