package com.example.temp2

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import androidx.appcompat.app.ActionBar
import com.airbnb.lottie.LottieAnimationView

class StartActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_start)

        var actionBar : ActionBar?
        actionBar = supportActionBar;
        actionBar?.hide()

        var lodingImage = findViewById(R.id.loading_image) as LottieAnimationView

        lodingImage.playAnimation()

        val handler: Handler = Handler()
            handler.postDelayed({
                val intent = Intent(this, MainActivity::class.java)
                startActivity(intent)
                finish()
            }, 3000)
    }
}