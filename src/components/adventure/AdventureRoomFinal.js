import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import '../../style/Final.css'

const jangList = shuffleArray([
  "인류의 모든 성과는 시행착오로부터 이루어졌다",
  "나는 여러분의 롤모델 아냐",
  "질문에 답할 권리는 나에게 있다",
  "스타트업의 성공은 비정형적이다",
  "스타트업의 평균은 실패다"
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

        axios.put(`${API_BASE}/user/money/${user.id}`, {
          money: user.Money + 300
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
    <div className="AdventureFinal">
      <div className="AdventureFinalBackground">
        <div className="FinalTitle">마지막 층</div>
        <div className="FinalImage">
          <img src={"images/장병규.png"} width={292} height={385} alt="장병규.png" />
          <div className="FinalSpeechBubble">
            <div class="FinalQuiz">
              <em>{question}</em><br/>
            </div>
          </div>
        </div>
        <div class="FinalInput">
          { !isFinish && 
            <>
            <form style={{display: "flex"}} onSubmit={onSubmit}>
              <div>
                <TextField inputProps={{style: {fontFamily:'paybooc'}}} InputLabelProps={{style: {fontFamily:'paybooc'}}} label="ANSWER" style={{ width: "100%", style: {fontFamily:'paybooc'} }} size="small" autoComplete="off" name="finalAnswer"/>
              </div>
              <input style ={{ marginLeft: "0.5rem",padding: "0.3rem", borderRadius: "0.3rem", border: "none", backgroundColor: "rgb(255, 192, 203)", fontFamily:'paybooc'}} type="submit" value="입력" />
            </form>
            </>
          }
          { isFinish &&
              <>
                장병규를 이겼습니다!<br/>
                <Button style ={{fontFamily:'paybooc'}} onClick={handleNext}>
                  탐험을 끝냅니다
                </Button>
              </>
          }
        </div>
      </div>
    </div>
  );
}

// 다있 게에나 는리권 할답 에문질
// 다졌어루이 터부로오착행시 는과성 든모 의류인
// 다니집해듯따 면치 를수박
// 냐아 델모롤 의분러여 는나
// 다니아 이반위 칙수역방 에문때 기있져어떨 히분충 도어벗 를크스마 는서에위상단