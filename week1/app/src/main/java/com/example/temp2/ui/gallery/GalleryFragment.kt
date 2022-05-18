package com.example.temp2.ui.gallery

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.GridLayoutManager
import com.example.temp2.Photos
import com.example.temp2.databinding.FragmentGalleryBinding
import org.json.JSONObject

class GalleryFragment : Fragment() {

    private var _binding: FragmentGalleryBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentGalleryBinding.inflate(inflater, container, false)
        val root: View = binding.root


        // reading photos.json
        val assets = resources.assets
        val inputStream = assets.open("photos.json")
        val jsonString = inputStream.bufferedReader().use{ it.readText() }

        // parsing json file
        val photoList: ArrayList<Photos> = arrayListOf()
        val jObject = JSONObject(jsonString)
        val jArray = jObject.getJSONArray("photos")
        Log.d("BasicSyntax", "${jArray.length()}")
        for(i in 0 until jArray.length()) {
            val obj = jArray.getJSONObject(i)
            val name = obj.getString("name")
            val date = obj.getString("date")
            photoList.add(Photos(name, date))
        }

        binding.rvPhotos.layoutManager = GridLayoutManager(this.context, 3)
        binding.rvPhotos.setHasFixedSize(true)

        binding.rvPhotos.adapter = PhotoAdapter(photoList)
        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}