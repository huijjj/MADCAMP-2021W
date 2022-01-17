import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import AdventureRoomFinal from './AdventureRoomFinal';

import '../../style/Surprise.css'

export default function AdventureRoomSurprise({ floor, stamina, setStamina, staminaMAX, setFloor, setIsInGame }) {
  
  const handleNext = () => {
    console.log(stamina)
    console.log(staminaMAX)
    const newStamina = (stamina+30 < staminaMAX) ? 30 : parseInt(staminaMAX-stamina);
    console.log(newStamina)
    setFloor(floor+1);
    setStamina(stamina+parseInt(newStamina));
    setIsInGame(false);
  }
  

  
  return (
    <div className="SurpriseBack">
      <div className="Surprise">
        <div className="SurpriseTitle">선물입니다!</div>
        <img className="SurpriseWater" src="images/water.png" ></img>
        <div className="SurpriseContent">HP 30을 회복합니다</div>
        <Button variant="contained" onClick={handleNext}>
          {(floor===10) ? "마지막" : floor + 1}층으로 이동하기
        </Button>
      </div>
    </div>
  );
}