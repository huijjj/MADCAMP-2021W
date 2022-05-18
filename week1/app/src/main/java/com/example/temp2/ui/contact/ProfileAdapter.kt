package com.example.temp2.ui.contact

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.media.Image
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageButton
import android.widget.TextView
import androidx.core.app.ActivityCompat.startActivityForResult
import androidx.recyclerview.widget.RecyclerView
import com.example.temp2.PhotoActivity
import com.example.temp2.Profiles
import com.example.temp2.R
import java.lang.RuntimeException

class ProfileAdapter(val profileList: ArrayList<Profiles>) : RecyclerView.Adapter<ProfileAdapter.CustomViewHolder> ()
{
    lateinit var context: Context
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CustomViewHolder {
        context = parent.context
        val view: View?
        return when (viewType) {
            Profiles.USER_TYPE -> {
                view = LayoutInflater.from(parent.context).inflate(R.layout.contact_user_item, parent, false)  //kt과 xml을 연결하기 위함. context는 activity에서 담고 있는 모든 정보
                CustomViewHolder(view, view.findViewById<ImageButton>(R.id.btn_edit))

            }
            Profiles.PEOPLE_TYPE -> {
                view = LayoutInflater.from(parent.context).inflate(R.layout.contact_list_item, parent, false)
                CustomViewHolder(view, null)
            }
            else -> throw RuntimeException("Incorrect view type!!")
        }
    }

    override fun onBindViewHolder(holder: CustomViewHolder, position: Int) {
        holder.name.text = profileList.get(position).name
        holder.phoneNum.text = profileList.get(position).number
        holder.btnEdit?.setOnClickListener(View.OnClickListener() {
            val intent = Intent(context, UserContactEditActivity::class.java).apply {
                putExtra("user_name", profileList.get(position).name)
                putExtra("user_number", profileList.get(position).number)
            }
            startActivityForResult(holder.itemView.context as Activity, intent, 101, null)
        })
    }

    override fun getItemCount(): Int {
        return profileList.size
    }

    override fun getItemViewType(position: Int): Int {
        return profileList.get(position).type
    }

    class CustomViewHolder(itemView: View, btnEdit : ImageButton?) : RecyclerView.ViewHolder(itemView) {
        val name = itemView.findViewById<TextView>(R.id.tv_userName)
        val phoneNum = itemView.findViewById<TextView>(R.id.tv_phoneNum)
        val btnEdit = btnEdit
    }
}