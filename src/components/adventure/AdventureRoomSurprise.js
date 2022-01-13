import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import AdventureRoomFinal from './AdventureRoomFinal';

export default function AdventureRoomSurprise({ floor, setFloor, setIsInGame }) {
  
  const handleNext = () => {
    setFloor(floor+1);
    setIsInGame(false);
  }
  
  return (
    <div>
      <h1>
        짜잔
      </h1>
      <Button onClick={handleNext}>
        {(floor===10) ? "마지막" : floor + 1}층으로 이동하기
      </Button>
    </div>
  );
}