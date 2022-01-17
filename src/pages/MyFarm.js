import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AnimalListItem from "../components/myfarm/AnimalListItem";
import ItemListItem from "../components/myfarm/ItemListItem";
import Animals from "../components/myfarm/Animals";
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

import axios from 'axios';
import "../style/MyFarm.css"

const API_BASE = process.env.REACT_APP_API_BASE;
const CONTENT_ANIMAL = 0;
const CONTENT_ITEM = 1;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const stats = [
  {
    geee: 50,
    duck: 0, 
    chae: 0
  },
  {
    geee: 0,
    duck: 50,
    chae: 0
  },
  {
    geee: 0,
    duck: 0,
    chae: 50
  }
];


export default function MyFarm({ userId }) {
  const navigate = useNavigate();
  const [ animalList, setAnimalList ] = useState([]);
  const [ itemList, setItemList ] = useState([]);
  const [ listOpen, setListOpen ] = useState(false);
  const [ contentType, setContentType ] = useState(0);
  const [ useItem, setUseItem ] = useState();
  const [ roseCount, setRoseCount ] = useState(0);
  const [ dumbellCount, setDumbellCount ] = useState(0);
  const [ bookCount, setBookCount ] = useState(0);
  const [ alertTitle, setAlertTitle ] = useState("");
  const [ alertOpen, setAlertOpen ] = useState(false);
  const [ confirmOpen, setConfirmOpen ] = useState(false);

  // rose dumbell book

  useEffect(() => {
    console.log(userId);
    axios.get(`${API_BASE}/animal/owner/${userId}`).then(
      (res) => {
        console.log(res.data);
        setAnimalList(res.data);
      }
    );
    axios.get(`${API_BASE}/item/owner/${userId}`).then(
      (res) => {
        console.log(res.data);
        setItemList(res.data);
        setRoseCount(res.data[1].length);
        setDumbellCount(res.data[2].length);
        setBookCount(res.data[0].length);
      }
    );
  }, []);
  
  const onAnimalItemClick = (id, name) => {
    if(useItem) {
      if(window.confirm(`${name}에게 ${useItem.type === "rose" ? "흑장미" : useItem.type === "dumbell" ? "아령" : "책"}을(를) 사용하시겠습니까?`)) {
        axios.delete(`${API_BASE}/item/use/${id}`, {
          data: {
            itemId: useItem.id
          }
        }).then(
          (res) => {
            console.log(res.data);
       
            // update local state after request success
            // update item list
            // update animal status
            animalList.forEach(e => {
              if(e.id === id) {
                const newGeee = e.geee + useItem.geee;
                const newDuck = e.duck + useItem.duck;
                const newChae = e.chae + useItem.chae;
                const curLevel = e.type.substr(-1);
                const next = e.type.substring(0, 3) + String(Number(curLevel) + 1);
              
                if(curLevel === "1") {
                  if((newGeee + newDuck + newChae) >= 100) {
                    console.log("lev 1 to lev 2");
                    axios.put(`${API_BASE}/animal/evolve/${id}`, {
                      type: next  
                    }).then(res => { 
                      console.log(res.data);
                      if(res.data.status === "Success") {
                        setAlertTitle(`${e.name}이(가) 진화했습니다`);
                        setAlertOpen(true);
                      }
                    }).catch(console.log);
                  }
                }
                else if(curLevel === "2") {
                  if((newGeee + newDuck + newChae) >= 200) {
                    console.log("lev 2 to lev 3");
                    axios.put(`${API_BASE}/animal/evolve/${id}`, {
                      type: next  
                    }).then(res => { 
                      console.log(res.data);
                      if(res.data.status === "Success") {
                        setAlertTitle(`${e.name}이(가) 진화했습니다`);
                        setAlertOpen(true);
                      }
                    }).catch(console.log);
                  }
                }
                else {
                  if((newGeee + newDuck + newChae) >= 300) {
                    console.log("graduate");
                    axios.delete(`${API_BASE}/animal/graduate/${userId}`, {
                      data: {
                        id: id,
                        reward: 100
                      },
                    }).then(res => {
                      console.log(res.data.status);
                      if(res.data.status === "Success") {
                        setAlertTitle(`${e.name}이(가) 졸업했습니다`);
                        setAlertOpen(true);
                      }
                    }).catch(console.log);
                  }
                }
              }
              axios.get(`${API_BASE}/animal/owner/${userId}`).then(
                (res) => {
                  console.log(res.data);
                  setAnimalList(res.data);
                }
              );
              setContentType(CONTENT_ITEM);
              setUseItem();
            });
            axios.get(`${API_BASE}/item/owner/${userId}`).then(
              (res) => {
                console.log(res.data);
                setItemList(res.data);
                setRoseCount(res.data[1].length);
                setDumbellCount(res.data[2].length);
                setBookCount(res.data[0].length);
              }
            );
          }
        );
      }
      else {
        setContentType(CONTENT_ITEM);
        setUseItem();
      }
    }
    else {
      if(window.confirm(`${name}을(를) 방생하시겠습니까?`)) {
        // api request 
        axios.put(`${API_BASE}/animal/abandon`, {
          id: id
        }).then(res => {
          console.log(res.data);
          // update local state after requset success
          setAnimalList(animalList.filter(animal => animal.id !== id));
        });
      }
    }
  }
  
  const onItemItemClick = (itemType) => {
    console.log(itemType);
    if(window.confirm(`${itemType === "rose" ? "흑장미" : itemType === "dumbell" ? "아령" : "책"}을(를) 사용하시겠습니까?`)) {
      setUseItem(itemList[itemType === "rose" ? 1 : itemType === "dumbell" ? 2 : 0][0]); 
      setContentType(CONTENT_ANIMAL);
    }
  }

  const makeListContent = (contentType) => {
    switch (contentType) {
      case CONTENT_ANIMAL :
        return animalList.map(animal => 
            <div key={animal.id} className="MyFarmAnimalListItem">
              <AnimalListItem 
                onClick={onAnimalItemClick}
                id={animal.id}
                name={animal.name}
                type={animal.type}
                sex={animal.sex}
                geee={animal.geee}
                duck={animal.duck}
                chae={animal.chae} />
            </div>
          );
    
      case CONTENT_ITEM :
        return itemList.map((itemType, i) => {
          if(itemType.length !== 0) {
            return (
              <div key={i} className="MyFarmAnimalListItem">
                <ItemListItem 
                  onClick={onItemItemClick}
                  stat={stats[i]}
                  type={i === 0 ? "book" : i === 1 ? "rose" : "dumbell"} 
                  count={i === 0 ? bookCount : i === 1 ? roseCount : dumbellCount}/>
              </div>
            );
          }
        } 
        );

      default:
        return [];
    }
  }

  const showList = (contentType) => {
    // setListContent(makeListContent(contentType));
    setContentType(contentType);
    setListOpen(true);
  }

  const onStop = (e, data) => {
    e.preventDefault();
    const target = animalList[e.target.id];

    const newX = target.X + data.x;
    const newY = target.Y + data.y;

    setAnimalList(animalList.map((e, i) => {
      if(i === e.target?.id) {
        return {
          id: e.id,
          name: e.name,
          type: e.type,
          sex: e.sex,
          owner: e.owner,
          adventureCount: e.adventureCount,
          itemCount: e.itemCount,
          geee: e.geee,
          duck: e.duck,
          chae: e.chae,
          isAbandonded: e.isAbandonded,
          X: newX,
          Y: newY
        }
      }
      else {
        return e;
      }
    }));
    // console.log(target.id, newX, newY);  
    axios.put(`${API_BASE}/animal/move`, {
      id: target.id,
      X: newX,
      Y: newY
    }).then();
  }

  return (
    <div className="MyFarm">
      <HomeIcon className="HomeButton" sx={{ fontSize: 80 }} onClick={() => navigate(-1)} />
      <div style={{height: "100%", width: "100%"}}>
        <div style={{width: "100%", height: "100%"}}>
          <Animals animalList={animalList} onStop={onStop}/>
        </div>
        <div className="MyFarmMenu">
          <PetsIcon sx={{ fontSize: 80 }} onClick={() => showList(CONTENT_ANIMAL)} className="MyFarmAnimal"/>
          <AutoAwesomeIcon sx={{ fontSize: 80 }} onClick={() => showList(CONTENT_ITEM)} className="MyFarmItem"/>
        </div>
        <Dialog
          open={listOpen}
          TransitionComponent={Transition}
          onClose={() => { 
            setListOpen(false);
            setUseItem();
          }}>
          <CloseIcon sx={{ fontSize: 40 }} style={{ zIndex: "9999", position: "fixed" }} onClick={() => setListOpen(false)}/>
          { useItem ? <div className="MyFarmEmpty">{`${useItem.type === "rose" ? "흑장미" : useItem.type === "dumbell" ? "아령" : "책" }을(를) 사용할 동물을 선택하여 주세요.`}</div> : <div></div> }
          { ((contentType === CONTENT_ITEM) && ((itemList[0].length === 0 && itemList[1].length === 0 && itemList[2].length === 0))) ? <div className="MyFarmEmpty">아이템이 없습니다.</div> : <></>}
          { ((contentType === CONTENT_ANIMAL) && (animalList.length === 0)) ? <div className="MyFarmEmpty">동물이 없습니다.</div> : <></>}
          <div className="MyFarmList">{
            makeListContent(contentType)
          }</div>
        </Dialog>
        <Dialog
          open={alertOpen}
          TransitionComponent={Transition}>
          <DialogTitle>{alertTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              axios.get(`${API_BASE}/animal/owner/${userId}`).then(
                (res) => {
                  console.log(res.data);
                  setAnimalList(res.data);
                }
              );
              setContentType(CONTENT_ITEM);
              setUseItem();
              setAlertOpen(false);
            }}>확인</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={confirmOpen}
          TransitionComponent={Transition}>
          <DialogTitle>{alertTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              axios.get(`${API_BASE}/animal/owner/${userId}`).then(
                (res) => {
                  console.log(res.data);
                  setAnimalList(res.data);
                }
              );
              setContentType(CONTENT_ITEM);
              setUseItem();
              setAlertOpen(false);
            }}>확인</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}