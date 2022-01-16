import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import TextField from '@mui/material/TextField';


export default function AdventureRoomFinal({ user, animal }) {
  const [isFinish, setIsFinish] = useState(false);
  const navigate = useNavigate();
  const API_BASE = process.env.REACT_APP_API_BASE;

  const jangList = [
    "인류의 모든 성과는 시행착오로부터 이루어졌다",
    "나는 여러분의 롤모델 아냐",
    "질문에 답할 권리는 나에게 있다",
    "박수를 치면 따듯해집니다",
    "단상위에서는 마스크를 벗어도 충분히 떨어져있기 때문에 방역수칙 위반이 아니다"
  ]
  
  const question = jangList[1];
  const answer = question.split("").reverse?.().join("");
  
  const handleNext = () => {
    navigate("/home")
  }
  console.log(animal);
  const onSubmit = (e) => {
    e.preventDefault();
    if (answer === e.target.finalAnswer.value){
      setIsFinish(true);
      axios.put(`${API_BASE}/animal/change/${animal.id}`, {
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
      <em>{question}</em><br/><br/>
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