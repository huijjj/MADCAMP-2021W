package com.example.temp2.ui.calendar

import android.app.AlertDialog
import android.content.Context
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.example.temp2.R
import com.example.temp2.databinding.FragmentCalendarBinding



class CalendarFragment : Fragment() {

    private var _binding: FragmentCalendarBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    private fun showModal(
        inflater: LayoutInflater
    ) {
        val view = inflater.inflate(R.layout.modal_popup, null)
        val modalTv: TextView = view.findViewById(R.id.modalTitle)
        modalTv.text = "짜잔~! 몰카였습니다~"

        val alertDialog = AlertDialog.Builder(context).setTitle("이거 되나?").setPositiveButton("되네") { dialog, which ->
            Toast.makeText(context, "이게 되네", Toast.LENGTH_SHORT).show()
        }.setNegativeButton("아님 말고", null).create()

        alertDialog.setView(view)
        alertDialog.show()
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        _binding = FragmentCalendarBinding.inflate(inflater, container, false)
        val root: View = binding.root


        binding.imageButton.setOnClickListener {
            showModal(inflater)
        }

        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}