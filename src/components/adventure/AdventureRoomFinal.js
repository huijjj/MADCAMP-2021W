import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';

export default function AdventureRoomFinal() {
  const navigate = useNavigate();
  
  const handleNext = () => {
    navigate("/")
  }
  
  return (
    <div>
      <h1>
        VS 장병규
      </h1>
      <Button onClick={handleNext}>
        탐험을 끝냅니다
      </Button>
    </div>
  );
}