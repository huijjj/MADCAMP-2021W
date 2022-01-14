import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdventureRoomFinal from './AdventureRoomFinal';
import GameBar from './GameBar';

export default function AdventureRoomDrink({ floor, stamina, setStamina, setFloor, setIsInGame }) {
  const difficultyList = [
    {
      stamina: 100,
      speed: 1
    },
    {
      stamina: 100,
      speed: 1.2
    },
    {
      stamina: 100,
      speed: 1.4
    },
    {
      stamina: 150,
      speed: 1.4
    },
    {
      stamina: 150,
      speed: 1.6
    },
    {
      stamina: 170,
      speed: 1.7
    },
    {
      stamina: 200,
      speed: 1.8
    },
    {
      stamina: 220,
      speed: 2
    },
    {
      stamina: 250,
      speed: 2
    },
    {
      stamina: 300,
      speed: 2
    }
  ]

  const [hStamina, setHStamina] = useState(difficultyList[floor-1].stamina);
  

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
      <h3>
        현지 체력: {hStamina}
      </h3>
      <div>
        <GameBar speed={difficultyList[floor-1].speed } setHStamina={setHStamina}/>
      </div>
      <Button onClick={handleNext}>
        {(floor===10) ? "마지막" : floor + 1}층으로 이동하기
      </Button>
    </div>
  );
}