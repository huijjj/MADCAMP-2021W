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
    <div class="Floor">
      <div className="FloorHeader">
        {floor}층
      </div>
      <div className="FloorBody">
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

        <div className="FloorDoors">
          <div className="FloorDoor">
            <img src="/images/door.png" width="400" height="400" onClick={handleClickDoor}/>
            <img src="/images/door.png" width="400" height="400" onClick={handleClickDoor}/><br/>
          </div>
          <div className="FloorExit">
            <Button variant="contained" color="error" onClick={handleClickExit}>포기하기</Button>
          </div>
        </div>  
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