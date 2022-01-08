package com.example.ohmok

import android.os.Parcelable
import android.util.Log
import io.socket.client.IO
import io.socket.client.Socket
import java.net.URISyntaxException

class SocketApplication {
    companion object {
        lateinit var socket : Socket
        fun get(): Socket {
            try {
                Log.v("hi2","hihi")
                // [uri]부분은 "http://X.X.X.X:3000" 꼴로 넣어주는 게 좋다.
                socket = IO.socket("http://192.249.18.167:443")
            } catch (e: URISyntaxException) {
                e.printStackTrace()
            }
            return socket
        }
    }
}