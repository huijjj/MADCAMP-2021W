import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import ChatLog from './ChatLog';
import ChatInput from './ChatInput';
import RoomList from './RoomList';
import RoomInput from './RoomInput'


const socket = io.connect('http://192.249.18.162:443');

function App() {
  const scrollRef = useRef();
  const [ room, setRoom ] = useState('');
  const [ chats, setChates ] = useState([]);
  const [ joined, setJoined ] = useState(false);
  const [ roomList, setRoomList ] = useState([]);
  
  useEffect(() => {
    setJoined(false);
    socket.emit('rooms');

    socket.on('message', ({ name, msg }) => {
      console.log(name, msg);
      setChates(chats => chats.concat({name, msg}));
      scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
    });
    
    socket.on('rooms', (data) => {
      console.log(data);
      setRoomList(data);
    });
  }, []);

  const onMsgSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const msg = e.target.msg.value;
    // console.log(name);
    // console.log(msg);
    e.target.msg.value = "";
    socket.emit('message', { room, name, msg });
  }

  const onRoomSelect = (roomName) => {
    console.log("selected room: ", roomName);
    setRoom(roomName);
    socket.emit('join', roomName);
    setJoined(true);
  }

  const onRoomCreate = (e) => {
    e.preventDefault();
    const roomname = e.target.room.value;
    e.target.room.value = "";

    console.log("selected room: ", roomname);
    setRoom(roomname ? roomname : "default");

    console.log("selected room: ", roomname ? roomname : "default");
    socket.emit('join', roomname ? roomname : "default");

    setJoined(true);
  }

  const onLeave = (e) => {
    e.preventDefault();
    socket.emit('leave', room);

    setJoined(false);
    window.location.reload();
  }

  return (
    <div className="App">{
      joined ? 
        <>
          <ChatLog chats={chats} scrollRef={scrollRef} />
          <ChatInput onMsgSubmit={onMsgSubmit} onLeave={onLeave}/>
        </> :
        <>
          <RoomList onRoomSelect={onRoomSelect} roomList={roomList} />
          <RoomInput onRoomCreate={onRoomCreate} />
        </>
    }</div>
  );
}

export default App;
