package com.example.ohmok

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.View
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import com.google.android.material.snackbar.Snackbar
import com.google.android.material.navigation.NavigationView
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.navigateUp
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import androidx.drawerlayout.widget.DrawerLayout
import androidx.appcompat.app.AppCompatActivity
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.recyclerview.widget.RecyclerView
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.bumptech.glide.Glide
import com.example.ohmok.databinding.ActivityMainRoomBinding
import com.example.ohmok.SocketApplication
import com.google.android.material.textfield.TextInputEditText
import com.kakao.sdk.user.UserApiClient
import io.socket.client.Socket
import io.socket.emitter.Emitter
import org.json.JSONArray
import org.json.JSONObject
import java.io.StringReader
import java.util.zip.Inflater

class Main_room : AppCompatActivity() {

    private lateinit var appBarConfiguration: AppBarConfiguration
    private lateinit var binding: ActivityMainRoomBinding

    //lateinit var mSocket: Socket// oncreate될 때, 소켓을 만들어서 받아온다.
    var room_name = ""
    var mSocket = SocketApplication.get()

    // data from kakao api
    var user_name = ""
    var kid = ""

    // data from db
    var win = 0
    var lose = 0


    lateinit var rooms : List<String>

    // db 통신
     companion object {
         var requestQueue: RequestQueue? = null
     }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        //Log.v("2nd","create")

        binding = ActivityMainRoomBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.appBarMainRoom.toolbar) //이 에러는 빌딩 문제이니 무시
        //mSocket = SocketApplication.get()

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

        //new room: 새로운 방 파서 들어가 있기
        findViewById<Button>(R.id.new_room).setOnClickListener{view ->
            //소켓에 새로운 방 집어넣기
            room_name = findViewById<TextInputEditText>(R.id.room_name).text.toString()
            val room_intent = Intent(this, waiting_room::class.java)
            room_intent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
            room_intent.putExtra("room_name", room_name)
            room_intent.putExtra("user_name", user_name) // my_name이라 돼있어서 user_name으로 바꿈
            room_intent.putExtra("kid", kid) // email 대신 카카오 user 사용하도록 수정
            var par_num = "";
            //par_num = args[0].toString()
            //room_intent.putExtra("par_num",par_num)
            //mSocket.close()
            startActivity(room_intent)
            //소켓 크리에이트 전송
            //mSocket.emit("join",room_name)

        }
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
    fun set_Rooms(_rooms:List<String>){
        rooms = _rooms
    }

    override fun onStop() {
        super.onStop()
        mSocket.close()
    }

    override fun onPause(){
        super.onPause()
        Log.v("life","pause")
        mSocket.close()
    }

    override fun onResume() {
        super.onResume()
        Log.v("life","resume")
        mSocket.connect()
        mSocket.emit("rooms")
        mSocket.on("rooms", Emitter.Listener { args ->

            Thread(object : Runnable{
                override fun run() {
                    runOnUiThread(Runnable {
                        kotlin.run {
                            var size = args[0].toString().length
                            rooms = args[0].toString().substring(1,size-1).split(',')
                            Log.v("whtlyl",rooms.toString())
                            if(rooms.toString() == "[]"){
                                rooms = emptyList<String>()
                            }
                            var rooms_list = findViewById<RecyclerView>(R.id.room_list)
                            var _adapter = RoomAdapter(rooms)
                            rooms_list.setAdapter(_adapter)

                            //findViewById<Button>(R.id.test_B).visibility = View.VISIBL
                        }
                    })
                }
            }).start()
        })

        val navView: NavigationView = binding.navView
        UserApiClient.instance.me{ user, error ->
            if (error != null) {
                Log.e("nav", "사용자 정보 요청 실패", error)
            }
            else if (user != null) {
                user_name = "${user.kakaoAccount?.profile?.nickname}"
                kid = user.id.toString()

                Log.d("urltest", kid);

                var user_name_ =  navView.findViewById<TextView>(R.id.user_name)
                user_name_.text =  user_name
                var profile_image = navView.findViewById<ImageView>(R.id.profile_image)
                var imageUrl = "${user.kakaoAccount?.profile?.thumbnailImageUrl}"

                Glide.with(navView).load(imageUrl).into(profile_image);
                Log.i("urltest", "사용자 정보 요청 성공" +
                        "\n회원번호: ${user.id}" +
//                        "\n이메일: ${user.kakaoAccount?.email}" +
                        "\n닉네임: ${user.kakaoAccount?.profile?.nickname}" +
                        "\n프로필사진: ${user.kakaoAccount?.profile?.thumbnailImageUrl}")

                // db api
                requestQueue = Volley.newRequestQueue(this);
                val url = "http://192.249.18.162:443/users/";

                // get user data from db, if user does not exist add user to db
                val get_request = object: StringRequest(
                    Request.Method.GET,
                    url + kid,
                    Response.Listener {
                        val user = JSONObject(it).getJSONArray("user");
                        if(user.length() == 0) { // user does not exist in db
                            Log.d("serverresponse", "user does not exist");

                            // add user to db
                            val post_request = object: StringRequest(
                                Request.Method.POST,
                                url,
                                Response.Listener {
                                    Log.d("serverresponse", it.toString());
                                },
                                Response.ErrorListener {
                                    Log.d("serverresponse", it.toString());
                                }
                            ) {
                                override fun getParams(): MutableMap<String, String> {
                                    var params: MutableMap<String, String> = HashMap();
                                    params["name"] = user_name;
                                    params["kid"] = kid;
                                    return params;
                                }
                            }
                            requestQueue?.add(post_request);
                        }
                        else { // if user exist get user data
                            Log.d("serverresponse", "found user");
                            Log.d("serverresponse", user.toString());
                            val userObject = user.getJSONObject(0);

                            // get win lose count
                            win = userObject.getInt("win");
                            lose = userObject.getInt("lose");
                        }
                    },
                    Response.ErrorListener {
                        Log.d("serverresponse", it.toString());
                    }
                ){}
                requestQueue?.add(get_request);
            }
        }
    }
}


