import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/ItemShop.css';

const API_BASE = process.env.REACT_APP_API_BASE;


const items = [
  {
    type: "dumbell",
    price: 100,
    geee: 0,
    duck: 0,
    chae: 50
  },
  {
    type: "rose",
    price: 100,
    geee: 0,
    duck: 50,
    chae: 0
  },
  {
    type: "rose",
    price: 100,
    geee: 50,
    duck: 0,
    chae: 0
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
      <div key={i} style={{display: "flex"}} onClick={(e) => onClick(e, item.type, i)}>
          <img alt={item.type} src={`/images/items/${item.type}.png`} style={{height: "7rem", width: "7rem", objectFit: "cover"}}/>
          <div>
            <div>{item.type} {item.price}원</div>
            <br></br>
            <div>지: {item.geee}</div>
            <div>덕: {item.duck}</div>
            <div>체: {item.chae}</div>
          </div>
      </div>
    );
  }

  return (
    <div className="ItemShop">
      <HomeIcon onClick={() => navigate(-1)} />
      <div>잔돈: {money}원</div>
      <div className="itemshopBackground">
        <div>
          <div>{
            items.map(renderItems)
          }</div>
        </div>
      </div>
    </div>
  );
}