package com.example.temp2.ui.contact

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.temp2.Profiles
import com.example.temp2.R
import java.lang.RuntimeException

class ProfileAdapter(val profileList: ArrayList<Profiles>) : RecyclerView.Adapter<ProfileAdapter.CustomViewHolder> ()
{

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CustomViewHolder {
        val view: View?
        return when (viewType) {
            Profiles.USER_TYPE -> {
                view = LayoutInflater.from(parent.context).inflate(R.layout.contact_user_item, parent, false)  //kt과 xml을 연결하기 위함. context는 activity에서 담고 있는 모든 정보
                CustomViewHolder(view)
            }
            Profiles.PEOPLE_TYPE -> {
                view = LayoutInflater.from(parent.context).inflate(R.layout.contact_list_item, parent, false)
                CustomViewHolder(view)
            }
            else -> throw RuntimeException("Incorrect view type!!")
        }
    }

    override fun onBindViewHolder(holder: CustomViewHolder, position: Int) {
        holder.name.text = profileList.get(position).name
        holder.phoneNum.text = profileList.get(position).number
    }

    override fun getItemCount(): Int {
        return profileList.size
    }

    override fun getItemViewType(position: Int): Int {
        return profileList.get(position).type
    }

    class CustomViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val name = itemView.findViewById<TextView>(R.id.tv_userName)
        val phoneNum = itemView.findViewById<TextView>(R.id.tv_phoneNum)
    }
}