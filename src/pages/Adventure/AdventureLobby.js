import { useEffect, useState } from "react"
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

export default function AdventureLobby({ animalList, setIsLobby, setAnimal, setFloor, stamina, setStamina }) {
  const navigate = useNavigate();
  const [ animalIndex, setAnimalIndex ] = useState(Number(0));

  const [exitOpen, setExitOpen] = useState(false);

  const handleClickExit = (index) => {
    setAnimalIndex(index);
    setExitOpen(true);

  };

  const handleCloseNo = () => {

    setExitOpen(false);

  };

  const handleCloseYes = (animalIndex) => {

    setAnimal(animalList[animalIndex]);
    setStamina(stamina+animalList[animalIndex].chae);
    setFloor(1);
    setIsLobby(false);

    setExitOpen(false);
    

  };
  
  return (
    <div id = "adventure-lobby">
      <HomeIcon onClick={() => navigate(-1)} />
      { animalList?.map(
          (animal, index) =>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia 
                component="img"
                image={`/images/${animal.type.substr(0, 3)}/${animal.type.substr(3,1)}.jpg`}
                alt={`${animal.type}.jpg`}
              />
              <CardContent> 
                <Typography gutterBottom variant="h5" component="div">
                  {animal.name}, {animal.sex}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  지: {animal.geee}<br/>
                  덕: {animal.duck}<br/>
                  체: {animal.chae}<br/>
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleClickExit(index)}>
                참가하기
                </Button>

                <Dialog
                  open={exitOpen}
                  onClose={handleCloseNo}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {animalList[animalIndex].name}와(과) 함께 탐험을 시작 하시겠습니까?
                  </DialogTitle>

                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      탐험중에는 동물을 변경할 수 없습니다<br/>
                      (체력이 0 보다 낮아지면 동물이 죽을수도 있습니다)
                    </DialogContentText>
                  </DialogContent>

                  <DialogActions>
                    <Button onClick={handleCloseNo}>아니요</Button>
                    <Button onClick={() => handleCloseYes(animalIndex)}>네</Button>
                  </DialogActions>
                </Dialog>
              </CardActions>
            </Card>
        )
      }
      
    </div>  
  );
}