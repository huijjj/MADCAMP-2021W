import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slide from '@mui/material/Slide';

import '../style/ItemShop.css';

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function getPrice(type) {
  switch(type) {
    case "dumbell":
    case "book":
    case "rose":
      return 25;  

    default:
      return 0;
  }
}


export default function ItemShop({ userId }) {
  const navigate = useNavigate();
  const [ money, setMoney ] = useState(0); 
  const [ itemConfirmOpen, setItemConfirmOpen ] = useState(false);
  const [ confirmTitle, setConfirmTitle ] = useState("");
  
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

    setConfirmTitle(`${type === "book" ? "책" : type === "rose" ? "흑장미" : "아령"}을(를) ${price}원에 구매하시겠습니까?`);
    setItemConfirmOpen(true);
    // if(window.confirm(`${type}을(를) ${price}원에 구매하시겠습니까?`)) {
    //   if(price <= money) {
    //     // send request
    //     axios.post(`${API_BASE}/item/buy/${userId}`, {
    //       type: type,
    //       geee: items[i].geee,
    //       duck: items[i].duck,
    //       chae: items[i].chae,
    //       price: price
    //     }).then(res => {
    //       console.log(res.data);
    //       // update local data
    //       setMoney(money - price); 
    //     }).catch(res => {
    //       console.log(res);
    //     });
    //   }
    //   else {
    //     window.alert("보유한 금액이 부족합니다.");
    //   }
    // }
  }

  const renderItems = (item, i) => {
    return (
      <div className="ItemShopItemItem">
        <br></br>
        <div key={i} style={{display: "flex"}} onClick={(e) => onClick(e, item.type, i)}>
            <img alt={item.type} src={`/images/items/${item.type}.png`} style={{height: "7rem", width: "7rem", objectFit: "cover",  marginLeft: "2rem",marginRight: "2rem"}} />
            <div className='itemstatus'>
              <div>{item.type === "book" ? "책" : item.type === "rose" ? "흑장미" : "아령"}</div>
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
      <div className="haveMoney">
        <img alt="money" src={`/images/icons/money.png`} style={{height: "2.7rem", width: "3rem", objectFit: "cover", marginLeft:"1.3rem", marginTop:"5.6rem" }} />
        <div className='moneyInfoItem'>{money}원</div>
      </div>
      <div className='itemshopLayout'>
        <div className="itemshopBackground">
          <div style={{ width : "100%" }}>
            <div style={{ width : "100%" }}>{
              items.map(renderItems)
            }</div>
          </div>
        </div>
      </div>
      <Dialog
        open={itemConfirmOpen}
        TransitionComponent={Transition}>
        <DialogTitle>{confirmTitle}</DialogTitle>
        <DialogActions>
          <Button onClick={() => {
            setItemConfirmOpen(false);
          }}>취소</Button>
          <Button onClick={() => {
            setItemConfirmOpen(false);
          }}>확인</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}