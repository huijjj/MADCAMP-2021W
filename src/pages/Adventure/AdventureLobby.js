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

export default function AdventureLobby({ setIsLobby, setAnimal }) {
  const navigate = useNavigate();
  const [ animalList, setAnimalList ] = useState([]);
  const [ animalIndex, setAnimalIndex ] = useState(Number(0));

  useEffect(() => {
    setAnimalList([
      {
        id: 1000000000,
        name: "기돌이",
        type: "김기영1",
        sex: "F",
        owner: 2000000000,
        adventureCount: 0,
        itemCount: 0,
        geee: 0,
        duck: 0,
        chae: 0,
        isCarbonCompound: false
      },
      {
        id: 1000000001,
        name: "기순이",
        type: "김기영2",
        sex: "M",
        owner: 2000000000,
        adventureCount: 3,
        itemCount: 10,
        geee: 40,
        duck: 20,
        chae: 70,
        isCarbonCompound: false
      },
      {
        id: 1000000002,
        name: "기똥이",
        type: "김기영3",
        sex: "F",
        owner: 2000000000,
        adventureCount: 5,
        itemCount: 20,
        geee: 20,
        duck: 80,
        chae: 120,
        isCarbonCompound: false
      },
      {
        id: 1000000003,
        name: "기뚱이",
        type: "김기영2",
        sex: "M",
        owner: 2000000000,
        adventureCount: 2,
        itemCount: 14,
        geee: 50,
        duck: 30,
        chae: 50,
        isCarbonCompound: false
      }
    ]);
  }, []);

  const [exitOpen, setExitOpen] = useState(false);

  const handleClickExit = (index) => {
    setAnimalIndex(index);
    setExitOpen(true);

  };

  const handleCloseNo = () => {

    setExitOpen(false);

  };

  const handleCloseYes = (index) => {

    setExitOpen(false);
    setAnimal(animalList[index]);
    setIsLobby(false);

  };

  return (
    <div id = "adventure-lobby">
      { animalList.map(
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
                    <Button onClick={() => handleCloseYes(index)}>네</Button>
                  </DialogActions>
                </Dialog>
              </CardActions>
            </Card>
        )
      }
      
    </div>  
  );
}