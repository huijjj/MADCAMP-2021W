import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';


export default function AdventureFloor() {
    const thisFloor= useParams();
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
      navigate(`../floor/${thisFloor.floor}/room`);
    }

    return (
      <div>
        <div onClick={handleClickDoor}>
          왼쪽 문
        </div>
        <div onClick={handleClickDoor}>
          오른쪽 문
        </div>
        <div onClick={handleClickExit}>
          포기하기
        </div>
        <Dialog
          exitOpen={exitOpen}
          onClose={handleCloseNo}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"탐험을 중도에 포기하시겠습니까?"}
          </DialogTitle>
          {/* <DialogContent>
            <DialogContentText id="alert-dialog-description">
              
            </DialogContentText>
          </DialogContent> */}
          <DialogActions>
            <Button onClick={handleCloseNo}>아니요</Button>
            <Button onClick={handleCloseYes}>네</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }