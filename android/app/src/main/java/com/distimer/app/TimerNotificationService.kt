package com.distimer.app

import android.app.*
import android.content.Intent
import android.graphics.Color
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
    private var startAt = System.currentTimeMillis()
    private var content = ""
    private var color = "#000000"

    private var notificationManager: NotificationManager? = null

    @RequiresApi(Build.VERSION_CODES.O)
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        super.onStartCommand(intent, flags, startId)
        notificationManager = getSystemService(NOTIFICATION_SERVICE) as NotificationManager
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
            val rawContent: String? = extras.getString("Content")
            if (rawContent != null) {
                content = rawContent
            }
            val rawColor: String? = extras.getString("Color")
            if (rawColor != null) {
                color = rawColor
            }
        }
        while (subject == "") {
            continue
        }
        startForeground(1, createNotification("\"$subject\" 과목 공부중","0초 - "))
        isRunning = true
        Thread {
            while (isRunning) {
                val now = System.currentTimeMillis()
                val date = Date(now)
                val diffMilliseconds = date.time - startAt
                val notification = createNotification("\"$subject\" 과목 공부중",formatDuration(diffMilliseconds) + " - " + content)
                notificationManager?.notify(1, notification)
                try {
                    Thread.sleep(1000)
                } catch (e: InterruptedException) {
                    e.printStackTrace()
                }
            }
        }.start()
        return START_STICKY
    }

    private fun createNotification(title: String, content: String): Notification {
        val notify = NotificationCompat.Builder(this, channelId)
            .setContentTitle(title)
            .setContentText(content)
            .setSmallIcon(R.drawable.graduation_cap)
            .setColor(Color.parseColor(color))
            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
            .setOngoing(true) // <<---
            .setPriority(NotificationCompat.PRIORITY_MAX) // <<--
            .setOnlyAlertOnce(true)
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
