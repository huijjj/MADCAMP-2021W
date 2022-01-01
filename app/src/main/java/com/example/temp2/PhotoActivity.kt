package com.example.temp2

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.ActionBar
import com.bumptech.glide.Glide

class PhotoActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_photo)
        var actionBar : ActionBar?
        actionBar = supportActionBar;
        actionBar?.hide()

        val srcId = intent.getIntExtra("photo_id", 123)
        val date = intent.getStringExtra("photo_date")

        val photoImage: ImageView = findViewById(R.id.iv_photoDetail)
        val photoDate: TextView = findViewById(R.id.tv_date)

        Glide.with(this).load(srcId).into(photoImage)
        photoDate.text = date
    }
}