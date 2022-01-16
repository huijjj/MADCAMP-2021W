import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AnimalListItem from "../components/myfarm/AnimalListItem";
import ItemListItem from "../components/myfarm/ItemListItem";
import Animals from "../components/myfarm/Animals";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

import axios from 'axios';
import "../style/MyFarm.css"

const API_BASE = process.env.REACT_APP_API_BASE;
const CONTENT_ANIMAL = 0;
const CONTENT_ITEM = 1;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function MyFarm({ userId }) {
  const navigate = useNavigate();
  const [ animalList, setAnimalList ] = useState([]);
  const [ itemList, setItemList ] = useState([]);
  const [ listOpen, setListOpen ] = useState(false);
  const [ contentType, setContentType ] = useState(0);
  const [ useItem, setUseItem ] = useState();
  const [ numGrowth, setNumGrowth ] = useState(0);

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
      }
    );
  }, [numGrowth]);
  
  const onAnimalItemClick = (id, name) => {
    if(useItem) {
      if(window.confirm(`${name}에게 ${useItem.type}을(를) 사용하시겠습니까?`)) {
        axios.delete(`${API_BASE}/item/use/${id}`, {
          data: {
            itemId: useItem.id
          }
        }).then(
          (res) => {
            console.log(res.data);
       
            // update local state after request success
            // update item list
            setItemList(itemList.filter(e => e.id !== useItem.id));
            // update animal status
            setAnimalList(animalList.map(e => {
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
                      console.log(res.data.status);
                      if(res.data.status === "Success") {
                        setNumGrowth(numGrowth + 1);
                        window.alert(`${e.name}이(가) 진화했습니다`);
                        return {
                          id: e.id,
                          name: e.name,
                          type: next,
                          sex: e.sex,
                          owner: e.owner,
                          adventureCount: e.adventureCount,
                          itemCount: e.itemCount,
                          geee: newGeee,
                          duck: newDuck,
                          chae: newChae,
                          isAbandonded: e.isAbandonded,
                          X: e.X,
                          Y: e.Y
                        };
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
                      console.log(res.data.status);
                      if(res.data.status === "Success") {
                        setNumGrowth(numGrowth + 1);
                        window.alert(`${e.name}이(가) 진화했습니다`);
                        return {
                          id: e.id,
                          name: e.name,
                          type: next,
                          sex: e.sex,
                          owner: e.owner,
                          adventureCount: e.adventureCount,
                          itemCount: e.itemCount,
                          geee: newGeee,
                          duck: newDuck,
                          chae: newChae,
                          isAbandonded: e.isAbandonded,
                          X: e.X,
                          Y: e.Y
                        };
                      }
                    }).catch(console.log);
                  }
                }
                else if(curLevel === "3") {
                  if((newGeee + newDuck + newChae) >= 300) {
                    console.log("graduation");
                    axios.delete(`${API_BASE}/animal/graduate/${userId}`, {
                      data: {
                        id: id,
                        reward: 100
                      },
                    }).then(res => {
                      console.log(res.data.status);
                      if(res.data.status === "Success") {
                        setNumGrowth(numGrowth + 1);
                        window.alert(`${e.name}이(가) 졸업했습니다`);
                      }
                    }).catch(console.log);
                  }
                }

                return {
                  id: e.id,
                  name: e.name,
                  type: e.type,
                  sex: e.sex,
                  owner: e.owner,
                  adventureCount: e.adventureCount,
                  itemCount: e.itemCount,
                  geee: newGeee,
                  duck: newDuck,
                  chae: newChae,
                  isAbandonded: e.isAbandonded,
                  X: e.X,
                  Y: e.Y
                };
              }
              else {
                return e;
              }
            }));
            setNumGrowth(numGrowth + 1);
            setContentType(CONTENT_ITEM);
            setUseItem();
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
  
  const onItemItemClick = (itemType, item) => {
    console.log(itemType);
    if(window.confirm(`${itemType}을(를) 사용하시겠습니까?`)) {
      setUseItem(item); 
      setContentType(CONTENT_ANIMAL);
    }
  }

  const makeListContent = (contentType) => {
    switch (contentType) {
      case CONTENT_ANIMAL :
        return animalList.map(animal => 
          // { (animal.id === -1) 
          //   ? []
            <ListItem key={animal.id}>
                <AnimalListItem 
                  onClick={onAnimalItemClick}
                  id={animal.id}
                  name={animal.name}
                  type={animal.type}
                  sex={animal.sex}
                  geee={animal.geee}
                  duck={animal.duck}
                  chae={animal.chae} />
              </ListItem>
          );
    
      case CONTENT_ITEM :
        return itemList.map(item => <ListItem key={item.id}>
          <ItemListItem 
            onClick={onItemItemClick}
            type={item.type}
            item={item} />
        </ListItem>);

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
          onClose={() => setListOpen(false)}>
          <CloseIcon sx={{ fontSize: 40 }} style={{ zIndex: "9999", position: "fixed" }} onClick={() => setListOpen(false)}/>
          { useItem ? <div>{`${useItem.type}을(를) 사용할 동물을 선택하여 주세요`}</div> : <div></div> }
          { ((contentType === CONTENT_ITEM) && (itemList.length === 0)) ? <div className="MyFarmEmpty">아이템이 없습니다.</div> : <></>}
          { ((contentType === CONTENT_ANIMAL) && (animalList.length === 0)) ? <div className="MyFarmEmpty">동물이 없습니다.</div> : <></>}
          <List className="MyFarmList">{
            makeListContent(contentType)
          }</List>
        </Dialog>
      </div>
    </div>
  );
}