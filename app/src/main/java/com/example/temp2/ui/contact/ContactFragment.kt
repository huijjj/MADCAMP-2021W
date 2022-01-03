package com.example.temp2.ui.contact

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.temp2.Profiles
import com.example.temp2.databinding.FragmentContactBinding
import org.json.JSONObject
import java.io.BufferedReader
import java.io.File
import java.io.FileReader

class ContactFragment : Fragment() {

    private var _binding: FragmentContactBinding? = null
    private var profileList: ArrayList<Profiles> = arrayListOf()


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

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    override fun onResume() {
        super.onResume()
        // 여기서 파일 읽기
        profileList.clear()

        // reading contact.json
        val assets = resources.assets
        val inputStream = assets.open("contacts.json")
        val jsonString = inputStream.bufferedReader().use{ it.readText() }

        // parsing json file
        val jObject = JSONObject(jsonString)
        val jArray = jObject.getJSONArray("contacts")

        // 유저 파일 읽기
        val userFile = requireContext().getFileStreamPath("user.txt")
        if(userFile.exists()) {
            val fileReader = FileReader(userFile)
            val bufferedReader = BufferedReader(fileReader)
            val temp = arrayListOf<String>()
            bufferedReader.readLines().forEach {
                temp.add(it)
            }
            if(temp.size < 2) {
                profileList.add(Profiles(Profiles.USER_TYPE, "김민희", "010-1234-5678"))
            }
            else {
                profileList.add(Profiles(Profiles.USER_TYPE, temp[0], temp[1]))
            }
        }
        else {
            profileList.add(Profiles(Profiles.USER_TYPE, "김민희", "010-1234-5678"))
        }



        for(i in 0 until jArray.length()) {
            val obj = jArray.getJSONObject(i)
            val name = obj.getString("name")
            val number = obj.getString("number")
            profileList.add(Profiles(Profiles.PEOPLE_TYPE, name, number))
        }

        binding.rvProfile.layoutManager = LinearLayoutManager(this.context, LinearLayoutManager.VERTICAL, false)
        binding.rvProfile.setHasFixedSize(true)
        binding.rvProfile.adapter = ProfileAdapter(profileList)
        ProfileAdapter(profileList).notifyDataSetChanged()
    }
}