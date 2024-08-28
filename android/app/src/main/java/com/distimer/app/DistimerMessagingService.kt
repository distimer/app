package com.distimer.app

import android.content.Context
import android.content.Intent
import android.os.Build
import android.util.Log
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage


class DistimerMessagingService : FirebaseMessagingService() {
    private val tag = "FirebaseService"

    override fun onNewToken(token: String) {
        Log.d(tag, "new Token: $token")

        // 토큰 값을 따로 저장해둔다.
        val pref = this.getSharedPreferences("token", Context.MODE_PRIVATE)
        val editor = pref.edit()
        editor.putString("token", token).apply()
        editor.commit()

        Log.d(tag, "saved token")
    }

    override fun onMessageReceived(message: RemoteMessage) {
        Log.d(tag, "From: " + message.from)
        val serviceIntent: Intent = Intent(
            this,
            TimerNotificationService::class.java
        )
        Log.d(tag, "Color: "+ message.data["color"])
        if (message.data["taskType"] == "start" || message.data["taskType"] == "update") {
            serviceIntent.putExtra("Subject", message.data["subject"])
            serviceIntent.putExtra("StartAt", message.data["start_at"])
            serviceIntent.putExtra("Content", message.data["content"])
            serviceIntent.putExtra("Color", message.data["color"])
            this.startForegroundService(serviceIntent)
        } else {
            this.stopService(serviceIntent)
        }
    }
}
