import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdventureRoomFinal from './AdventureRoomFinal';
import GameBar from './GameBar';

import "../../style/Drink.css"
import ProgressBar from './ProgressBar';

export default function AdventureRoomDrink({ animal, floor, stamina, setStamina, staminaMAX, setFloor, setIsInGame, setIsDrink }) {
  const difficultyList = [
    {
      stamina: 100,
      speed: 2
    },
    {
      stamina: 100,
      speed: 2.4
    },
    {
      stamina: 100,
      speed: 2.8
    },
    {
      stamina: 150,
      speed: 2.8
    },
    {
      stamina: 150,
      speed: 4
    },
    {
      stamina: 170,
      speed: 5
    },
    {
      stamina: 200,
      speed: 6
    },
    {
      stamina: 220,
      speed: 7
    },
    {
      stamina: 250,
      speed: 8
    },
    {
      stamina: 300,
      speed: 9
    }
  ]

  const [hStamina, setHStamina] = useState(difficultyList[floor-1].stamina);
  
  useEffect(() => {
    setIsDrink(true);
  }, []);

  const handleNext = () => {
    setFloor(floor+1);
    setIsInGame(false);
    setIsDrink(false);
  }

  // setIsDrink(true);
  
  return (
    <div className='DrinkBack'>
      <div className="Drink">
        <div className="DrinkImg">
          <img src="/images/hyunji.png" height="100%" />
        </div>
        <div className="DrinkGame">
          <div className='DrinkHyunji'>
            <ProgressBar  bgcolor="red" stamina={hStamina} staminaMAX={difficultyList[floor-1].stamina} />
          </div>
          
          <div>
            <GameBar speed={difficultyList[floor-1].speed * (1-animal.geee/600)} stamina={stamina} setStamina={setStamina} hStamina={hStamina} setHStamina={setHStamina}/>
          </div>

          <div className="DrinkMe">
            <ProgressBar bgcolor="blue" stamina={stamina} staminaMAX={staminaMAX} />
          </div>

          <>{
            (hStamina <= 0)
            ? <Button style ={{fontFamily:'paybooc'}} variant="contained" color="success" onClick={handleNext}>
              {`${(floor===10) ? "마지막" : floor + 1}층으로 이동하기`}
            </Button>
            : <></>
          }</>
        </div>
      </div>
    </div>
  );
}