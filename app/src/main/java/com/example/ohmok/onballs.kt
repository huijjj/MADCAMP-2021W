package com.example.ohmok;

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.util.AttributeSet
import android.util.Log
import android.view.MotionEvent
import android.view.View
import androidx.annotation.AttrRes
import java.util.*
import kotlin.math.round

class onballs: View {
    val for_black = mutableListOf<ball>()
    val for_white = mutableListOf<ball>()
    var distance :Float = 0.toFloat()
    var ball_array = Array<IntArray>(16, {IntArray(16)})

    var turn = true;

    var signal = true;

    constructor(context: Context) : super(context)
    constructor(context: Context, attrs: AttributeSet?) : super(context, attrs)
    constructor(context: Context, attrs: AttributeSet?, @AttrRes defStyleAttr: Int) : super(context, attrs, defStyleAttr)


    override fun onDraw(canvas: Canvas) {
        //val ma = MainActivity()
        //turn = ma.turn
        Log.v("h2",turn.toString())

        signal = false
        distance = canvas.width.toFloat()/17
        super.onDraw(canvas)
        val ball_black_paint = Paint()
        ball_black_paint.color = Color.BLACK
        val ball_white_paint = Paint()
        ball_white_paint.color = Color.WHITE

        for (b in for_black) {
            canvas.drawCircle(b.get_x(), b.get_y(), 30F, ball_black_paint)
        }
        for (b in for_white) {
            canvas.drawCircle(b.get_x(), b.get_y(), 30F, ball_white_paint)
        }

        Log.e("winner",check_win_or_fall().toString())
        //random_loc()

        var sec = 0
    }

    fun random_loc(){
        val random = Random()
        var x = random.nextInt(16)
        var y = random.nextInt(16)
        while(ball_array[x][y]!=0){
            x = random.nextInt(16)
            y = random.nextInt(16)
        }
        var setball = ball((x+1)*distance,(y+1)*distance)
        ball_array[x][y]=-1
        if (!turn) {
            for_white.add(setball)
            turn = true
            invalidate()
        }else{
            //for_black.add(setball)
            //turn = false
        }


    }
    //서버 요청 받고 white를 채우는 코드 추가, 이때, while을 통해 터치 이벤트 작동을 막아둔다.
    //소켓 받는건 이 위치에서 실행
    //시간 설정 후 턴 돌리는건 어케 하지?

    override fun onTouchEvent(event: MotionEvent?): Boolean {
        //Log.v("click0",for_black.size.toString())
        if (!turn){
            return false

        }else{
            //터치 가능 위치 재설정(이상하게 밀려서 클릭이 안되는 문제 발생
            var xAxis : Float? = null
            var yAxis : Float? = null
            when(event?.action) {
                MotionEvent.ACTION_DOWN -> {
                    //Log.v("click",for_black.size.toString())
                    if (round(event.x/distance).toInt()<1 || round(event.x/distance).toInt()>17|| round(event.y/distance).toInt()<1 || round(event.y/distance).toInt()>17){
                        return false
                    }
                    if(ball_array[round(event.x/distance).toInt()-1][ round(event.y/distance).toInt()-1]==0){
                        xAxis = round(event.x/distance) *distance
                        yAxis = round(event.y/distance) *distance
                        var setball = ball(xAxis,yAxis)
                        ball_array[round(event.x/distance).toInt()-1][ round(event.y/distance).toInt()-1]=1
                        for_black.add(setball)
                        turn = false
                        signal = true

                        //소켓 쓰면 소켓에다가 send 후 onDraw에 리스너 열어두기
                        invalidate()
                        
                        //소켓으로 전송하고 동시에 받아와보자
                    }


                }
            }
        }

        return true
    }

    fun check_win_or_fall():Int{
        //세로
        var winner = 0;
        for(i in 0..15){
            for(j in 0..10){
                if(ball_array[i][j]==1){
                    if(ball_array[i][j+1]==1&&ball_array[i][j+2]==1&&ball_array[i][j+3]==1&&ball_array[i][j+4]==1){
                        winner = 1
                    }
                }
                if(ball_array[i][j]==-1){
                    if(ball_array[i][j+1]==-1&&ball_array[i][j+2]==-1&&ball_array[i][j+3]==-1&&ball_array[i][j+4]==-1){
                        winner = -1
                    }
                }
            }
        }
        //가로
        for(i in 0..10){
            for(j in 0..15){
                if(ball_array[i][j]==1){
                    if(ball_array[i+1][j]==1&&ball_array[i+2][j]==1&&ball_array[i+3][j]==1&&ball_array[i+4][j]==1){
                        winner = 1
                    }
                }
                if(ball_array[i][j]==-1){
                    if(ball_array[i+1][j]==-1&&ball_array[i+2][j]==-1&&ball_array[i+3][j]==-1&&ball_array[i+4][j]==-1){
                        winner = -1
                    }
                }
            }
        }
        //왼쪽 대각
        for(i in 0..10){
            for(j in 0..10){
                if(ball_array[i][j]==1){
                    if(ball_array[i+1][j+1]==1&&ball_array[i+2][j+2]==1&&ball_array[i+3][j+3]==1&&ball_array[i+4][j+4]==1){
                        winner = 1
                    }
                }
                if(ball_array[i][j]==-1){
                    if(ball_array[i+1][j+1]==-1&&ball_array[i+2][j+2]==-1&&ball_array[i+3][j+3]==-1&&ball_array[i+4][j+4]==-1){
                        winner = -1
                    }
                }
            }
        }
        ///오른쪽 대각
        for(i in 5..15){
            for(j in 0..10){
                if(ball_array[i][j]==1){
                    if(ball_array[i-1][j+1]==1&&ball_array[i-2][j+2]==1&&ball_array[i-3][j+3]==1&&ball_array[i-4][j+4]==1){
                        winner = 1
                    }
                }
                if(ball_array[i][j]==-1){
                    if(ball_array[i-1][j+1]==-1&&ball_array[i-2][j+2]==-1&&ball_array[i-3][j+3]==-1&&ball_array[i-4][j+4]==-1){
                        winner = -1
                    }
                }
            }
        }
        return winner
    }



}
