import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function AdventureFeneral({ animal }) {
  const navigate = useNavigate();
  
  const handleClickExit = () => {
    navigate("/home");
  }

  useEffect(() => {
    axios.get(`http://192.249.18.138:443/api/animal/kill/${animal.id}`).then(
      res => (
        console.log(res)
      )
    )
  })
  
  console.log(animal)
  return (
    <div>
      <h1>장례식..</h1>
      <h2>user의 실력 미숙으로 인해 {animal.name}이(가) 죽었습니다</h2>
      <Button onClick={handleClickExit}>
        슬픈 마음으로 홈으로 돌아가기
      </Button>
    </div>
  );
}