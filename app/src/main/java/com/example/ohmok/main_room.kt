package com.example.ohmok

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.widget.Button
import com.google.android.material.snackbar.Snackbar
import com.google.android.material.navigation.NavigationView
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.navigateUp
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import androidx.drawerlayout.widget.DrawerLayout
import androidx.appcompat.app.AppCompatActivity
import com.example.ohmok.databinding.ActivityMainRoomBinding
import com.example.ohmok.SocketApplication
import com.google.android.material.textfield.TextInputEditText
import io.socket.client.Socket
import io.socket.emitter.Emitter
import java.util.zip.Inflater

class main_room : AppCompatActivity() {

    private lateinit var appBarConfiguration: AppBarConfiguration
    private lateinit var binding: ActivityMainRoomBinding

    //lateinit var mSocket: Socket// oncreate될 때, 소켓을 만들어서 받아온다.
    var room_name = ""


    var roomInfo = listOf<room_info>(room_info("a1",setOf("b","c")),room_info("a2",setOf("a")),room_info("a3",setOf("d")))

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainRoomBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.appBarMainRoom.toolbar)

        //방 정보 들어오는 과정 -> 새로 고침 버튼으로 업데이트 하던지
        //Log.v("hi1","hihi")
        //mSocket = SocketApplication.get()
        //mSocket.connect() // close 되면 새 소켓 열기
        //Log.v("s0c", mSocket.isActive.toString())
        //Log.v("hi3","hihi")


        val drawerLayout: DrawerLayout = binding.drawerLayout
        val navView: NavigationView = binding.navView
        val navController = findNavController(R.id.nav_host_fragment_content_main_room)
        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        appBarConfiguration = AppBarConfiguration(
            setOf(
                R.id.nav_home, R.id.nav_gallery, R.id.nav_slideshow
            ), drawerLayout
        )
        setupActionBarWithNavController(navController, appBarConfiguration)
        navView.setupWithNavController(navController)



        //소켓에서 입장 가능한 방 목록 들여서 리스트 뷰로 넣어두기 이때, 어뎁터에서 소캣 이벤트




        //mSocket.on("participant count", open_room)
        


        //new room: 새로운 방 파서 들어가 있기

        findViewById<Button>(R.id.new_room).setOnClickListener{view ->
            //소켓에 새로운 방 집어넣기
            room_name = findViewById<TextInputEditText>(R.id.room_name).text.toString()
            val room_intent = Intent(this, waiting_room::class.java)
            room_intent.putExtra("room_name",room_name)
            var par_num = "";
            //par_num = args[0].toString()
            //room_intent.putExtra("par_num",par_num)
            //mSocket.close()
            startActivity(room_intent)
            //소켓 크리에이트 전송
            //mSocket.emit("join",room_name)

        }




    }
    var open_room = Emitter.Listener { args ->
        val room_intent = Intent(this, waiting_room::class.java)
        Log.v("open room",args[0].toString())
        room_intent.putExtra("room_name",room_name)
        var par_num = "";
        par_num = args[0].toString()
        room_intent.putExtra("par_num",par_num)
        //mSocket.close()
        startActivity(room_intent)
     }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate the menu; this adds items to the action bar if it is present.
        menuInflater.inflate(R.menu.main_room, menu)
        return true
    }

    override fun onSupportNavigateUp(): Boolean {
        val navController = findNavController(R.id.nav_host_fragment_content_main_room)
        return navController.navigateUp(appBarConfiguration) || super.onSupportNavigateUp()
    }
}


