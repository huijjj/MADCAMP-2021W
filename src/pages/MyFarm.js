import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import AnimalListItem from "../components/AnimalListItem";
import ItemListItem from "../components/ItemListItem";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Draggable from 'react-draggable';

const CONTENT_ANIMAL = 0;
const CONTENT_ITEM = 1;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MyFarm() {
  const navigate = useNavigate();
  const [ animalList, setAnimalList ] = useState([]);
  const [ itemList, setItemList ] = useState([]);
  const [ listOpen, setListOpen ] = useState(false);
  const [ contentType, setContentType ] = useState(0);
  const [ useItem, setUseItem ] = useState();
  // const [ listContent, setListContent ] = useState();
  


  useEffect(() => {
    setAnimalList([
      {
        id: 1000000000,
        name: "기돌이",
        type: "김기영1",
        sex: "M",
        owner: 2000000000,
        adventureCount: 0,
        itemCount: 0,
        geee: 0,
        duck: 0,
        chae: 0,
        isAbandoned: false,
        X: 0,
        Y: 0
      },
      {
        id: 1000000001,
        name: "기순이",
        type: "김기영2",
        sex: "M",
        owner: 2000000000,
        adventureCount: 3,
        itemCount: 10,
        geee: 40,
        duck: 20,
        chae: 70,
        isAbandoned: false,
        X: 0,
        Y: 0
      },
      {
        id: 1000000002,
        name: "기똥이",
        type: "김기영3",
        sex: "M",
        owner: 2000000000,
        adventureCount: 5,
        itemCount: 20,
        geee: 20,
        duck: 80,
        chae: 120,
        isAbandoned: false,
        X: 0,
        Y: 0
      },
      {
        id: 1000000003,
        name: "기뚱이",
        type: "김기영2",
        sex: "M",
        owner: 2000000000,
        adventureCount: 2,
        itemCount: 14,
        geee: 50,
        duck: 30,
        chae: 50,
        isAbandoned: false,
        X: 0,
        Y: 0
      },
      {
        id: 1000000004,
        name: "기돌이",
        type: "김기영1",
        sex: "M",
        owner: 2000000000,
        adventureCount: 0,
        itemCount: 0,
        geee: 0,
        duck: 0,
        chae: 0,
        isAbandoned: false,
        X: 0,
        Y: 0
      },
      {
        id: 1000000005,
        name: "기순이",
        type: "김기영2",
        sex: "M",
        owner: 2000000000,
        adventureCount: 3,
        itemCount: 10,
        geee: 40,
        duck: 20,
        chae: 70,
        isAbandoned: false,
        X: 0,
        Y: 0
      },
      {
        id: 1000000006,
        name: "기똥이",
        type: "김기영3",
        sex: "M",
        owner: 2000000000,
        adventureCount: 5,
        itemCount: 20,
        geee: 20,
        duck: 80,
        chae: 120,
        isAbandoned: false,
        X: 0,
        Y: 0
      },
      {
        id: 1000000007,
        name: "기뚱이",
        type: "김기영2",
        sex: "M",
        owner: 2000000000,
        adventureCount: 2,
        itemCount: 14,
        geee: 50,
        duck: 30,
        chae: 50,
        isAbandoned: false,
        X: 0,
        Y: 0
      },
      {
        id: 1000000008,
        name: "기돌이",
        type: "김기영1",
        sex: "M",
        owner: 2000000000,
        adventureCount: 0,
        itemCount: 0,
        geee: 0,
        duck: 0,
        chae: 0,
        isAbandoned: false,
        X: 0,
        Y: 0
      },
      {
        id: 1000000009,
        name: "기순이",
        type: "김기영2",
        sex: "M",
        owner: 2000000000,
        adventureCount: 3,
        itemCount: 10,
        geee: 40,
        duck: 20,
        chae: 70,
        isAbandoned: false,
        X: 0,
        Y: 0
      },
      {
        id: 1000000010,
        name: "기똥이",
        type: "김기영3",
        sex: "M",
        owner: 2000000000,
        adventureCount: 5,
        itemCount: 20,
        geee: 20,
        duck: 80,
        chae: 120,
        isAbandoned: false,
        X: 0,
        Y: 0
      },
      {
        id: 1000000011,
        name: "기뚱이",
        type: "김기영2",
        sex: "M",
        owner: 2000000000,
        adventureCount: 2,
        itemCount: 14,
        geee: 50,
        duck: 30,
        chae: 50,
        isAbandoned: false,
        X: 0,
        Y: 0
      },
    ]);

    setItemList([
      {
        id: 3000000000, 
        geee: 100,
        duck: 0,
        chae: 0,
        type: "책",
        owner: 2000000000
      },
      {
        id: 3000000001, 
        geee: 0,
        duck: 100,
        chae: 0,
        type: "흑장미",
        owner: 2000000000
      },
      {
        id: 3000000002, 
        geee: 0,
        duck: 0,
        chae: 100,
        type: "아령",
        owner: 2000000000
      },
      {
        id: 3000000003, 
        geee: 100,
        duck: 0,
        chae: 0,
        type: "책",
        owner: 2000000000
      },
      {
        id: 3000000004, 
        geee: 0,
        duck: 100,
        chae: 0,
        type: "흑장미",
        owner: 2000000000
      },
      {
        id: 3000000005, 
        geee: 0,
        duck: 0,
        chae: 100,
        type: "아령",
        owner: 2000000000
      },
      {
        id: 3000000006, 
        geee: 100,
        duck: 0,
        chae: 0,
        type: "책",
        owner: 2000000000
      },
      {
        id: 3000000007, 
        geee: 0,
        duck: 100,
        chae: 0,
        type: "흑장미",
        owner: 2000000000
      },
      {
        id: 3000000008, 
        geee: 0,
        duck: 0,
        chae: 100,
        type: "아령",
        owner: 2000000000
      },
      {
        id: 3000000009, 
        geee: 100,
        duck: 0,
        chae: 0,
        type: "책",
        owner: 2000000000
      },
      {
        id: 3000000010, 
        geee: 0,
        duck: 100,
        chae: 0,
        type: "흑장미",
        owner: 2000000000
      },
      {
        id: 3000000011, 
        geee: 0,
        duck: 0,
        chae: 100,
        type: "아령",
        owner: 2000000000
      }
    ]);
  }, []);

  const onAnimalItemClick = (id, name) => {
    if(useItem) {
      if(window.confirm(`${name}에게 ${useItem.type}을(를) 사용하시겠습니까?`)) {
        // api request

        // update local state after request success
        // update item list
        setItemList(itemList.filter(e => e.id !== useItem.id));

        // update animal status
        setAnimalList(animalList.map(e => {
          if(e.id === id) {
            return {
              id: e.id,
              name: e.name,
              type: e.type,
              sex: e.sex,
              owner: e.owner,
              adventureCount: e.adventureCount,
              itemCount: e.itemCount,
              geee: e.geee + useItem.geee,
              duck: e.duck + useItem.duck,
              chae: e.chae + useItem.chae,
              isCarbonCompound: e.isCarbonCompound,
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
      else {
        setContentType(CONTENT_ITEM);
        setUseItem();
      }
    }
    else {
      if(window.confirm(`${name}을(를) 방생하시겠습니까?`)) {
        // api request 
  
        // update local state after requset success
        setAnimalList(animalList.filter(animal => animal.id !== id));
        // setListContent(listContent.filter(item => item.key !== id));
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

  const onDrag = (e, data) => {
    e.preventDefault();
  }

  const onStop = (e, data) => {
    e.preventDefault();
    const target = e.target.id;
    const newX = data.x > 0 ? data.x : 0;
    const newY = data.y > 0 ? data.y : 0;
    console.log(target, newX, newY);
    
    // request api to update DB
    
    // update local data
    setAnimalList(animalList.map(e => e.id === target ? {
      id: e.id,
      name: e.name,
      type: e.type,
      sex: e.sex,
      owner: e.owner,
      adventureCount: e.adventureCount,
      itemCount: e.itemCount,
      geee: e.geee + useItem.geee,
      duck: e.duck + useItem.duck,
      chae: e.chae + useItem.chae,
      isCarbonCompound: e.isCarbonCompound,
      X: newX,
      Y: newY
    } : e));
  }

  const renderAnimals = () => {
    return animalList.map((e) => {
      const src = `/images/${e.type.substring(0, 3)}/${e.type.at(3)}.jpg`;
      return (<Draggable onDrag={onDrag} onStop={onStop} key={e.id}>
        <img id={e.id} style={{position: "absolute", width: "7rem", height: "7rem", transform: `translate(${e.X}px, ${e.Y}px)`}} src={src} />
      </Draggable>);
    }); 
  }

  return (
    <div>
      <HomeIcon onClick={() => navigate(-1)} />
      <div style={{height: "100%", width: "90%"}}>
        <div style={{width: "100%", height: "100%"}}>
          {renderAnimals()}
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