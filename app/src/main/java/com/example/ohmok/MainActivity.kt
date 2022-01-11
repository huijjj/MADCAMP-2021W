package com.example.ohmok

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.view.inputmethod.InputMethodManager
import io.socket.emitter.Emitter
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.textfield.TextInputEditText
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
    var msgs = mutableListOf<String>()
    var users =  mutableListOf<String>()
    var chating = false
    //var chatAdapter = ChatAdapter(msgs,users,my_name)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        supportActionBar?.hide()
        val board = findViewById<Go_board>(R.id.Go_board)
        room_name = intent.getStringExtra("room_name").toString();
        color = intent.getStringExtra("color").toString();
        my_name = intent.getStringExtra("my_name").toString()
        op_name = intent.getStringExtra("op_name").toString()
        kid = intent.getStringExtra("kid").toString()

        findViewById<Button>(R.id.send).setOnClickListener{view ->
            var message = findViewById<TextInputEditText>(R.id.chat_msg).text.toString().trim()
            if (message!=""){
                findViewById<TextInputEditText>(R.id.chat_msg).text = null
                mSocket.emit("msg",room_name,my_name,message)
            }
               //아마 resume의 리스너에서 처리 될꺼임



        }
        //findViewById<RecyclerView>(R.id.chat_list).adapter = chatAdapter


        var my_name_part =findViewById<TextView>(R.id.my_name)
        var op_name_part = findViewById<TextView>(R.id.op_name)

        var my_color_part = findViewById<ImageView>(R.id.my_color)
        var op_color_part = findViewById<ImageView>(R.id.op_color)

        my_name_part.text = my_name
        op_name_part.text = op_name

        if (color=="black"){
            my_color_part.setImageResource(R.drawable.black_ball)
            op_color_part.setImageResource(R.drawable.white_ball)
        }else{
            op_color_part.setImageResource(R.drawable.black_ball)
            my_color_part.setImageResource(R.drawable.white_ball)
        }


        Log.d("name test", my_name);
        Log.d("name test", op_name);

        turn = color =="black"
        Log.v("h1",turn.toString())

        ball_Board = findViewById<onballs>(R.id.balls)
        ball_Board.setTurn(turn, room_name)
        mSocket.connect()
        mSocket.emit("rejoin", room_name)

        ball_Board.setSocket(mSocket)
        mSocket.on("set go", send_balls)
        mSocket.on("game result",open_popup)
        mSocket.on("msg",chat_update)






        ///mark name and color ==>{Next}



        findViewById<Button>(R.id.main).setOnClickListener{view ->
            mSocket.close()
            finish()
        }
        val imm: InputMethodManager = getSystemService(INPUT_METHOD_SERVICE) as InputMethodManager
        val input1 = findViewById<TextInputEditText>(R.id.chat_msg)

        findViewById<Button>(R.id.chat).setOnClickListener{view ->
            if(chating){
                findViewById<ConstraintLayout>(R.id.chatting).visibility = View.INVISIBLE
                imm.hideSoftInputFromWindow(input1.getWindowToken(), 0);

            }else{
                findViewById<ConstraintLayout>(R.id.chatting).visibility = View.VISIBLE
                findViewById<TextView>(R.id.new_msg).visibility = View.INVISIBLE
                imm.showSoftInput(input1, 0);
            }
            chating= !chating
            ball_Board.chating = chating

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
        if(winner == "draw") {
            win_text = "DRAW"
        }
        else if(winner!=color){
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
                        findViewById<ConstraintLayout>(R.id.win_or_lose).visibility = View.VISIBLE
                        findViewById<TextView>(R.id.win_text).text = win_text
                    }
                })
            }
        }).start()

    }

    var chat_update = Emitter.Listener { args ->
        Thread(object : Runnable{
            override fun run() {
                runOnUiThread(Runnable {
                    kotlin.run {
                        if (!chating){
                            findViewById<TextView>(R.id.new_msg).visibility = View.VISIBLE
                        }

                        Log.v("get???",args[0].toString())
                        msgs.add(args[1].toString())
                        users.add(args[0].toString())
                        Log.v("insert???",msgs.size.toString())
                        //정상이 아님
                        var chat_list = findViewById<RecyclerView>(R.id.chat_list)
                        var AAAdapter = ChatAdapter(msgs,users,my_name)
                        chat_list.setAdapter(AAAdapter)
                        chat_list.scrollToPosition(msgs.size - 1);
                        //chatAdapter.addItem(args[1].toString(),args[0].toString())
                        //_adapter.notifyDataSetChanged()
                        //findViewById<Button>(R.id.test_B).visibility = View.VISIBL
                    }
                })
            }
        }).start()
    }

    // 게임 도중 나가는 경우
    override fun onBackPressed() {
        if(chating) { // 채팅창에서 뒤로가기 누르면 채팅창 꺼지게 수정
            chating = false
            ball_Board.chating = chating
            findViewById<ConstraintLayout>(R.id.chatting).visibility = View.INVISIBLE;
        }
        else {
            var winner = ""
            if (color == "black") {
                winner = "white"
            } else {
                winner = "black"
            }
            mSocket.emit("game end", room_name, winner)
        }
    }
}