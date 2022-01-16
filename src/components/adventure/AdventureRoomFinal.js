import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import TextField from '@mui/material/TextField';

const jangList = shuffleArray([
  "인류의 모든 성과는 시행착오로부터 이루어졌다",
  "나는 여러분의 롤모델 아냐",
  "질문에 답할 권리는 나에게 있다",
  "박수를 치면 따듯해집니다",
  "단상위에서는 마스크를 벗어도 충분히 떨어져있기 때문에 방역수칙 위반이 아니다"
]);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


export default function AdventureRoomFinal({ user, animal, setStamina }) {
  const [isFinish, setIsFinish] = useState(false);
  const [numAnswer, setNumAnswer] = useState(Number(1));
  const navigate = useNavigate();
  const API_BASE = process.env.REACT_APP_API_BASE;

  
  const question = jangList[numAnswer];
  const answer = question.split("").reverse?.().join("");
  
  const handleNext = () => {
    navigate("/home");
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (answer === e.target.finalAnswer.value){
      e.target.finalAnswer.value = "";
      setNumAnswer(numAnswer+1);
      if (numAnswer === 3) {
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
    else {
      setStamina(0);
    }
  }
  
  return (
    <div>
      <h1>
        마지막 층
      </h1>
      <img src={"images/장병규.jpeg"} width={292} height={385} /><br/>
      { !isFinish && 
        <>
        <em>{question}</em><br/><br/>
        <form onSubmit={onSubmit}>
          <input name="finalAnswer" autoComplete="off"/>
          <input type="submit" value="확인" />
        </form>
        </>
      }
      { isFinish &&
          <>
            장병규를 이겼습니다!<br/>
            <Button onClick={handleNext}>
              탐험을 끝냅니다
            </Button>
          </>
      }
    </div>
  );
}

// 다있 게에나 는리권 할답 에문질
// 다졌어루이 터부로오착행시 는과성 든모 의류인
// 다니집해듯따 면치 를수박
// 냐아 델모롤 의분러여 는나