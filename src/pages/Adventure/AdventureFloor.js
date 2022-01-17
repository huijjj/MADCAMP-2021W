import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

import '../../style/Floor.css'

const API_BASE = process.env.REACT_APP_API_BASE;

export default function AdventureFloor({ user, animal, stamina, floor, setIsInGame, staminaMAX }) {

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
      money: user.Money + ((floor < 5 && floor > 1) ? 10 : Math.pow(2,floor)/6-(Math.pow(2,floor)/6%5) + 20)
    }).then(
      res => console.log(res)
    );
    navigate("/home");

  };

  const handleClickDoor = () => {
    setIsInGame(true);
  }

  return (
    <div class="Floor">
      <div className="FloorHeader">
        <div style={{ marginTop: "40rem" }}>{floor}층</div>
        <div className="FloorCard">
          <Card sx={{ maxWidth: 300, backgroundColor: 'rgba( 255, 255, 255, 0.7 )'}}>
            <CardMedia 
              component="img"
              image={`/images/${animal.type}.png`}
              alt={`${animal.type}.png`}
            />
            <CardContent> 
              <Typography gutterBottom variant="h5" component="div">
                {animal.name}({animal.sex})
              </Typography>
              <Typography variant="body1" color="text.secondary">
                지: {animal.geee}<br/>
                덕: {animal.duck}<br/>
                체: {animal.chae}<br/>
              </Typography>
              <div className="FloorStamina">
                <progress 
                  id="animalStamina" 
                  max="1" 
                  value={stamina/staminaMAX}
                  style={{ width: "70%" }}
                >
                </progress>
                &nbsp;&nbsp;&nbsp;{stamina}/{staminaMAX}
              </div>
              
            </CardContent>
          </Card>
        </div>
        <Button onClick={handleClickExit} style={{ marginTop: "3rem" }} variant="contained" color="error" >포기하기</Button>
      </div>
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        <div className="FloorLeft" onClick={handleClickDoor}></div>
        <div className="FloorRight" onClick={handleClickDoor}></div>
      </div>
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
            포기하면 {(floor < 5 && floor > 1) ? 10 : Math.pow(2,floor)/6-(Math.pow(2,floor)/6%5) + 20}원을 얻을 수 있습니다
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