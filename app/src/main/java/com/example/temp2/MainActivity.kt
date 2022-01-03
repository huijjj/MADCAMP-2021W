package com.example.temp2

import android.content.Intent
import android.os.Bundle
import android.util.Log
import com.google.android.material.bottomnavigation.BottomNavigationView
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import com.example.temp2.databinding.ActivityMainBinding
import java.io.BufferedWriter
import java.io.FileWriter

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)



        val navView: BottomNavigationView = binding.navView

        val navController = findNavController(R.id.nav_host_fragment_activity_main)
        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        val appBarConfiguration = AppBarConfiguration(
            setOf(
                R.id.navigation_home, R.id.navigation_dashboard, R.id.navigation_notifications
            )
        )
        setupActionBarWithNavController(navController, appBarConfiguration)
        navView.setupWithNavController(navController)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if(resultCode == RESULT_OK) {
            // 파일 쓰기
            val userFile = this.getFileStreamPath("user.txt")
            val fileWriter = FileWriter(userFile, false)
            val bufferedWriter = BufferedWriter(fileWriter)
            bufferedWriter.append(data!!.getStringExtra("user_name").toString())
            bufferedWriter.newLine()
            bufferedWriter.append(data!!.getStringExtra("user_number").toString())
            bufferedWriter.newLine()
            bufferedWriter.close()
            // contact fragment 다시 어떻게 하기
        }
    }
}