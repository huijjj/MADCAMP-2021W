package com.example.ohmok

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import io.socket.emitter.Emitter
import kotlin.concurrent.timer
import android.util.Half.toFloat
import android.widget.Button
import android.widget.FrameLayout
import android.widget.TextView
import androidx.constraintlayout.widget.ConstraintLayout
import java.lang.reflect.Constructor
import java.util.*


class MainActivity : AppCompatActivity() {
    var turn = true
    lateinit var ball_Board:onballs
    var color = "black"
    var room_name = ""
    var my_name =""
    var op_name = ""
    val mSocket = SocketApplication.get()
    var kid = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val board = findViewById<Go_board>(R.id.Go_board)
        room_name = intent.getStringExtra("room_name").toString();
        color = intent.getStringExtra("color").toString();
        my_name = intent.getStringExtra("my_name").toString()
        op_name = intent.getStringExtra("op_name").toString()
        kid = intent.getStringExtra("kid").toString()

        Log.d("name test", my_name);
        Log.d("name test", op_name);

        turn = color =="black"
        Log.v("h1",turn.toString())
        setContentView(R.layout.activity_main)
        ball_Board = findViewById<onballs>(R.id.balls)
        ball_Board.setTurn(turn, room_name)
        mSocket.connect()
        mSocket.emit("rejoin", room_name)

        ball_Board.setSocket(mSocket)
        mSocket.on("set go", send_balls)
        mSocket.on("game result",open_popup)


        ///mark name and color ==>{Next}



        findViewById<Button>(R.id.main).setOnClickListener{view ->
            mSocket.close()
            finish()
        }

    }
    var send_balls = Emitter.Listener { args->
        //받아온 것을 ball로 바꿔서 만들어두고 add_ball을 하자
        var x = 0
        var y = 0
        x = args[1].toString().toInt()
        y = args[2].toString().toInt()
        var setball = ball(x,y)
        //Log.v("send hihi","jojo")
        ball_Board.add_ball(setball,args[0].toString()=="black")

    }

    var open_popup = Emitter.Listener { args ->
        var winner = args[0].toString()
        ball_Board.turn = false
        Log.v("winner",winner)
        var win_text = "WIN"
        if(winner!=color){
            win_text = "LOSE"
            mSocket.emit("lose", kid)
        }
        else {
            mSocket.emit("win", kid)
        }
        Thread(object : Runnable{
            override fun run() {
                runOnUiThread(Runnable {
                    kotlin.run {
                        findViewById<ConstraintLayout>(R.id.win_pop).visibility = View.VISIBLE
                        findViewById<TextView>(R.id.win_or_lose).text = win_text
                    }
                })
            }
        }).start()

    }

    // 게임 도중 나가는 경우
    override fun onBackPressed() {
        var winner = ""
        if (color == "black") {
            winner = "white"
        } else {
            winner = "black"
        }
        mSocket.emit("game end", room_name, winner)
    }
}