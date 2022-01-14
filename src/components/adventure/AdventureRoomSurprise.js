import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import AdventureRoomFinal from './AdventureRoomFinal';

export default function AdventureRoomSurprise({ floor, stamina, setStamina, setFloor, setIsInGame }) {
  
  const handleNext = () => {
    setFloor(floor+1);
    setStamina(stamina+30);
    setIsInGame(false);
  }
  
  return (
    <div>
      <h1>선물입니다!</h1>
      <h3>HP 30을 회복합니다</h3>
      <Button onClick={handleNext}>
        {(floor===10) ? "마지막" : floor + 1}층으로 이동하기
      </Button>
    </div>
  );
}