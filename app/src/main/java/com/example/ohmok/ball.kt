package com.example.ohmok

class ball (pos_x:Float, pos_y:Float){
    var x:Float
    var y:Float

    init{
        this.x = pos_x
        this.y = pos_y
    }
    fun get_x(): Float {
        return this.x
    }
    fun get_y(): Float {
        return this.y
    }


}