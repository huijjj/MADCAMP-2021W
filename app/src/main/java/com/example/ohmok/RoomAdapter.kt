package com.example.ohmok;

import android.content.Context
import android.content.Intent;
import android.util.Log
import android.view.LayoutInflater;
import android.view.View
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;
import java.util.ArrayList

class RoomAdapter(
    private val values: List<String>,
    private val names: List<String>,
    private val username: String,
    private val kid : String
) : RecyclerView.Adapter<RoomAdapter.ViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.room_element,parent,false)
        view.setOnClickListener{v ->
            val room_name = v.findViewById<TextView>(R.id.roomy).text
            val room_intent = Intent(v.context, waiting_room::class.java)
            room_intent.addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
            room_intent.putExtra("room_name",room_name)
            var ma = Main_room()
            room_intent.putExtra("user_name", username) // my_name이라 돼있어서 user_name으로 바꿈
            room_intent.putExtra("kid", kid)
            view.context.startActivity(room_intent)
        }
        return ViewHolder(view)

    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {

        val item = values[position]
        val name = names[position]
        Log.v("Conut",item.toString()+name.toString())
        val size = item.length
        val size_n = name.length
        holder.idView.text = item.substring(1,size-1)
        holder.userView.text = name.substring(1,size_n-1)





    }

    override fun getItemCount(): Int = values.size

    inner class ViewHolder(v: View) : RecyclerView.ViewHolder(v) {
        val idView: TextView = v.findViewById(R.id.roomy)
        val userView: TextView =v.findViewById(R.id.u_name)


    }

}