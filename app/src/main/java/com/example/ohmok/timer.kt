package com.example.ohmok

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.util.AttributeSet
import android.util.Log
import android.view.View
import androidx.annotation.AttrRes

class timer: View {
    constructor(context: Context) : super(context)
    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs)
    constructor(context: Context, attrs: AttributeSet?, @AttrRes defStyleAttr: Int) : super(context, attrs, defStyleAttr)
    val start = false

    var sec = 0
    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)

        val time_paint = Paint()
        time_paint.color = Color.CYAN
        time_paint.setStrokeWidth (10F)
        kotlin.concurrent.timer(period = 1000){
            if (sec<30){
                sec++
                Log.e("time",sec.toString())
                canvas.drawLine(0F, 30F,canvas.width/30F*sec,30F,time_paint)
                invalidate()
            }else{
                cancel()
            }
        }
    }


}