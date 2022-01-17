import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia } from "@mui/material";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Slide from '@mui/material/Slide';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import '../../style/Lobby.css';
import '../../style/MyFarm.css';
import ProgressBarLobby from '../../components/adventure/ProgressBarLobby';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AdventureLobby({ animal, animalList, setIsLobby, setAnimal, setFloor, stamina, setStamina, setStaminaMAX }) {
  const navigate = useNavigate();
  const [ animalIndex, setAnimalIndex ] = useState(Number(0));

  const [exitOpen, setExitOpen] = useState(false);

  const handleClickExit = (index) => {
    setAnimal(animalList[index]);
    setExitOpen(true);
  };

  const handleCloseNo = () => {
    setExitOpen(false);
  };

  const handleCloseYes = () => {
    setAnimal(animal);
    setStamina(stamina+animal.chae);
    setStaminaMAX(200+animal.chae);
    setFloor(1);
    setIsLobby(false);
    setExitOpen(false);
  };
  
  return (
    <div className="Lobby">
      <div className="LobbyAnimalGrid">
        <Grid style={{ width: "80%", marginTop: "3%" }} container spacing={2}>{
          animalList?.map((animal, index) =>
          <Grid item xs={4}>
              <div className="LobbyCard">
                <Card key={index} sx={{ backgroundColor: 'rgba( 0, 0, 0, 0.7 )'}}>
                  <CardMedia 
                    component="img"
                    image={`/images/${animal.type}.png`}
                    alt={`${animal.type}.png`}
                    onClick={() => handleClickExit(index)} />
                  <CardContent> 
                    <Typography gutterBottom variant="h5" component="div" color="common.white">
                      {animal.name}({animal.sex})
                    </Typography>
                    <Typography variant="body1" color="common.white">
                      <ProgressBarLobby bgcolor="orange" type={"지"} stamina={animal.geee} staminaMAX={300} /><br/>
                      <ProgressBarLobby bgcolor="green" type={"덕"} stamina={animal.duck} staminaMAX={300} /><br/>
                      <ProgressBarLobby bgcolor="red" type={"체"} stamina={animal.chae} staminaMAX={300} />
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </Grid>)}
        </Grid>
      <HomeIcon className="HomeButton" sx={{ fontSize: 80 }} onClick={() => navigate(-1)} />
      </div>
      <Dialog
        open={exitOpen}
        onClose={handleCloseNo}
        TransitionComponent={Transition} >
        <DialogTitle>{animal?.name}와(과) 함께 탐험을 시작 하시겠습니까?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            탐험중에는 동물을 변경할 수 없습니다<br/>
            (체력이 0 보다 낮아지면 동물이 죽을 수도 있습니다)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNo}>아니요</Button>
          <Button onClick={() => handleCloseYes()}>네</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}




// animalList?.map((animal, index) =>
//                 <div className="LobbyCard">
//                   <Card key={index} sx={{ backgroundColor: 'rgba( 0, 0, 0, 0.7 )'}}>
//                     <CardMedia 
//                       component="img"
//                       image={`/images/${animal.type}.png`}
//                       alt={`${animal.type}.png`}
//                       onClick={() => handleClickExit(index)}
//                     />
//                     <CardContent> 
//                       <Typography gutterBottom variant="h5" component="div" color="common.white">
//                         {animal.name}({animal.sex})
//                       </Typography>
//                       <Typography variant="body1" color="common.white">
//                           <ProgressBarLobby bgcolor="orange" type={"지"} stamina={animal.geee} staminaMAX={300} /><br/>
//                           <ProgressBarLobby bgcolor="green" type={"덕"} stamina={animal.duck} staminaMAX={300} /><br/>
//                           <ProgressBarLobby bgcolor="red" type={"체"} stamina={animal.chae} staminaMAX={300} /><br/>
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </div>
//           )