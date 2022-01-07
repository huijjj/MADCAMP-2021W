package com.example.ohmok

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.TextView
import io.socket.emitter.Emitter
import java.net.Socket

class waiting_room : AppCompatActivity() {
    lateinit var mSocket: io.socket.client.Socket
    var room_name = ""
    var ready_num = 0


    override fun onCreate(savedInstanceState: Bundle?) {
        Log.v("2nd","create")
        super.onCreate(savedInstanceState)
        val ma = main_room()
        //mSocket= ma.mSocket
        mSocket = SocketApplication.get()
        mSocket.connect() // close 되면 새 소켓 열기


        //mSocket.on("opponent join", Emitter.Listener { (args)->setReady() })
        //mSocket.on("ready", Emitter.Listener { (args) ->getStart()})
        mSocket.on("start",Start_game)//Emitter.Listener { (args) -> Start_game(args[0].toString)})


        setContentView(R.layout.activity_waiting_room)
        room_name = intent.getStringExtra("room_name").toString()

        mSocket.emit("join",room_name) //

        findViewById<TextView>(R.id.name).text = room_name
        //소켓에서 방 실행 전 정보를 모두 들고 있어야 한다.
        //var par_num = intent.getStringExtra("par_num")!!.toInt()
        //if (par_num==2) {
            //setReady()
        //}
        //var mSocket = SocketApplication.get()
    }
    fun setReady(){
        var ready = findViewById<Button>(R.id.ready)
        ready.setOnClickListener{view ->
            mSocket.emit("ready",room_name)
        }

    }
    fun getStart(){
        ready_num++
        if (ready_num==2){
            mSocket.emit("start")
        }
    }
    var Start_game = Emitter.Listener{ (args)->
        val room_intent = Intent(this, MainActivity::class.java)
        var color = ""
        color = args.toString()
        Log.v("start",color)
        room_intent.putExtra("color",color)
        room_intent.putExtra("room_name",room_name)
        mSocket.close()
        startActivity(room_intent)
        //finish();
    }

}