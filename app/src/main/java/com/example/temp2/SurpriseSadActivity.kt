package com.example.temp2

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.widget.ImageView
import androidx.appcompat.app.ActionBar
import com.bumptech.glide.Glide

class SurpriseSadActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_surprise_sad)

        var actionBar : ActionBar?
        actionBar = supportActionBar;
        actionBar?.hide()

        Glide.with(this).load(R.drawable.santa_sad).into(findViewById<ImageView>(R.id.iv_santa_sad))

        val handler: Handler = Handler()
        handler.postDelayed({
            finish()
        }, 7000)
    }
}