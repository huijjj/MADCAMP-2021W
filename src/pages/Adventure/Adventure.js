
import React, { useState } from 'react';

import AdventureLobby from "./AdventureLobby";
import AdventureFloor from "./AdventureFloor";
import AdventureInGame from './AdventureInGame';
import AdventureRoomFinal from '../../components/adventure/AdventureRoomFinal';
import AdventureFeneral from './AdventureFuneral';

export default function Adventure() {
  const [floor, setFloor] = useState(1);
  const [isLobby, setIsLobby] = useState(true);
  const [isInGame, setIsInGame] = useState(false);
  
  const [animal, setAnimal] = useState();
  const [stamina, setStamina] = useState(Number(200));
  
  return (
    <>
      {
        (stamina<=0)
        ? <AdventureFeneral animal={animal} />
        : (floor===11)
          ? <AdventureRoomFinal />
          : (isLobby)
            ? <AdventureLobby setIsLobby={setIsLobby} setAnimal={setAnimal} />
            : (isInGame)
              ? <AdventureInGame animal={animal} stamina={stamina} setStamina={setStamina} floor={floor} setFloor={setFloor} setIsInGame={setIsInGame}/>
              : <AdventureFloor animal={animal} stamina={stamina} floor={floor} setIsInGame={setIsInGame}/> 
      }
    </>
  );
}