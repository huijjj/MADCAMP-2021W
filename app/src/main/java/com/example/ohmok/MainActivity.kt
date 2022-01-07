package com.example.ohmok

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import kotlin.concurrent.timer


class MainActivity : AppCompatActivity() {
    var turn = true

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val board = findViewById<Go_board>(R.id.Go_board)
        var color = intent.getStringExtra("color");
        turn = color =="black"
        setContentView(R.layout.activity_main)





    }
}