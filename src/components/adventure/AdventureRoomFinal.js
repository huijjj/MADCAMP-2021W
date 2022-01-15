import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import TextField from '@mui/material/TextField';


export default function AdventureRoomFinal({ user, animal }) {
  const [isFinish, setIsFinish] = useState(false);
  const navigate = useNavigate();
  const API_BASE = process.env.REACT_APP_API_BASE;

  const answer = "다졌어루이 터부로오착행시 는과성 든모 의류인";
  
  const handleNext = () => {
    navigate("/home")
  }
  console.log(animal);
  const onSubmit = (e) => {
    e.preventDefault();
    if (answer === e.target.finalAnswer.value){
      setIsFinish(true);
      axios.get(`${API_BASE}/animal/change/${animal.id}`, {
        geee: 30,
        duck: 30,
        chae: 30,
        adventureCount: 1,
        itemCount: 0
      }).then(
        res => console.log(res)
      );
      axios.put(`${API_BASE}/user/money/${user.id}`, {
        money: user.Money + 1000
      }).then(
        res => console.log(res)
      );
    }
  }
  
  return (
    <div>
      <h1>
        마지막 층
      </h1>
      <img src={"images/장병규.jpeg"} width={292} height={385} /><br/>
      <em>"인류의 모든 성과는 시행착오로부터 이루어졌다."</em><br/><br/>
      <form onSubmit={onSubmit}>
        <input name="finalAnswer" autoComplete="off"/>
        <input type="submit" value="확인" />
      </form>
      { (isFinish &&
          <Button onClick={handleNext}>
            탐험을 끝냅니다
          </Button>)
      }
    </div>
  );
}