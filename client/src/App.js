import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import ChatLog from './ChatLog';
import ChatInput from './ChatInput';


const socket = io.connect('http://172.10.5.112:443');

function App() {
  const scrollRef = useRef();
  const [ room, setRoom ] = useState('');
  const [ chats, setChates ] = useState([]);
  
  useEffect(() => {
    const temp = prompt("Enter room name");
    setRoom(temp ? temp : "default");
    console.log("selected room: ", temp ? temp : "default");
    socket.emit('join', temp ? temp : "default");

    socket.on('message', ({ name, msg }) => {
      console.log(name, msg);
      setChates(chats => chats.concat({name, msg}));
      scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
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

  const onChangeRoom = (e) => {
    e.preventDefault();
    const temp = prompt("Enter room name");
    socket.emit('leave', room);
    setRoom(temp ? temp : "default");
    console.log("selected room: ", temp ? temp : "default");
    socket.emit('join', temp ? temp : "default");
  }

  return (
    <div className="App">
      <ChatLog chats={chats} scrollRef={scrollRef} />
      <ChatInput onMsgSubmit={onMsgSubmit} onChangeRoom={onChangeRoom}/>
    </div>
  );
}

export default App;
