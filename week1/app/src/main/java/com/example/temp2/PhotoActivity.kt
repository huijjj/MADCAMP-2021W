package com.example.temp2

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageButton
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.ActionBar
import androidx.recyclerview.widget.RecyclerView
import androidx.viewpager2.widget.ViewPager2
import com.bumptech.glide.Glide
import com.github.chrisbanes.photoview.PhotoView
import org.json.JSONObject
import org.w3c.dom.Text

class ViewPagerAdapter(photoList: ArrayList<Int>) : RecyclerView.Adapter<ViewPagerAdapter.PagerViewHolder>() {
    var item = photoList


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) = PagerViewHolder((parent))

    override fun getItemCount(): Int = item.size

    override fun onBindViewHolder(holder: PagerViewHolder, position: Int) {
        // Glide.with(parent.context).load().into
        Glide.with(holder.photo).load(item[position]).override(1200, 1200).into(holder.photo)
         holder.info.text = photoList[position].date
    }

    inner class PagerViewHolder(parent: ViewGroup) : RecyclerView.ViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.photo_detail, parent, false)){
        val photo = itemView.findViewById<PhotoView>(R.id.iv_photoDetail)
        val info = itemView.findViewById<TextView>(R.id.tv_date)
    }
}

lateinit var photoList: ArrayList<Photos>

class PhotoActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_photo)
        var actionBar : ActionBar?
        actionBar = supportActionBar
        actionBar?.hide()

        val i = intent.getIntExtra("photo_index", 123) // resource id

        val vp_photo_detail = findViewById<ViewPager2>(R.id.vp_photo_detail)
        val btn_close = findViewById<ImageButton>(R.id.closeButton)

        vp_photo_detail.adapter = ViewPagerAdapter(getPhotoList())
        vp_photo_detail.orientation = ViewPager2.ORIENTATION_HORIZONTAL
        vp_photo_detail.setCurrentItem(i, false) // index in photo list

        // reading photos.json
        photoList = arrayListOf()
        val assets = resources.assets
        val inputStream = assets.open("photos.json")
        val jsonString = inputStream.bufferedReader().use{ it.readText() }

        // parsing json file
        val jObject = JSONObject(jsonString)
        val jArray = jObject.getJSONArray("photos")
        Log.d("BasicSyntax", "${jArray.length()}")
        for(i in 0 until jArray.length()) {
            val obj = jArray.getJSONObject(i)
            val name = obj.getString("name")
            val date = obj.getString("date")
            photoList.add(Photos(name, date))
        }

        btn_close.setOnClickListener(View.OnClickListener() {
                finish()
            }
        )
    }

    private fun getPhotoList(): ArrayList<Int> {
        return arrayListOf(
            R.drawable.photo_1,
            R.drawable.photo_2,
            R.drawable.photo_3,
            R.drawable.photo_4,
            R.drawable.photo_5,
            R.drawable.photo_6,
            R.drawable.photo_7,
            R.drawable.photo_8,
            R.drawable.photo_9,
            R.drawable.photo_10,
            R.drawable.photo_11,
            R.drawable.photo_12,
            R.drawable.photo_13,
            R.drawable.photo_14,
            R.drawable.photo_15,
            R.drawable.photo_16,
            R.drawable.photo_17,
            R.drawable.photo_18,
            R.drawable.photo_19,
            R.drawable.photo_20
        )
    }
}

