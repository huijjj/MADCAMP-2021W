import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE;

function Home({ userId }) {
  
  const navigate = useNavigate();

  const onClick = (target) => {

    navigate(`/${target}`);
  }

  const [ userInfo , setUserInfo ] = useState({});
  const tier = ['학사', '석사', '박사', '포닥', '교수'];
  useEffect(() => {
    axios.get(`${API_BASE}/user/show/${userId}`)
    .then(res => {
      setUserInfo(
        {
          id: res.data[0].id,
          nickname: res.data[0].nick,
          tier: tier[res.data[0].tier],
          money: res.data[0].Money,
          graduateCnt : res.data[0].graduateCount
        }
      );
    })
    .catch(err => console.log(err));
  }, []);
  
  return (
    <div>
      <div onClick={(e) => {
        e.preventDefault();
        onClick("myfarm"); 
      }}>
        MyFarm
      </div>
      
      <div onClick={(e) => {
        e.preventDefault();
        onClick("adventure");
      }}>
        Adventure
      </div>
      
      <div onClick={(e) => {
        e.preventDefault();
        onClick("animalshop");
      }}>
        AnimalShop
      </div>
      
      <div onClick={(e) => {
        e.preventDefault();
        onClick("itemshop");
      }}>
        ItemShop
      </div>
      
      <div onClick={(e) => {
        e.preventDefault();
        onClick("auction");
      }}>
        Auction
      </div>
      <div>
        아이디 : {userInfo.id}
      </div>
      <div>
        닉네임 : {userInfo.nickname}
      </div>
      <div>
        학위 : {userInfo.tier}
      </div>
      <div>
        졸업시킨 학생 수 : {userInfo.graduateCnt}
      </div>
      <div>
        소지금 : {userInfo.money}
      </div>
    </div>
  );
};

export default Home;