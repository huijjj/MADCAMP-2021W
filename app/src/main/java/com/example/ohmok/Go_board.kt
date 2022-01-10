package com.example.ohmok

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.PointF
import android.util.AttributeSet
import android.util.Log
import android.view.LayoutInflater
import android.view.MotionEvent
import android.view.View
import android.view.View.MeasureSpec
import androidx.annotation.AttrRes
import kotlin.math.round
import java.util.Random
import kotlin.concurrent.timer

class Go_board: View{
    val for_black = mutableListOf<ball>()
    val for_white = mutableListOf<ball>()
    var distance :Float = 0.toFloat()
    var ball_array = Array<IntArray>(16, {IntArray(16)})

    var turn = true;

    constructor(context: Context) : super(context)
    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs)
    constructor(context: Context, attrs: AttributeSet?, @AttrRes defStyleAttr: Int) : super(context, attrs, defStyleAttr)


    override fun onDraw(canvas: Canvas) {
        //canvas.drawColor(Color.rgb(242,201,130))
        distance = canvas.width.toFloat() / 16
        super.onDraw(canvas)


        val paint = Paint()
        paint.color = Color.BLACK
        paint.setStrokeWidth(8F)
        val line_x = mutableListOf<Float>()
        val line_y = mutableListOf<Float>()
        for (i in 1..15) {
            line_x.add(canvas.width * i.toFloat() / 16)
            line_x.add(canvas.width.toFloat() / 16)
            line_x.add(canvas.width * i.toFloat() / 16)
            line_x.add(canvas.width * 15.toFloat() / 16)

            line_y.add(canvas.width.toFloat() / 16)
            line_y.add(canvas.width * i.toFloat() / 16)
            line_y.add(canvas.width * 15.toFloat() / 16)
            line_y.add(canvas.width * i.toFloat() / 16)
        }
        canvas.drawLines(line_x.toFloatArray(), paint);
        canvas.drawLines(line_y.toFloatArray(), paint);
    }

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec)
        val size = MeasureSpec.getSize(widthMeasureSpec)
        setMeasuredDimension(size, size)
    }

}