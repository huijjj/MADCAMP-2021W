import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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


export default function AdventureFloor({ animal, stamina, floor, setIsInGame}) {

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
          image={`/images/${animal.type.substr(0, 3)}/${animal.type.substr(3,1)}.jpg`}
          alt={`${animal.type}.jpg`}
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
          {"탐험을 중도에 포기하시겠습니까?"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
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