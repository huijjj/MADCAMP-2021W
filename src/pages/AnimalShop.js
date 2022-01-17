import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

import React, { useState, useEffect, useRef } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { useFormControl } from '@mui/material/FormControl';

import { TextField } from '@mui/material';

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide  direction="up" ref={ref} {...props} />;
});

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
  const [ price, setPrice ] = useState(0);

  const [ animalConfirmOpen, setAnimalConfirmOpen ] = useState(false);
  const [ confirmTitle, setConfirmTitle ] = useState("");
  const [ available, setAvailable ] = useState(true);
  const [ type, setType ] = useState("");

  const [ animalNameOpen, setAnimalNameOpen ] = useState(false);
  const [ newName, setNewName ] = useState("");

  const [ animalSexOpen, setAnimalSexOpen ] = useState(false);
  const [ newSex, setNewSex ] = useState("");

  const [ adoptOpen, setAdoptOpen ] = useState(false);
  const [ isAdopt, setIsAdopt ] = useState(false);
  const [ adoptId, setAdoptId ] = useState(-1);
  
  const valueRefName = useRef('');
  const valueRefSex = useRef('');


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
      setPrice(price);
      // if(window.confirm(`${type}을 ${price}원에 구매하시겠습니까?`)) {
      //   if(price <= money) {
      //     const name = window.prompt("이름을 입력해주세요.");
      //     let sex = ""
      //     while(!(sex === "F" || sex === "M")) {
      //       sex = window.prompt("성별을 입력해주세요. (M: 남성, F: 여성)");
      //     }
      //     // buy 
      //     // api request
      //     axios.post(`${API_BASE}/animal/buy/${userId}`, {
      //       name: name,
      //       sex: sex,
      //       type: type,
      //       price: price
      //     }).then(res => {
      //       console.log(res.data);
      //       setMoney(money - price);
      //     }).catch(err => console.log(err));
      //   }
      //   else {
      //     window.alert("보유한 금액이 부족합니다.");
      //   }
      // }
      setConfirmTitle(`${type}을 ${price}원에 구매하시겠습니까?`);
      setType(type);
      setAnimalConfirmOpen(true);

    }
    else { // shelter
      setNewName(name);
      setConfirmTitle(`${name}을(를) 입양하시겠습니까?`);
      setAdoptOpen(true);
      setAdoptId(id);
      // if(window.confirm(`${name}을(를) 입양하시겠습니까?`)) {
      //   // check if adopting is possible
      //   // send request
      //   axios.put(`${API_BASE}/animal/adopt/${userId}`, {
      //     id: id
      //   }).then(res => {
      //     console.log(res.data);
      //     axios.get(`${API_BASE}/animal/abandoned`).then(res => {
      //       setAnimalList(res.data);
      //       console.log(res.data);
      //     }).catch(err => console.log(err));
      //     window.alert(`${name}을(를) 입양했습니다!`);
      //   }).catch(err => console.log(err));
      // }
    }
  }

  return (
    <div className="AnimalShop">
      <div style={{width: "50%", height: "50%"}}>
        <HomeIcon style ={{fontFamily:'paybooc'}} onClick={() => navigate(-1)} className='HomeButton' sx={{ fontSize : 80 }} />
        <div className='haveMoneyAnimal'>
        <img src={`/images/icons/money.png`} style={{height: "2.7rem", width: "3rem", objectFit: "cover", marginLeft:"0.3rem", marginBottom:"1.1rem" }} />
        <div className='moneyInfo'>{money}원</div>
        </div>
        <div className='animalshopBackground'>
          <div style ={{fontFamily:'paybooc'}}>
            <Tabs style ={{fontFamily:'paybooc'}} value={index} onChange={(e, v) => setIndex(v)}>
              <Tab style ={{fontFamily:'paybooc'}} label="Shop"></Tab>
              <Tab style ={{fontFamily:'paybooc'}} label="Shelter"></Tab>
            </Tabs>
          </div >
          <TabPanel style ={{fontFamily:'paybooc'}} value={index} index={0} />
          <TabPanel style ={{fontFamily:'paybooc'}} value={index} index={1} />
        </div>
      </div>
      <Dialog style ={{fontFamily:'paybooc'}}
        open={animalConfirmOpen}
        TransitionComponent={Transition}>
        <DialogTitle style ={{fontFamily:'paybooc'}}>{confirmTitle}</DialogTitle>
        <DialogActions style ={{fontFamily:'paybooc'}}>
          <Button style ={{fontFamily:'paybooc'}} onClick={() => {
            setAnimalConfirmOpen(false);
            setAvailable(true);
          }}>취소</Button>
          { available && 
            <Button style ={{fontFamily:'paybooc'}} onClick={() => {
              if(getPrice(type) <= money) {
                setAvailable(true);
                setAnimalConfirmOpen(false);
                setConfirmTitle("이름을 입력해주세요.")
                setAnimalNameOpen(true);
              } else{
                setConfirmTitle("보유한 금액이 부족합니다.");
                setAvailable(false);
              }
            }}>확인</Button>}
        </DialogActions>
      </Dialog>

      <Dialog style ={{fontFamily:'paybooc'}}
        open={animalNameOpen}
        TransitionComponent={Transition}>
        <DialogTitle style ={{fontFamily:'paybooc'}}>{confirmTitle}</DialogTitle>
        <DialogContent style ={{fontFamily:'paybooc'}}>
          <TextField style ={{fontFamily:'paybooc'}}
            inputProps={{style: {fontFamily:'paybooc'}}}
            InputLabelProps={{style: {fontFamily:'paybooc'}}}
            inputHelperProps= {{style: {fontFamily:'paybooc'}}}
            autoFocus
            required
            error={valueRefName.current?.value === "" ? true : false}
            autoComplete="off"
            margin="dense"
            id="name"
            label="name"
            type="name"
            fullWidth
            variant="standard"
            inputRef={valueRefName}
            onChange={() => setNewName(valueRefName.current.value)}
          />
        </DialogContent>
        <DialogActions style ={{fontFamily:'paybooc'}}>
          <Button style ={{fontFamily:'paybooc'}} onClick={() => {
            setAnimalNameOpen(false);
          }}>취소</Button>
          <Button style ={{fontFamily:'paybooc'}} onClick={() => {
            setConfirmTitle("성별을 입력해주세요. (M: 남성, F: 여성)")
            setAnimalNameOpen(false);
            setAnimalSexOpen(true);
          }}>확인</Button>
        </DialogActions>
      </Dialog>

      <Dialog style ={{fontFamily:'paybooc'}}
        open={animalSexOpen}
        TransitionComponent={Transition}>
        <DialogTitle style ={{fontFamily:'paybooc'}}>{confirmTitle}</DialogTitle>
        <DialogContent style ={{fontFamily:'paybooc'}}>
          <TextField style ={{fontFamily:'paybooc'}}
            
            inputProps={{style: {fontFamily:'paybooc'}}}
            InputLabelProps={{style: {fontFamily:'paybooc'}}}
            autoFocus
            required
            autoComplete="off"
            error={valueRefSex.current.value === "F" || valueRefSex.current.value === "M" ? false : true}
            margin="dense"
            id="sex"
            label="sex"
            type="sex"
            fullWidth
            variant="standard"
            inputRef={valueRefSex}
            onChange={() => {
              setNewSex(valueRefSex.current.value);
            }}
          />
        </DialogContent>
        <DialogActions style ={{fontFamily:'paybooc'}}>
          <Button style ={{fontFamily:'paybooc'}} onClick={() => {
            setAnimalSexOpen(false);
          }}>취소</Button>
          <Button style ={{fontFamily:'paybooc'}} onClick={() => {
            setAnimalSexOpen(false);
            console.log(newName);
            console.log(newSex);
            axios.post(`${API_BASE}/animal/buy/${userId}`, {
              name: newName,
              sex: newSex,
              type: type,
              price: price
            }).then(res => {
              console.log(res.data);
              setMoney(money - price);
            }).catch(err => console.log(err));
          }}>확인</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={adoptOpen}
        TransitionComponent={Transition}>
        <DialogTitle>{confirmTitle}</DialogTitle>
        <DialogActions>
        { available && 
          <Button onClick={() => {
            setAdoptOpen(false);
          }}>취소</Button>}
        { available && 
          <Button onClick={() => {
            setAvailable(false);
            setConfirmTitle(`${newName}을(를) 입양했습니다!`);
            setIsAdopt(true);
          }}>확인</Button>}
        { isAdopt &&
          <Button onClick={() => {
            axios.put(`${API_BASE}/animal/adopt/${userId}`, {
              id: adoptId
            }).then(res => {
              console.log(res.data);
              axios.get(`${API_BASE}/animal/abandoned`).then(res => {
                setAnimalList(res.data);
                console.log(res.data);
              }).catch(err => console.log(err));
            });
            setAdoptOpen(false);
            setAvailable(true);
            setIsAdopt(false);
          }}>확인</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}