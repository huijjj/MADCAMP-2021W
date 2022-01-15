import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_BASE;

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

  const onClick = (target) => {

    navigate(`/${target}`);
  }

  const onLogin = (e) => {
    e.preventDefault();
    
    const id = e.target.id.value;
    const pwd = e.target.pwd.value;
    axios.post(`${API_BASE}/user/login`,
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
      <div onClick={(e) => {
        e.preventDefault();
        onClick("register");
      }}>
        Register
      </div>
    </div>
  );
}