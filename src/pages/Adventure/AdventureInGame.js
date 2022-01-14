import { useLocation, useNavigate, useParams } from "react-router-dom";

import AdventureRoomDrink from "../../components/adventure/AdventureRoomDrink";
import AdventureRoomFinal from "../../components/adventure/AdventureRoomFinal";
import AdventureRoomSurprise from "../../components/adventure/AdventureRoomSurprise";

export default function AdventureInGame({ animal, stamina, setStamina, floor, setFloor, setIsInGame }) {

  function getRandomRoom() {
    const ran = Math.random();
    if (ran < 0.7) {
      return <AdventureRoomDrink floor={floor} stamina={stamina} setStamina={setStamina} setFloor={setFloor} setIsInGame={setIsInGame} />;
    }
    else {
      return <AdventureRoomSurprise floor={floor} stamina={stamina} setStamina={setStamina} setFloor={setFloor} setIsInGame={setIsInGame} />;
    }
  }


  return (
      <div id="adventure-room">
        <div>
          {(floor === 11)
          ? <AdventureRoomFinal />
          : getRandomRoom()}
        </div>
      </div>
    );
  }