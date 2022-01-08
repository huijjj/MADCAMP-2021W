package com.example.ohmok;

import android.content.Context
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;
import java.util.ArrayList

class RoomAdapter internal constructor(list: List<String>?) :
    RecyclerView.Adapter<RoomAdapter.ViewHolder>() {
    private var mData: List<String>? = null
    // 아이템 뷰를 저장하는 뷰홀더 클래스. 클릭 이벤트 적용
    inner class ViewHolder internal constructor(itemView: View) :
        RecyclerView.ViewHolder(itemView) {
        var textView1: TextView

        init {
            // 뷰 객체에 대한 참조. (hold strong reference)
            textView1 = itemView.findViewById(R.id.roomy)
        }
    }

    // onCreateViewHolder() - 아이템 뷰를 위한 뷰홀더 객체 생성하여 리턴.
    override fun onCreateViewHolder(
        parent: ViewGroup,
        viewType: Int
    ): ViewHolder {
        val context = parent.context
        val inflater =
            context.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
        val view: View = inflater.inflate(R.layout.room_element, parent, false)
        return ViewHolder(view)
    }

    // onBindViewHolder() - position에 해당하는 데이터를 뷰홀더의 아이템뷰에 표시.
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        var size = mData!![position].length
        val text: String = mData!![position].substring(1,size-1)
        holder.textView1.text = text
    }

    // getItemCount() - 전체 데이터 갯수 리턴.
    override fun getItemCount(): Int {
        return mData!!.size
    }

    // 생성자에서 데이터 리스트 객체를 전달받음.
    init {
        mData = list
    }
}
