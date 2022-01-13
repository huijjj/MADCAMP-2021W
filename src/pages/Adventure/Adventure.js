
import React, { useState } from 'react';

import AdventureLobby from "./AdventureLobby";
import AdventureFloor from "./AdventureFloor";
import AdventureInGame from './AdventureInGame';
import AdventureRoomFinal from '../../components/adventure/AdventureRoomFinal';

export default function Adventure() {
  const [floor, setFloor] = useState(1);
  const [isLobby, setIsLobby] = useState(true);
  const [isInGame, setIsInGame] = useState(false);

  return (
    <>
      {
        (floor===11)
        ? <AdventureRoomFinal />
        : (isLobby)
          ? <AdventureLobby setIsLobby={setIsLobby} />
          : (isInGame)
            ? <AdventureInGame floor={floor} setFloor={setFloor} setIsInGame={setIsInGame}/>
            : <AdventureFloor floor={floor} setIsInGame={setIsInGame}/> 
      }
    </>
  );
}