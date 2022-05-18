import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../style/Register.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

const API_BASE = process.env.REACT_APP_API_BASE;


export default function Register() {
  const [ alertOpen, setAlertOpen ] = useState(false);
  const [ alertTitle, setAlertTitle ] = useState("");
  const [ done, setDone ] = useState(false);
  const navigate = useNavigate();

  const onRegister = (e) => {
    e.preventDefault();
    // console.log(e.target);
    const id = e.target.id.value;
    const nick = e.target.nick.value;
    const pwd = e.target.pwd.value;
    axios.post(`${API_BASE}/user/register`, {
      id: id,
      nick: nick, 
      pwd: pwd
    }).then(res => {
      // console.log(res.data.status);
      if(res.data.status) {
        setAlertOpen(true);
        setAlertTitle("모종의 이유로 회원가입에 실패했습니다.");
      }
      else {
        setAlertOpen(true);
        setAlertTitle(`회원가입에 성공하셨습니다.`);
        setDone(true);
      }
    }).catch(err => console.log(err));
  }

  return (
    <div className="Register">
      <div className="Background">
        <div className="Title">REGISTER</div>
        <form className="LoginForm" onSubmit={onRegister}>
          <div className="LoginFormInput">
            <TextField inputProps={{style: {fontFamily:'paybooc'}}} InputLabelProps={{style: {fontFamily:'paybooc'}}} label="ID" style={{ marginBottom: "0.6rem"}} autoComplete="off" size="small" name="id"/>
            <TextField inputProps={{style: {fontFamily:'paybooc'}}} InputLabelProps={{style: {fontFamily:'paybooc'}}} label="PASSWORD" style={{ marginBottom: "0.6rem"}} autoComplete="off" size="small" name="pwd"/>
            <TextField inputProps={{style: {fontFamily:'paybooc'}}} InputLabelProps={{style: {fontFamily:'paybooc'}}} label="NICKNAME" style={{ marginBottom: "0.6rem"}} autoComplete="off" size="small" name="nick"/>
            <TextField inputProps={{style: {fontFamily:'paybooc'}}} InputLabelProps={{style: {fontFamily:'paybooc'}}} label="E-MAIL" autoComplete="off" size="small"/>
          </div>
          <input type="submit" className="RegisterSubmitButton" variant="contained" value="REGISTER"></input>
        </form>
        <div className="RegisterButton" onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}>
          계정이 이미 있으신가요?
        </div>
      </div>
      <Dialog style ={{fontFamily:'paybooc'}} open={alertOpen}>
        <DialogTitle style={{ display: "flex", justifyContent: "center", fontFamily:'paybooc' }} >{alertTitle}</DialogTitle>
        <DialogActions style ={{fontFamily:'paybooc'}} >
          <Button style ={{fontFamily:'paybooc'}} onClick={() => {
            if(done) {
              navigate("/");
            }
            setAlertOpen(false);
          }}>확인</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}