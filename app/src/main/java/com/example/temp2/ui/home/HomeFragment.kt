package com.example.temp2.ui.home

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.temp2.Profiles
import com.example.temp2.databinding.FragmentHomeBinding

class HomeFragment : Fragment() {

    private lateinit var homeViewModel: HomeViewModel
    private var _binding: FragmentHomeBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        homeViewModel =
            ViewModelProvider(this).get(HomeViewModel::class.java)

        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        val root: View = binding.root

        val profileList = arrayListOf(
            Profiles(Profiles.USER_TYPE,"홍길동", "010-1111-2222"),
            Profiles(Profiles.PEOPLE_TYPE,"신짱구", "010-1234-5678"),
            Profiles(Profiles.PEOPLE_TYPE,"훈이", "010-1111-2222"),
            Profiles(Profiles.PEOPLE_TYPE,"맹구", "010-1234-5678"),
            Profiles(Profiles.PEOPLE_TYPE,"유리", "010-1111-2222"),
            Profiles(Profiles.PEOPLE_TYPE,"철수", "010-1234-5678"),
            Profiles(Profiles.PEOPLE_TYPE,"짱아", "010-1234-5678"),
            Profiles(Profiles.PEOPLE_TYPE,"흰둥이", "010-1111-2222"),
            Profiles(Profiles.PEOPLE_TYPE,"침착맨", "010-1234-5678"),
        )

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