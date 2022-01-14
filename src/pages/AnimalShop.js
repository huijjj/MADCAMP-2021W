import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const animals = [
  {
    type: "김기영1",
    price: 100
  },
  {
    type: "박승민1",
    price: 200
  },
  {
    type: "최준영1",
    price: 170
  },
  {
    type: "성홍념1",
    price: 130
  },
  {
    type: "박시형1",
    price: 130
  },
  {
    type: "박종준1",
    price: 200
  },
  {
    type: "윤정인1",
    price: 200
  },
  {
    type: "이서진1",
    price: 200
  },
  {
    type: "김민희1",
    price: 200
  },
  {
    type: "김민정1",
    price: 200
  },
  {
    type: "김민채1",
    price: 200
  },
  {
    type: "박도윤1",
    price: 200
  },
  {
    type: "조민서1",
    price: 200
  },
  {
    type: "강준서1",
    price: 200
  },
  {
    type: "정희종1",
    price: 150
  },
  {
    type: "임승재1",
    price: 50
  },
  {
    type: "공병규1",
    price: 10
  },
  {
    type: "배설영1",
    price: 200
  }
];

const abandon = [
  {
    type: "김기영1",
    price: 100,
    name: "기돌이",
    sex: "M"
  },
  {
    type: "정희종1",
    price: 150,
    name: "희돌이",
    sex: "M"
  },
  {
    type: "최준영1",
    price: 170,
    name: "준돌이",
    sex: "M"
  
  },
  {
    type: "성홍념1",
    price: 130,
    name: "홍돌이",
    sex: "M"
  }
];

const getPrice = (type) => {
  switch (type) {
    case "배설영1" :
    case "강준서1" :
    case "조민서1" :
    case "박도윤1" :
    case "김민채1" :
    case "김민정1" :
    case "김민희1" :
    case "이서진1" :
    case "박종준1" :
    case "박승민1" :
      return 200;
  
    case "최준영1" :
      return 170;

    case "박시형1" :
    case "성홍념1" :
      return 130;

    case "정희종1" :
      return 150;

    case "김기영1" :
      return 100;

    case "임승재1" :
      return 50;
      
    case "공병규1" :
      return 10;
    
    default :
      return 200;
  }
}

export default function AnimalShop() {
  const navigate = useNavigate();
  const [ money, setMoney ] = useState(0);
  const [ index, setIndex ] = useState(0);
  const [ animalList, setAnimalList ] = useState(animals);

  useEffect(() => {
    // request user data from db
    setMoney(1000);
  }, []);

  useEffect(() => {
    if(index === 0) { // shop
      setAnimalList(animals);
    }
    else { // shelter
      // send request to db
      setAnimalList(abandon);
    }
  }, [index]);

  const renderGridItem = (animal, i) => {
    const src = `/images/${animal.type.substring(0, 3)}/1.jpg`;

    return (
      <div key={i} style={{ display: "flex"}} onClick={(e) => onClick(e, animal.type, animal.name)}>
        <img src={src} style={{objectFit: "cover", width: "7rem", height: "7rem"}} />
        <div>{index === 0 ? animal.type : `${animal.name}(${animal.sex})`}</div>
        <div>{index === 0 && (`: ${animal.price}`)}</div>
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
  
  const onClick = (e, type, name) => {
    e.preventDefault();
    console.log(type, index);
    if(index === 0) { // shop
      const price = getPrice(type);
      if(window.confirm(`${type}을 ${price}원에 구매하시겠습니까?`)) {
        if(price < money) {
          const name = window.prompt("이름을 입력해주세요.");
          let sex = ""
          while(!(sex === "F" || sex === "M")) {
            sex = window.prompt("성별을 입력해주세요. (M: 남성, F: 여성)");
          }
          // buy 
          // api request

          // update local state
          setMoney(money - price);
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

        // update adandon list
      }
    }
  }

  return (
    <div style={{width: "100%", height: "100%"}}>
      <HomeIcon onClick={() => navigate(-1)} />
      <div>AnimalShop</div>
      <div>잔돈: {money}원</div>
      <div>
        <Tabs value={index} onChange={(e, v) => setIndex(v)}>
          <Tab label="Shop"></Tab>
          <Tab label="Shelter"></Tab>
        </Tabs>
      </div>
      <TabPanel value={index} index={0} />
      <TabPanel value={index} index={1} />
    </div>
  );
}