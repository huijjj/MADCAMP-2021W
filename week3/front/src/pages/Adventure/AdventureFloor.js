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
import ProgressBarLobby from '../../components/adventure/ProgressBarLobby'

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
    let money;
    setExitOpen(false);
    if(floor == 1)
    {
      money = 0;
    }
    else
    {
      money = ((floor < 5 && floor > 1) ? 10 : Math.pow(2,floor)/6-(Math.pow(2,floor)/6%5) + 20);
    }
    axios.put(`${API_BASE}/user/money/${user.id}`, {
      money: user.Money + money
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
          <Card style ={{fontFamily:'paybooc'}} sx={{ maxWidth: "20rem", maxHeight: "40rem", backgroundColor: 'rgba( 0, 0, 0, 0.7 )'}}>
            <CardMedia style ={{fontFamily:'paybooc'}}
              component="img"
              image={`/images/${animal.type}.png`}
              alt={`${animal.type}.png`}
            />
            <CardContent style ={{fontFamily:'paybooc'}}> 
              <Typography gutterBottom variant="h5" component="div" color="common.white">
                {animal.name}({animal.sex})
              </Typography>
              <Typography variant="body1" color="common.white">
                <ProgressBarLobby style ={{fontFamily:'paybooc'}} bgcolor="orange" type={"지"} stamina={animal.geee} staminaMAX={300} /><br/>
                <ProgressBarLobby style ={{fontFamily:'paybooc'}} bgcolor="green" type={"덕"} stamina={animal.duck} staminaMAX={300} /><br/>
                <ProgressBarLobby style ={{fontFamily:'paybooc'}} bgcolor="red" type={"체"} stamina={animal.chae} staminaMAX={300} /><br/>
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
        <Button onClick={handleClickExit} style={{ marginTop: "3rem", fontFamily:'paybooc' }} variant="contained" color="error" >포기하기</Button>
      </div>
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        <div className="FloorLeft" onClick={handleClickDoor}></div>
        <div className="FloorRight" onClick={handleClickDoor}></div>
      </div>
      <Dialog style ={{fontFamily:'paybooc'}}
        open={exitOpen}
        onClose={handleCloseNo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style ={{fontFamily:'paybooc'}} id="alert-dialog-title">
          탐험을 중도에 포기하시겠습니까?
        </DialogTitle>

        <DialogContent style ={{fontFamily:'paybooc'}} >
          <DialogContentText style ={{fontFamily:'paybooc'}} id="alert-dialog-description">
            포기하면 {(floor < 5) ? (floor == 1 ? 0 : 10) : Math.pow(2,floor)/6-(Math.pow(2,floor)/6%5) + 20}원을 얻을 수 있습니다
          </DialogContentText>
        </DialogContent>

        <DialogActions style ={{fontFamily:'paybooc'}} >
          <Button style ={{fontFamily:'paybooc'}} onClick={handleCloseNo}>아니요</Button>
          <Button style ={{fontFamily:'paybooc'}} onClick={handleCloseYes}>네</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}