package com.distimer.app

import android.app.*
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.os.IBinder
import androidx.annotation.RequiresApi
import androidx.core.app.NotificationCompat
import java.time.OffsetDateTime
import java.time.format.DateTimeFormatter
import java.util.Date

class TimerNotificationService : Service() {

    private var isRunning = false
    private val channelId = "StopwatchServiceChannel"
    private var subject = ""
    private var startAt= System.currentTimeMillis()

    private var notificationManager: NotificationManager? = null

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
        startForeground(1, createNotification(subject,"0초 공부중"))
        isRunning = true
        Thread {
            while (isRunning) {
                val now = System.currentTimeMillis()
                val date = Date(now)
                val diffMilliseconds = date.time - startAt
                val notification = createNotification(subject,formatDuration(diffMilliseconds) + " 공부중")
                notificationManager?.notify(1, notification)
                try {
                    Thread.sleep(1000)
                } catch (e: InterruptedException) {
                    e.printStackTrace()
                }
            }
        }.start()
    }
    @RequiresApi(Build.VERSION_CODES.O)
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        super.onStartCommand(intent, flags, startId)
        val extras: Bundle? = intent?.extras
        if (extras != null) {
            val rawSubject: String? = extras.getString("Subject")
            if (rawSubject != null) {
                subject = rawSubject
            }
            val rawStartAt: String? = extras.getString("StartAt")
            if (rawStartAt != null) {
                startAt = OffsetDateTime.parse(rawStartAt, DateTimeFormatter.ISO_OFFSET_DATE_TIME).toInstant().toEpochMilli()
            }
        }
        return START_STICKY
    }


    private fun createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val importance = NotificationManager.IMPORTANCE_HIGH // set importance
            val channel = NotificationChannel(channelId, "공부 타이머 알림", importance).apply {
                description = "공부 타이머"
                lockscreenVisibility=Notification.VISIBILITY_PUBLIC
            }
            // Register the channel with the system
            notificationManager = getSystemService(NOTIFICATION_SERVICE) as NotificationManager
            notificationManager?.createNotificationChannel(channel)
        }
    }

    private fun createNotification(title: String, content: String): Notification {
        val notify = NotificationCompat.Builder(this, channelId)
            .setContentTitle(title)
            .setContentText(content)
            .setSmallIcon(R.drawable.bootsplash_logo) // TODO: Fix this Icon, it's temporal on
            .setOngoing(true)
            .build()
        return notify
    }

    override fun onDestroy() {
        super.onDestroy()
        isRunning = false
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }

    private fun formatDuration(diffMilliseconds: Long): String {
        val totalSeconds = diffMilliseconds / 1000
        val seconds = totalSeconds % 60
        val minutes = (totalSeconds / 60) % 60
        val hours = (totalSeconds / 3600)

        return when {
            hours > 0 -> "${hours}시간 ${minutes}분 ${seconds}초"
            minutes > 0 -> "${minutes}분 ${seconds}초"
            else -> "${seconds}초"
        }
    }
}
