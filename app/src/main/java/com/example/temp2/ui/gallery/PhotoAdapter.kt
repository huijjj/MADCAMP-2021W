package com.example.temp2.ui.gallery

import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.recyclerview.widget.RecyclerView
import com.example.temp2.Photos
import com.example.temp2.R
import kotlin.collections.ArrayList
import com.bumptech.glide.Glide
import com.example.temp2.PhotoActivity

class PhotoAdapter (val photoList: ArrayList<Photos>) : RecyclerView.Adapter<PhotoAdapter.CustomViewHolder> ()
{
    private lateinit var context: Context

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CustomViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.gallery_list_item, parent, false)
        context = parent.context
        return CustomViewHolder(view)
    }

    override fun onBindViewHolder(holder: CustomViewHolder, position: Int) {
        val rscId = context.resources.getIdentifier(photoList[position].name, "drawable", context.packageName) //uri
        Glide.with(context).load(rscId).into(holder.photo)

        holder.itemView.setOnClickListener(View.OnClickListener() {
            val intent = Intent(this.context, PhotoActivity::class.java).apply {
                putExtra("photo_index", position)     //Photos item을 한번에 넘기는 방법?
                putExtra("photo_name", photoList[position].name)
                putExtra("photo_date", photoList[position].date)
            }.run{
                context.startActivity(this)
            }

        })
    }

    override fun getItemCount(): Int {
        return photoList.size
    }

    class CustomViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val photo:ImageView = itemView.findViewById(R.id.iv_photo)
    }

}