package com.example.temp2.ui.dashboard

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.recyclerview.widget.RecyclerView
import com.example.temp2.Photos
import com.example.temp2.R
import java.util.*
import kotlin.collections.ArrayList
import com.bumptech.glide.Glide

class PhotoAdapter (val photoList: ArrayList<Photos>) : RecyclerView.Adapter<PhotoAdapter.CustomViewHolder> ()
{
    private lateinit var context: Context

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CustomViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.photo_item, parent, false)
        context = parent.context
        return CustomViewHolder(view)
    }

    override fun onBindViewHolder(holder: CustomViewHolder, position: Int) {
//        val resourceID = context.resources.getIdentifier(photoList.get(position).name, "images", context.packageName)
//        holder.photo.setImageResource(photoList.get(position).name)
        val rscId = context.resources.getIdentifier(photoList[position].name, "drawable", context.packageName) //uri
        Glide.with(context).load(rscId).into(holder.photo)
//        holder.photo.setImageResource(rscId)
//        holder.photo.setImageResource(R.drawable.ic_notifications_black_24dp)
    }

    override fun getItemCount(): Int {
        return photoList.size
    }

    class CustomViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val photo:ImageView = itemView.findViewById(R.id.iv_photo)
    }

}