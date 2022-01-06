import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import ChatLog from './ChatLog';
import ChatInput from './ChatInput';


const socket = io.connect('http://172.10.5.112:443');

function App() {
  const scrollRef = useRef();
  const [ chats, setChates ] = useState([]);
  
  useEffect(() => {
    socket.on('message', ({ name, msg }) => {
      console.log(name, msg);
      setChates(chats => chats.concat({name, msg}));
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  const onMsgSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const msg = e.target.msg.value;
    // console.log(name);
    // console.log(msg);
    socket.emit('message', { name, msg });
  }

  return (
    <div className="App">
      <ChatLog chats={chats} scrollRef={scrollRef} />
      <ChatInput onMsgSubmit={onMsgSubmit} />
    </div>
  );
}

export default App;
