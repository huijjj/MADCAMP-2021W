
import React, { useEffect, useState } from 'react';

import AdventureLobby from "./AdventureLobby";
import AdventureFloor from "./AdventureFloor";
import AdventureInGame from './AdventureInGame';
import AdventureRoomFinal from '../../components/adventure/AdventureRoomFinal';
import AdventureFeneral from './AdventureFuneral';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE;

export default function Adventure({ userId }) {
  const [user, setUser] = useState();
  const [animalList, setAnimalList] = useState([]);

  const [floor, setFloor] = useState(0);
  const [isLobby, setIsLobby] = useState(true);
  const [isInGame, setIsInGame] = useState(false);
  const [animal, setAnimal] = useState();
  const [stamina, setStamina] = useState(Number(200));


  useEffect(() => {
    axios.get(`${API_BASE}/user/show/${userId}`).then(
      (res) => setUser(res.data[0]))
      .catch(error => {
        console.log(error);
      });
    axios.get(`${API_BASE}/animal/owner/${userId}`).then(
      (res) => setAnimalList(res.data))
      .catch(error => {
        console.log(error);
      })
  }, []);

  return (
    <>
      {
        (stamina<=0)
        ? <AdventureFeneral animal={animal} />
        : (floor===11)
          ? <AdventureRoomFinal user={user} animal={animal} setStamina={setStamina} />
          : (isLobby)
            ? <AdventureLobby animalList={animalList} setIsLobby={setIsLobby} setAnimal={setAnimal} setFloor={setFloor} stamina={stamina} setStamina={setStamina} />
            : (isInGame)
              ? <AdventureInGame animal={animal} stamina={stamina} setStamina={setStamina} floor={floor} setFloor={setFloor} setIsInGame={setIsInGame}/>
              : <AdventureFloor user={user} animal={animal} stamina={stamina} floor={floor} setIsInGame={setIsInGame}/> 
      }
    </>
  );
}