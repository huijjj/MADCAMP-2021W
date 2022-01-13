import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


export default function AdventureFloor({ floor, setIsInGame}) {

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
    navigate("/");

  };

  const handleClickDoor = () => {
    setIsInGame(true);
  }

  return (
    <div>
      <h1>
        {(floor === 11)
        ? "마지막 층" 
        : floor}
      </h1>

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