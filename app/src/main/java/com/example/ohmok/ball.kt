package com.example.ohmok

class ball (pos_x:Int, pos_y:Int){
    var x:Int
    var y:Int
    var color = "black"

    init{
        this.x = pos_x
        this.y = pos_y
    }
    fun get_x(): Int {
        return this.x
    }
    fun get_y(): Int {
        return this.y
    }


}