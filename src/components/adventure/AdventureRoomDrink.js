import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import AdventureRoomFinal from './AdventureRoomFinal';
import GameBar from './GameBar';

export default function AdventureRoomDrink({ floor, stamina, setStamina, setFloor, setIsInGame }) {

  const handleNext = () => {
    setFloor(floor+1);
    setStamina(stamina-50);
    setIsInGame(false);
  }
  
  return (
    <div>
      <h1>
        현지랑 술 배틀
      </h1>
      <div>
        <GameBar />
      </div>
      <Button onClick={handleNext}>
        {(floor===10) ? "마지막" : floor + 1}층으로 이동하기
      </Button>
    </div>
  );
}