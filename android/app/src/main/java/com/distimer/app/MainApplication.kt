package com.distimer.app

import android.app.Application
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.content.Intent
import android.provider.Settings
import android.util.Log
import android.widget.Toast
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import com.google.android.gms.tasks.OnCompleteListener
import com.google.firebase.messaging.FirebaseMessaging
import com.microsoft.codepush.react.CodePush

const val ONESIGNAL_APP_ID = "1271ceba-9e5f-4ae0-a62c-385d750f3ef7"

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> {
          @Suppress("UnnecessaryLocalVariable")
          val packages = PackageList(this).packages

          // Add My Wrapper Package
          packages.add(ActivityTimerPackage())

          return packages
        }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED

        override fun getJSBundleFile(): String {
          return CodePush.getJSBundleFile() 
        }
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  private fun createNotificationChannel() {
    // Create the NotificationChannel, but only on API 26+ because
    // the NotificationChannel class is new and not in the support library
    val importance = NotificationManager.IMPORTANCE_HIGH // set importance
    val channel = NotificationChannel("TimerServiceChannel", "공부 타이머 알림", importance).apply {
      description = "공부 타이머"
      lockscreenVisibility= Notification.VISIBILITY_PUBLIC
    }
    // Register the channel with the system
    val notificationManager = getSystemService(NOTIFICATION_SERVICE) as NotificationManager
    notificationManager.createNotificationChannel(channel)
  }

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }
    createNotificationChannel()
    // 1. 배터리 최적화 허용 여부
    val context: Context = applicationContext
    val i = Intent(context, MainActivity::class.java)
    i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK) // 1줄 추가
    i.setAction(Settings.ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS)
    context.startActivity(i)
    FirebaseMessaging.getInstance().token.addOnCompleteListener(OnCompleteListener { task ->
      if (!task.isSuccessful) {
        Log.w("Firebase", "Fetching FCM registration token failed", task.exception)
        return@OnCompleteListener
      }

      // Get new FCM registration token
      val token = task.result

      // Log and toast
      Log.d("Firebase", token)
      Toast.makeText(baseContext, token, Toast.LENGTH_SHORT).show()
    })
  }
}
