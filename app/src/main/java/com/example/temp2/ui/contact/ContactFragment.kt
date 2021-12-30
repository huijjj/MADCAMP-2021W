package com.example.temp2.ui.contact

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.temp2.Profiles
import com.example.temp2.databinding.FragmentContactBinding
import org.json.JSONObject

class ContactFragment : Fragment() {

    private var _binding: FragmentContactBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        _binding = FragmentContactBinding.inflate(inflater, container, false)
        val root: View = binding.root

        // reading contact.json
        val assets = resources.assets
        val inputStream = assets.open("contacts.json")
        val jsonString = inputStream.bufferedReader().use{ it.readText() }

        // parsing json file
        val profileList: ArrayList<Profiles> = arrayListOf()
        val jObject = JSONObject(jsonString)
        val jArray = jObject.getJSONArray("contacts")
        profileList.add(Profiles(Profiles.USER_TYPE, "김민희", "010-1234-5678"))
        for(i in 0 until jArray.length()) {
            val obj = jArray.getJSONObject(i)
            val name = obj.getString("name")
            val number = obj.getString("number")
            profileList.add(Profiles(Profiles.PEOPLE_TYPE, name, number))
        }

        binding.rvProfile.layoutManager = LinearLayoutManager(this.context, LinearLayoutManager.VERTICAL, false)
        binding.rvProfile.setHasFixedSize(true)

        binding.rvProfile.adapter = ProfileAdapter(profileList)

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}