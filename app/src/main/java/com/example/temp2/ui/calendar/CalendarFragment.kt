package com.example.temp2.ui.calendar

import android.app.AlertDialog
import android.content.Intent
import android.media.MediaPlayer
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.example.temp2.R
import com.example.temp2.databinding.FragmentCalendarBinding
import com.bumptech.glide.Glide
import com.example.temp2.SurpriseActivity
import com.example.temp2.SurpriseSadActivity


class CalendarFragment : Fragment() {

    private var _binding: FragmentCalendarBinding? = null
    private lateinit var mediaPlayer: MediaPlayer
    var count : Int = 0
    var correct_count : Int = 0

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    private fun showModal(
        inflater: LayoutInflater,
        day: Int
    ) {
        val view = inflater.inflate(R.layout.modal_popup, null)
        val modalTv: TextView = view.findViewById(R.id.modalContent)
        val modalIv: ImageView = view.findViewById(R.id.modalImage)


        when(day) {
            1 -> {
                Glide.with(requireContext()).load(R.drawable.day1).into(modalIv)
                modalTv.text = "“인류의 모든 성과는 시행착오로부터 이루어졌다.” \n\n - 장병규 의장님"
            }

            2 -> {
                Glide.with(requireContext()).load(R.drawable.day2).into(modalIv)
                modalTv.text = "\n20211202는\n거꾸로해도\n20211202입니다.\n"
            }

            3 -> {
                Glide.with(requireContext()).load(R.drawable.day3).into(modalIv)
                modalTv.text = "\n3분반 정희종의 생일은\n 12월 3일로 포항공대의\n개교기념일과 같습니다.\n"
            }

            4 -> {
                Glide.with(requireContext()).load(R.drawable.day4).into(modalIv)
                modalTv.text = "“부디 내 말을 믿어보세요.\n아무리 현실이 답답하더라도 내일은 오늘보다 멋진 날이 되리라, 하고요.” \n\n - 나미야 잡화점의 기적 中"
            }

            5 -> {
                Glide.with(requireContext()).load(R.drawable.day5).into(modalIv)
                modalTv.text = "넌센스 퀴-즈!\nQ. 뽑으면 우는 식물은?\n\nA. 우엉~~ 우엉엉"
            }

            6 -> {
                Glide.with(requireContext()).load(R.drawable.day6).into(modalIv)
                modalTv.text = "쩝쩝박사 김민희 선정\n12월에 꼭 먹어야 할 음식 BEST 5 \n 동치미, 설렁탕, 귤,\n 딸기, 시루떡"
            }

            7 -> {
                Glide.with(requireContext()).load(R.drawable.day7).into(modalIv)
                modalTv.text = "알고 계셨나요?\n눅눅해진 김을 전자레인지에 살짝만 돌려주면 다시\n바삭바삭해진답니다!"
            }

            8 -> {
                Glide.with(requireContext()).load(R.drawable.day8).into(modalIv)
                modalTv.text = "\n\n어쩔티비~\n\n"
            }

            9 -> {
                Glide.with(requireContext()).load(R.drawable.day9).into(modalIv)
                modalTv.text = "\n오늘의 운세 \n\n행운이 찾아온다.\n"
            }

            10 -> {
                Glide.with(requireContext()).load(R.drawable.day10).into(modalIv)
                modalTv.text = "12월 10일은\n 세계 인권의 날입니다.\n1948년 12월 10일 제3차\n국제연합총회에서\n세계 인권 선언을\n선포했습니다."
            }

            11 -> {
                Glide.with(requireContext()).load(R.drawable.day11).into(modalIv)
                modalTv.text = "알고 계셨나요?\n몰입캠프는 학생들이 자율적으로 집중개발을 경험하는\n프로그래밍 캠프입니다."
            }

            12 -> {
                Glide.with(requireContext()).load(R.drawable.day12).into(modalIv)
                modalTv.text = "\n\n\n12가 두 개?!\n\n\n"
            }

            13 -> {
                Glide.with(requireContext()).load(R.drawable.day13).into(modalIv)
                modalTv.text = "\n“제 이름은 외자예요.\n외자여서 외로움을\n많이 타죠.\n하지만 걱정하지 말아요. 사랑에는 공격적이니까”\n"
            }

            14 -> {
                Glide.with(requireContext()).load(R.drawable.day14).into(modalIv)
                modalTv.text = "빙-빙- 돌아가는\n회전목마처럼~\n영원히 계속될 것처럼~\n빙-빙- 돌아온\n우리의 시간처럼~↗\n인생은 회전목마~"
            }

            15 -> {
                Glide.with(requireContext()).load(R.drawable.day15).into(modalIv)
                modalTv.text = "“꿈을 이루고자 하는\n용기만 있다면\n모든 꿈을\n이룰 수 있다.” \n\n- 월트 디즈니"
            }

            16 -> {
                Glide.with(requireContext()).load(R.drawable.day16).into(modalIv)
                modalTv.text = "\n\n저쩔가스레인지~\n\n"
            }

            17 -> {
                Glide.with(requireContext()).load(R.drawable.day17).into(modalIv)
                modalTv.text = "\n알고 계셨나요? \n타조의 안구는 뇌보다\n크다고 합니다!\n\n띠용~\n"
            }

            18 -> {
                Glide.with(requireContext()).load(R.drawable.day18).into(modalIv)
                modalTv.text = "\n짐이 주차를 하면 무엇이냐!\n\n파킹이옵니다 즈언하~\n"
            }

            19 -> {
                Glide.with(requireContext()).load(R.drawable.day19).into(modalIv)
                modalTv.text = "\n오늘의 운세\n\n급하다고 하여 조급하게\n 서두르거나 당황하면\n 손해를 본다.\n"
            }

            20 -> {
                Glide.with(requireContext()).load(R.drawable.day20).into(modalIv)
                modalTv.text = "\n알고 계셨나요?\nTV 동물농장은\n2020년 12월 20일로\n1000회를 맞았습니다.\n"
            }

            21 -> {
                Glide.with(requireContext()).load(R.drawable.day21).into(modalIv)
                modalTv.text = "“건전한 열등감이란 타인과 비교해서 생기는 것이 아니라 ‘이상적인 나’와 비교해서 생기는 것이라네.”\n\n- 미움받을용기 中"
            }

            22 -> {
                Glide.with(requireContext()).load(R.drawable.day22).into(modalIv)
                modalTv.text = "1977년 12월 22일은\n‘수출 100억불의 날’로,\n대한민국 수출액이\n100억 달러를\n돌파함과 동시에\nGDP 1,000달러를\n돌파했습니다."
            }

            23 -> {
                Glide.with(requireContext()).load(R.drawable.day23).into(modalIv)
                modalTv.text = "\n“잘자요. 꼬마 아가씨. 오늘은 좋은 꿈 꾸기로 약속!”\n"
            }

            24 -> {
                Glide.with(requireContext()).load(R.drawable.day24).into(modalIv)
                modalTv.text = "\n\n\nHappy christmas eve!\n\n\n"
            }

            else -> null
        }

        val alertDialog = AlertDialog.Builder(context).setTitle("Day " + day.toString()).setPositiveButton("선물열기") { _, _ ->
            Toast.makeText(context, "짜잔!", Toast.LENGTH_SHORT).show()

            when(day) {
                1 -> Glide.with(requireContext()).load(R.drawable.deco_open_1).into(binding.decoButton1)
                2 -> Glide.with(requireContext()).load(R.drawable.deco_open_2).into(binding.decoButton2)
                3 -> Glide.with(requireContext()).load(R.drawable.deco_open_3).into(binding.decoButton3)
                4 -> Glide.with(requireContext()).load(R.drawable.deco_open_4).into(binding.decoButton4)
                5 -> Glide.with(requireContext()).load(R.drawable.deco_open_5).into(binding.decoButton5)
                6 -> Glide.with(requireContext()).load(R.drawable.deco_open_6).into(binding.decoButton6)
                7 -> Glide.with(requireContext()).load(R.drawable.deco_open_7).into(binding.decoButton7)
                8 -> Glide.with(requireContext()).load(R.drawable.deco_open_8).into(binding.decoButton8)
                9 -> Glide.with(requireContext()).load(R.drawable.deco_open_9).into(binding.decoButton9)
                10 -> Glide.with(requireContext()).load(R.drawable.deco_open_10).into(binding.decoButton10)
                11 -> Glide.with(requireContext()).load(R.drawable.deco_open_11).into(binding.decoButton11)
                12 -> Glide.with(requireContext()).load(R.drawable.deco_open_12).into(binding.decoButton12)
                13 -> Glide.with(requireContext()).load(R.drawable.deco_open_13).into(binding.decoButton13)
                14 -> Glide.with(requireContext()).load(R.drawable.deco_open_14).into(binding.decoButton14)
                15 -> Glide.with(requireContext()).load(R.drawable.deco_open_15).into(binding.decoButton15)
                16 -> Glide.with(requireContext()).load(R.drawable.deco_open_16).into(binding.decoButton16)
                17 -> Glide.with(requireContext()).load(R.drawable.deco_open_17).into(binding.decoButton17)
                18 -> Glide.with(requireContext()).load(R.drawable.deco_open_18).into(binding.decoButton18)
                19 -> Glide.with(requireContext()).load(R.drawable.deco_open_19).into(binding.decoButton19)
                20 -> Glide.with(requireContext()).load(R.drawable.deco_open_20).into(binding.decoButton20)
                21 -> Glide.with(requireContext()).load(R.drawable.deco_open_21).into(binding.decoButton21)
                22 -> Glide.with(requireContext()).load(R.drawable.deco_open_22).into(binding.decoButton22)
                23 -> Glide.with(requireContext()).load(R.drawable.deco_open_23).into(binding.decoButton23)
                24 -> Glide.with(requireContext()).load(R.drawable.deco_open_24).into(binding.decoButton24)
                else -> null
            }

            count ++
            if (correct_count+1 == day) {
                correct_count ++
            }
            if (correct_count == 24) {
                val intent = Intent(context, SurpriseActivity::class.java)
                startActivity(intent)
            }
            else if (count == 24) {
                val intent = Intent(context, SurpriseSadActivity::class.java)
                startActivity(intent)
            }

        }.setNegativeButton("열지않기", null).create()

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

        Glide.with(requireContext()).load(R.drawable.bottom_snow).into(binding.bottomSnow)
        mediaPlayer = MediaPlayer.create(context, R.raw.bgm)
        mediaPlayer.isLooping = true
        mediaPlayer.start()

        binding.decoButton24.setOnClickListener {
            showModal(inflater, 24)
        }
        binding.decoButton23.setOnClickListener {
            showModal(inflater, 23)
        }
        binding.decoButton22.setOnClickListener {
            showModal(inflater, 22)
        }
        binding.decoButton21.setOnClickListener {
            showModal(inflater, 21)
        }
        binding.decoButton20.setOnClickListener {
            showModal(inflater, 20)
        }
        binding.decoButton19.setOnClickListener {
            showModal(inflater, 19)
        }
        binding.decoButton18.setOnClickListener {
            showModal(inflater, 18)
        }
        binding.decoButton17.setOnClickListener {
            showModal(inflater, 17)
        }
        binding.decoButton16.setOnClickListener {
            showModal(inflater, 16)
        }
        binding.decoButton15.setOnClickListener {
            showModal(inflater, 15)
        }
        binding.decoButton14.setOnClickListener {
            showModal(inflater, 14)
        }
        binding.decoButton13.setOnClickListener {
            showModal(inflater, 13)
        }
        binding.decoButton12.setOnClickListener {
            showModal(inflater, 12)
        }
        binding.decoButton11.setOnClickListener {
            showModal(inflater, 11)
        }
        binding.decoButton10.setOnClickListener {
            showModal(inflater, 10)
        }
        binding.decoButton9.setOnClickListener {
            showModal(inflater, 9)
        }
        binding.decoButton8.setOnClickListener {
            showModal(inflater, 8)
        }
        binding.decoButton7.setOnClickListener {
            showModal(inflater, 7)
        }
        binding.decoButton6.setOnClickListener {
            showModal(inflater, 6)
        }
        binding.decoButton5.setOnClickListener {
            showModal(inflater, 5)
        }
        binding.decoButton4.setOnClickListener {
            showModal(inflater, 4)
        }
        binding.decoButton3.setOnClickListener {
            showModal(inflater, 3)
        }
        binding.decoButton2.setOnClickListener {
            showModal(inflater, 2)
        }
        binding.decoButton1.setOnClickListener {
            showModal(inflater, 1)
        }

        return root
    }

    override fun onDestroyView() {
        mediaPlayer.stop()
        super.onDestroyView()
        _binding = null
    }
}