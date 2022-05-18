package com.example.ohmok

import android.content.Intent
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView;

class ChatAdapter (
    private val chat: MutableList<String>,
    private val users: MutableList<String>,
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
        holder.idView.text = "  "+item+"  "


    }

    override fun getItemCount(): Int = chat.size

    inner class ViewHolder(v: View) : RecyclerView.ViewHolder(v) {
        val idView: TextView = v.findViewById(R.id.during_chat)

    }

    override fun getItemViewType(position: Int): Int {
        Log.v("chat???","find_view_type")
        val chat_user = users[position]

        if (me == chat_user){
            return 0
        }else{
            return 1
        }
    }

}