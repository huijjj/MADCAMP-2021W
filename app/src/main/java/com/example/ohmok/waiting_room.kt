package com.example.ohmok

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView

class waiting_room : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_waiting_room)
        findViewById<TextView>(R.id.name).text = intent.getStringExtra("room_name")
        //소켓에서 방 실행 전 정보를 모두 들고 있어야 한다.
    }
}