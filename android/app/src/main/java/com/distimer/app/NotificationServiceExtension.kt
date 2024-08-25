package com.distimer.app

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.PowerManager
import android.provider.Settings
import android.util.Log
import androidx.annotation.Keep
import androidx.core.app.NotificationCompat
import androidx.core.content.ContextCompat.getSystemService
import androidx.core.content.ContextCompat.startForegroundService
import com.onesignal.notifications.INotificationReceivedEvent
import com.onesignal.notifications.INotificationServiceExtension


@Keep
class NotificationServiceExtension: INotificationServiceExtension {

    override fun onNotificationReceived(event: INotificationReceivedEvent) {
        Log.v("test", "received")
        val notification = event.notification

        // this is an example of how to modify the notification by changing the background color to blue
        notification.setExtender { builder: NotificationCompat.Builder ->
            builder.setColor(
                -0xffff01
            )
        }


        //If you need to perform an async action or stop the payload from being shown automatically,
        //use event.preventDefault(). Using event.notification.display() will show this message again.

        val serviceIntent: Intent = Intent(
            event.context,
            TimerNotificationService::class.java
        )
        val methodType = notification.additionalData?.getString("type") == "start"

        if (methodType) {
            serviceIntent.putExtra("Subject", notification.additionalData?.getString("subject"))
            serviceIntent.putExtra("StartAt", notification.additionalData?.getString("startAt"))
            serviceIntent.putExtra("Content", notification.additionalData?.getString("content"))
            serviceIntent.putExtra("Color", notification.additionalData?.getString("color"))
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                startForegroundService(event.context, serviceIntent)
            }
        } else {
            event.context.stopService(serviceIntent)
        }

    }
}