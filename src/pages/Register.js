import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const onRegister = (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const nick = e.target.nick.value;
    const pwd = e.target.pwd.value;
    axios.post('http://192.249.18.138:443/api/user/register',
    {
      id: id,
      nick: nick, 
      pwd: pwd
    })
    .then(res => {
      console.log(res.data.status);
      if(res.data.status)
      {
        window.alert("Register Fail");
      }
      else
      {
        window.alert("Register Success");
        navigate(`/`);
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
      <div>Register</div>
      <form onSubmit={onRegister}>
        <input name="id"></input>
        <input name="nick"></input>
        <input name="pwd"></input>
        <input type="submit"></input>
      </form>
    </div>
  );
}