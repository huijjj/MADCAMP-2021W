package com.example.temp2

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import androidx.appcompat.app.ActionBar
import com.airbnb.lottie.LottieAnimationView

class SurpriseActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_surprise)

        var actionBar : ActionBar?
        actionBar = supportActionBar;
        actionBar?.hide()

        var lodingImage = findViewById(R.id.surprise_image) as LottieAnimationView

        lodingImage.playAnimation()

        val handler: Handler = Handler()
        handler.postDelayed({
            finish()
        }, 9000)
    }
}