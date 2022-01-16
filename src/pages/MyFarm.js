import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import AnimalListItem from "../components/myfarm/AnimalListItem";
import ItemListItem from "../components/myfarm/ItemListItem";
import Animals from "../components/myfarm/Animals";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE;
const CONTENT_ANIMAL = 0;
const CONTENT_ITEM = 1;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MyFarm({ userId }) {
  const navigate = useNavigate();
  const [ animalList, setAnimalList ] = useState([]);
  const [ itemList, setItemList ] = useState([]);
  const [ listOpen, setListOpen ] = useState(false);
  const [ contentType, setContentType ] = useState(0);
  const [ useItem, setUseItem ] = useState();

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
  }, []);
  
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
            setAnimalList([]);
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
                else {
                  if((newGeee + newDuck + newChae) >= 300) {
                    console.log("graduation");
  
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
          </ListItem>);
    
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

  return (
    <div>
      <HomeIcon onClick={() => navigate(-1)} />
      <div style={{height: "100%", width: "90%"}}>
        <div style={{width: "100%", height: "100%"}}>
          <Animals animalList={animalList} />
        </div>
        <div>
          <div onClick={() => showList(CONTENT_ANIMAL)}>
            animalList
          </div>
          <div onClick={() => showList(CONTENT_ITEM)}>
            itemList
          </div>
        </div>
        <Dialog
          open={listOpen}
          TransitionComponent={Transition}
          onClose={() => setListOpen(false)}>
          <CloseIcon onClick={() => setListOpen(false)}/>
          {useItem ? 
            <div>{`${useItem.type}을(를) 사용할 동물을 선택하여 주세요`}</div>:
            <div></div>
          }
          <List>{
            makeListContent(contentType)
          }</List>
        </Dialog>
      </div>
    </div>
  );
}