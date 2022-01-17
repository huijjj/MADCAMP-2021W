import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../style/Funeral.css';

const API_BASE = process.env.REACT_APP_API_BASE;

export default function AdventureFeneral({ animal }) {
  const navigate = useNavigate();

  const handleClickExit = () => {
    navigate("/home");
  }

  useEffect(() => {
    const portraitBackground = document.getElementById("FuneralPortrait");
    console.log(portraitBackground);

    portraitBackground.style.backgroundImage = `url("images/${animal.type}.png")`;
  }, []);

  useEffect(() => {
    axios.delete(`${API_BASE}/animal/kill`, {
      data: {
        id: animal.id
      }
    }).then(res => (console.log(res)))});
  
  return (
    <div className="FuneralBack">
      <div className="Funeral">
        <div className="FuneralTitle">訃告</div>
        <div id="FuneralPortrait">
          <img src={`images/portrait.png`} />
        </div>
        <div className="FuneralBody">과음으로 인해 {animal.name}이(가) 사망했습니다</div>
        <Button style ={{fontFamily:'paybooc'}} onClick={handleClickExit}>
          슬픈 마음으로 홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}