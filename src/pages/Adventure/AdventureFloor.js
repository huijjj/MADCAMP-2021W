import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia } from "@mui/material";
import StaminaBar from "../../components/adventure/StaminaBar";


const API_BASE = process.env.REACT_APP_API_BASE;

export default function AdventureFloor({ user, animal, stamina, floor, setIsInGame}) {

  const navigate = useNavigate();

  const [exitOpen, setExitOpen] = useState(false);

  const handleClickExit = () => {

    setExitOpen(true);

  };

  const handleCloseNo = () => {

    setExitOpen(false);

  };

  const handleCloseYes = () => {

    setExitOpen(false);
    axios.put(`${API_BASE}/user/money/${user.id}`, {
      money: user.Money + floor*10
    }).then(
      res => console.log(res)
    );
    navigate("/home");

  };

  const handleClickDoor = () => {
    setIsInGame(true);
  }

  return (
    <div>
      <h1>
        {(floor === 11)
        ? "마지막 층" 
        : `${floor}층`}
      </h1>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia 
          component="img"
          image={`/images/${animal.type}.png`}
          alt={`${animal.type}.png`}
        />
        <CardContent> 
          <Typography gutterBottom variant="h5" component="div">
            {animal.name}, {animal.sex}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {/* HP: {stamina} */}
          </Typography>
          <StaminaBar stamina={stamina} />
        </CardContent>
      </Card>
      

      <Button onClick={handleClickDoor}>
        왼쪽 문
      </Button>

      <Button onClick={handleClickDoor}>
        오른쪽 문
      </Button>

      <Button onClick={handleClickExit}>
        포기하기
      </Button>

      <Dialog
        open={exitOpen}
        onClose={handleCloseNo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          탐험을 중도에 포기하시겠습니까?
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            포기하면 {floor*10}원을 얻을 수 있습니다
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseNo}>아니요</Button>
          <Button onClick={handleCloseYes}>네</Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}