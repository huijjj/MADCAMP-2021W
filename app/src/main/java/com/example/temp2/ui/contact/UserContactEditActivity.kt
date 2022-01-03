package com.example.temp2.ui.contact

import android.media.Image
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.EditText
import android.widget.ImageButton
import com.example.temp2.R

class UserContactEditActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_user_contact_edit)

        val btn_editComplete = findViewById<ImageButton>(R.id.btn_editComplete)
        val userName = findViewById<EditText>(R.id.tv_editName)
        val userNumber = findViewById<EditText>(R.id.tv_editNumber)

        userName.setText(intent.getStringExtra("user_name"))
        userNumber.setText(intent.getStringExtra("user_number"))

        btn_editComplete.setOnClickListener(View.OnClickListener() {
            //file에 정보 write
            finish()
        })
    }
}