import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home({ history, match, location }) {
  const navigate = useNavigate();

  const onClick = (target) => {
    // console.log(history, match, location);
    // history.push(`/${target}`);
    navigate(`/${target}`);
  }

  const [ userInfo , setUserInfo ] = useState({});

  useEffect(() => {
    setUserInfo(
      {
        id: "0123456789",
        nickname: "임승재",
        tier: "학사"
      }
    );
  })
  
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
      
      <div onClick={(e) => {
        e.preventDefault();
        onClick("logout");
      }}>
        logout
      </div>

      <div>
        {userInfo.id}
      </div>
      <div>
        {userInfo.nickname}
      </div>
      <div>
        {userInfo.tier}
      </div>
    </div>
  );
};

export default Home;