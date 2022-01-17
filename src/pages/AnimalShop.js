import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';

import '../style/AnimalShop.css';

const API_BASE = process.env.REACT_APP_API_BASE;


const animals = [
  {
    type: "김기영1",
    price: 150
  },
  {
    type: "정희종1",
    price: 100
  },
  {
    type: "임승재1",
    price: 50
  }
];

const getPrice = (type) => {
  switch (type) {
    case "김기영1" : return 150;
    case "정희종1" : return 100;
    case "임승재1" : return 50;
    default : return 100;
  }
}

export default function AnimalShop({ userId }) {
  const navigate = useNavigate();
  const [ money, setMoney ] = useState(0);
  const [ index, setIndex ] = useState(0);
  const [ animalList, setAnimalList ] = useState(animals);

  useEffect(() => {
    // request user data from db
    axios.get(`${API_BASE}/user/show/${userId}`).then(
      res => setMoney(res.data[0].Money)
    );
  }, []);

  useEffect(() => {
    if(index === 0) { // shop
      setAnimalList(animals);
    }
    else { // shelter
      // send request to db
      axios.get(`${API_BASE}/animal/abandoned`).then(res => {
        setAnimalList(res.data);
        console.log(res.data);
      }).catch(err => console.log(err));
      // setAnimalList(abandon);
    }
  }, [index]);

  const renderGridItem = (animal, i) => {
    const src = `/images/${animal.type}.png`;

    return (
      <div key={i} style={{ display: "flex"}} onClick={(e) => onClick(e, animal.type, animal.name, animal.id)}>
        <img alt={animal.type} src={src} style={{objectFit: "cover", width: "7rem", height: "7rem"}} />
        <div style={{ display: "flex", flexDirection: "column", marginTop: "1.75rem" }}>
          <div>{index === 0 ? animal.type.substring(0,3) : `${animal.name}(${animal.sex})`}</div>
          <br></br>
          <div>{index === 0 && (`${animal.price}원`)}</div>
        </div>
      </div>
    );
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          animalList.map((e, i) => renderGridItem(e, i))
        )}
      </div>
    );
  }
  
  const onClick = (e, type, name, id) => {
    e.preventDefault();
    console.log(type, index);
    if(index === 0) { // shop
      const price = getPrice(type);
      if(window.confirm(`${type}을 ${price}원에 구매하시겠습니까?`)) {
        if(price <= money) {
          const name = window.prompt("이름을 입력해주세요.");
          let sex = ""
          while(!(sex === "F" || sex === "M")) {
            sex = window.prompt("성별을 입력해주세요. (M: 남성, F: 여성)");
          }
          // buy 
          // api request
          axios.post(`${API_BASE}/animal/buy/${userId}`, {
            name: name,
            sex: sex,
            type: type,
            price: price
          }).then(res => {
            console.log(res.data);
            setMoney(money - price);
          }).catch(err => console.log(err));
        }
        else {
          window.alert("보유한 금액이 부족합니다.");
        }
      }
    }
    else { // shelter
      if(window.confirm(`${name}을(를) 입양하시겠습니까?`)) {
        // check if adopting is possible
        // send request
        axios.put(`${API_BASE}/animal/adopt/${userId}`, {
          id: id
        }).then(res => {
          console.log(res.data);
          axios.get(`${API_BASE}/animal/abandoned`).then(res => {
            setAnimalList(res.data);
            console.log(res.data);
          }).catch(err => console.log(err));
          window.alert(`${name}을(를) 입양했습니다!`);
        }).catch(err => console.log(err));
      }
    }
  }

  return (
    <div className="AnimalShop">
      <div style={{width: "50%", height: "50%"}}>
        <HomeIcon onClick={() => navigate(-1)} className='HomeButton' sx={{ fontSize : 80 }} />
        <div className='haveMoneyAnimal'>
        <img src={`/images/icons/money.png`} style={{height: "2.7rem", width: "3rem", objectFit: "cover", marginLeft:"0.3rem", marginBottom:"1.1rem" }} />
        <div className='moneyInfo'>{money}원</div>
        </div>
        <div className='animalshopBackground'>
          <div>
            <Tabs value={index} onChange={(e, v) => setIndex(v)}>
              <Tab label="Shop"></Tab>
              <Tab label="Shelter"></Tab>
            </Tabs>
          </div>
          <TabPanel value={index} index={0} />
          <TabPanel value={index} index={1} />
        </div>
      </div>
    </div>
  );
}