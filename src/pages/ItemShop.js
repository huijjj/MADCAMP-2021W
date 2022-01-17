import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/ItemShop.css';
import { margin } from '@mui/system';

const API_BASE = process.env.REACT_APP_API_BASE;


const items = [
  {
    type: "book",
    price: 25,
    geee: 10,
    duck: 0,
    chae: 0
  },
  {
    type: "rose",
    price: 25,
    geee: 0,
    duck: 20,
    chae: 0
  },
  {
    type: "dumbell",
    price: 25,
    geee: 0,
    duck: 0,
    chae: 30
  }
];

function getPrice(type) {
  switch(type) {
    case "dumbell":
    case "book":
    case "rose":
      return 100;  

    default:
      return 0;
  }
}


export default function ItemShop({ userId }) {
  const navigate = useNavigate();
  const [ money, setMoney ] = useState(0); 
  
  useEffect(() => {
    // get user date from db
    // set money
    axios.get(`${API_BASE}/user/show/${userId}`).then(
      res => setMoney(res.data[0].Money)
    );
  }, []);

  const onClick = (e, type, i) => {
    e.preventDefault();
    
    const price = getPrice(type);

    console.log(type, price);
    if(window.confirm(`${type}을(를) ${price}원에 구매하시겠습니까?`)) {
      if(price <= money) {
        // send request
        axios.post(`${API_BASE}/item/buy/${userId}`, {
          type: type,
          geee: items[i].geee,
          duck: items[i].duck,
          chae: items[i].chae,
          price: price
        }).then(res => {
          console.log(res.data);
          // update local data
          setMoney(money - price); 
        }).catch(res => {
          console.log(res);
        });
      }
      else {
        window.alert("보유한 금액이 부족합니다.");
      }
    }
  }

  const renderItems = (item, i) => {
    return (
      <div>
        <br></br>
        <div key={i} style={{display: "flex"}} onClick={(e) => onClick(e, item.type, i)}>
            <img alt={item.type} src={`/images/items/${item.type}.png`} style={{height: "7rem", width: "7rem", objectFit: "cover", marginRight: "10px"}} />
            <div>
              <div>{item.type}</div>
              <div>{item.price}원</div>
              <br></br>
              <div>지: {item.geee}</div>
              <div>덕: {item.duck}</div>
              <div>체: {item.chae}</div>
            </div>
        </div>
        <br></br>
      </div>
    );
  }

  return (
    <div className="ItemShop">
      <HomeIcon onClick={() => navigate(-1)} className='HomeButton' sx={{ fontSize : 80 }}/>
      <div className='haveMoney'>
        <img src={`/images/icons/money.png`} style={{height: "2rem", width: "2rem", objectFit: "cover", marginRight: "5px"}} /> 
        {money}원
      </div>
      <div className='itemshopLayout'>
        <div className="itemshopBackground">
          <div>
            <div>{
              items.map(renderItems)
            }</div>
          </div>
        </div>
      </div>
    </div>
  );
}