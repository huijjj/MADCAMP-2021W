package com.example.ohmok

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.os.Handler
import android.util.Log
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.core.os.HandlerCompat.postDelayed
import io.socket.emitter.Emitter
import java.net.Socket

class waiting_room : AppCompatActivity() {
    lateinit var mSocket: io.socket.client.Socket
    var room_name = ""
    var ready_num = 0
    var user_name = ""
    var email = ""


    override fun onCreate(savedInstanceState: Bundle?) {
        Log.v("2nd","create")
        super.onCreate(savedInstanceState)
        val ma = Main_room()
        //mSocket= ma.mSocket
        mSocket = SocketApplication.get()
        mSocket.connect() // close 되면 새 소켓 열기


        //mSocket.on("opponent join", Emitter.Listener { (args)->setReady() })
        //mSocket.on("ready", Emitter.Listener { (args) ->getStart()})
        mSocket.on("start",Start_game)//Emitter.Listener { (args) -> Start_game(args[0].toString)})
        mSocket.on("invalid room name", Go_back)

        setContentView(R.layout.activity_waiting_room)
        room_name = intent.getStringExtra("room_name").toString()
        user_name = intent.getStringExtra("user_name").toString()
//        email = intent.getStringExtra("email").toString()

        mSocket.emit("join",room_name, user_name, "") // 이메일 고쳐서 마지막에 이메일 넣어야함 

        findViewById<TextView>(R.id.name).text = room_name
        //소켓에서 방 실행 전 정보를 모두 들고 있어야 한다.
        //var par_num = intent.getStringExtra("par_num")!!.toInt()
        //if (par_num==2) {
            //setReady()
        //}
        //var mSocket = SocketApplication.get()
    }

    fun getStart(){
        ready_num++
        if (ready_num==2){
            mSocket.emit("start")
        }
    }
    var Start_game = Emitter.Listener{ args->
        val room_intent = Intent(this, MainActivity::class.java)
        var color = ""
        color = args[0].toString()
        Log.v("start",color)
        room_intent.putExtra("color",color)
        room_intent.putExtra("room_name",room_name)
        room_intent.putExtra("my_name",user_name)
        room_intent.putExtra("op_name",args[1].toString())
        mSocket.close()
        startActivity(room_intent)
        this.finish()
        //finish();
    }

    var Go_back = Emitter.Listener{ (_) ->

        // 이거 방 유효하지 않다고 하는 거 추가 해야함
//        Toast.makeText(this, "이 방은 현재 참여가 불가능합니다.", Toast.LENGTH_SHORT).show();

        finish();
    }

    override fun onBackPressed() {
        // 방을 떠난다고 서버에 전송
        mSocket.emit("leave", room_name)
        mSocket.close()
        super.onBackPressed()
    }
}