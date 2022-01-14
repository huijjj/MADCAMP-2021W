import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Auth({ getId }) {
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');
  const navigate = useNavigate();
  console.log(getId);

  const handleInputId = (e) => {
    setInputId(e.target.value);
  }

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  }

  const onLogin = (e) => {
    e.preventDefault();
    
    const id = e.target.id.value;
    const pwd = e.target.pwd.value;
    axios.post('http://192.249.18.138:443/api/user/login',
    {
      id: id, 
      pwd: pwd
    })
    .then(res => {
      console.log(res.data.status);
      if(res.data.status)
      {
        window.alert("Login Failed");
      }
      else
      {
        getId(res.data[0].id);
        navigate(`/home`);
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
      <div>login</div>
      <form onSubmit={onLogin}>
        <input name="id"></input>
        <input name="pwd"></input>
        <input type="submit"></input>
      </form>
    </div>
  );
}