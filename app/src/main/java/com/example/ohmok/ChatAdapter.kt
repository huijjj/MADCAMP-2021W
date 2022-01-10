package com.example.ohmok

import android.content.Intent
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

class ChatAdapter (
    private val chat: List<String>,
    private val user: List<String>,
    private val me: String
) : RecyclerView.Adapter<ChatAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        Log.v("chat???_create",viewType.toString())
        lateinit var view : View
        if(viewType==0){ //나
            view = LayoutInflater.from(parent.context).inflate(R.layout.chat_me,parent,false)
        }else{
            view = LayoutInflater.from(parent.context).inflate(R.layout.char_op,parent,false)
        }
        return ViewHolder(view)

    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {

        val item = chat[position]
        Log.v("chat???",item)
        holder.idView.text = item


    }

    override fun getItemCount(): Int = chat.size

    inner class ViewHolder(v: View) : RecyclerView.ViewHolder(v) {
        val idView: TextView = v.findViewById(R.id.during_chat)

    }

    override fun getItemViewType(position: Int): Int {
        Log.v("chat???","find_view_type")
        val chat_user = user[position]
        val size_u = chat_user.length
        val char_user_s = chat_user.substring(1,size_u-1)

        if (me == char_user_s){
            return 0
        }else{
            return 1
        }
    }
}