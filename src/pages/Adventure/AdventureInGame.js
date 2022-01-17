import { useState, useEffect } from "react";

import AdventureRoomDrink from "../../components/adventure/AdventureRoomDrink";
import AdventureRoomSurprise from "../../components/adventure/AdventureRoomSurprise";

export default function AdventureInGame({ animal, stamina, setStamina, staminaMAX, floor, setFloor, setIsInGame }) {
  const [isDrink, setIsDrink] = useState(false);

  useEffect(() => {
    setIsDrink(Math.random() < 0.0 - animal.duck/1500);
  }, []);


  return (
      <div id="adventure-room">
        <div>
          {isDrink 
            ? <AdventureRoomDrink animal={animal} floor={floor} stamina={stamina} setStamina={setStamina} staminaMAX={staminaMAX} setFloor={setFloor} setIsInGame={setIsInGame} setIsDrink={setIsDrink} />
            : <AdventureRoomSurprise floor={floor} stamina={stamina} setStamina={setStamina} staminaMAX={staminaMAX} setFloor={setFloor} setIsInGame={setIsInGame} />}
        </div>
      </div>
    );
  }