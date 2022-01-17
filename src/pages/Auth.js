import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useState } from 'react';

import '../style/Auth.css';

const API_BASE = process.env.REACT_APP_API_BASE;

export default function Auth({ getId }) {
  const navigate = useNavigate();
  const [ alertOpen, setAlertOpen ] = useState(false);

  const onClick = (target) => {
    navigate(`/${target}`);
  }

  const onLogin = (e) => {
    e.preventDefault();
    // console.log(e.target);
    const id = e.target.id.value;
    const pwd = e.target.pwd.value;

    axios.post(`${API_BASE}/user/login`, {
      id: id, 
      pwd: pwd
    }).then(res => {
      // console.log(res.data.status);
      if(res.data.status) {
        setAlertOpen(true);
      }
      else {
        getId(res.data[0].id);
        window.sessionStorage.setItem('id', res.data[0].id);
        console.log(window.sessionStorage.getItem('id'));
        navigate(`/home`);
      }
    }).catch(err => console.log(err));
  }

  return (
    <div className="Auth">
      <div className="Background">
        <div className="Title">DRUNKEN FARM</div>
        <form className="LoginForm" onSubmit={onLogin}>
          <div className="LoginFormInput">
            <TextField label="ID" style={{ marginBottom: "0.6rem", width: "100%" }} autoComplete="off" size="small" name="id"/>
            <TextField label="PASSWORD" style={{ width: "100%" }} type="password" size="small" autoComplete="off" name="pwd"/>
          </div>
          <input className="SubmitButton" type="submit" value="LOGIN"/>
        </form>
        <div className="RegisterButton" onClick={(e) => {
          e.preventDefault();
          onClick("register");
        }}>
          계정이 없으신가요?
        </div>
      </div>
      <Dialog open={alertOpen}>
        <DialogTitle style={{ display: "flex", justifyContent: "center" }} >로그인에 실패했습니다.</DialogTitle>
        <DialogActions>
          <Button onClick={() => {
            setAlertOpen(false);
          }}>확인</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}