package com.example.temp2.ui.gallery

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.recyclerview.widget.RecyclerView
import com.example.temp2.Photos
import com.example.temp2.R
import kotlin.collections.ArrayList

class PhotoAdapter (val photoList: ArrayList<Photos>) : RecyclerView.Adapter<PhotoAdapter.CustomViewHolder> ()
{
    private lateinit var context: Context

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CustomViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.gallery_list_item, parent, false)
        context = parent.context
        return CustomViewHolder(view)
    }

    override fun onBindViewHolder(holder: CustomViewHolder, position: Int) {
        val rscId = context.resources.getIdentifier(photoList[position].name, "drawable", context.packageName)
        holder.photo.setImageResource(rscId)
    }

    override fun getItemCount(): Int {
        return photoList.size
    }

    class CustomViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val photo:ImageView = itemView.findViewById(R.id.iv_photo)
    }

}