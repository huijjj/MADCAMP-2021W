import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import AdventureRoomDrink from "../../components/adventure/AdventureRoomDrink";
import AdventureRoomFinal from "../../components/adventure/AdventureRoomFinal";
import AdventureRoomSurprise from "../../components/adventure/AdventureRoomSurprise";

export default function AdventureInGame({ animal, stamina, setStamina, floor, setFloor, setIsInGame }) {
  const [isDrink, setIsDrink] = useState(false);

  useEffect(() => {
    setIsDrink(Math.random() < 0.7 - animal.duck/1500);
  }, []);


  return (
      <div id="adventure-room">
        <div>
          {isDrink 
            ? <AdventureRoomDrink animal={animal} floor={floor} stamina={stamina} setStamina={setStamina} setFloor={setFloor} setIsInGame={setIsInGame} setIsDrink={setIsDrink} />
            : <AdventureRoomSurprise floor={floor} stamina={stamina} setStamina={setStamina} setFloor={setFloor} setIsInGame={setIsInGame} />}
        </div>
      </div>
    );
  }