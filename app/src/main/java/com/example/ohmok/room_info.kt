package com.example.ohmok

class room_info {
    var room_name = ""
    var room_people = mutableSetOf<String>()
    constructor (name:String, people:Set<String>){
        this.room_name = name
        this.room_people = people.toMutableSet()
    }
    fun add_person(person:String){
        this.room_people.add(person)
    }
    fun room_count():Int{
        return this.room_people.size
    }

}