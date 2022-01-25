import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';


import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function Login() {
    const nav = useNavigate();
    const [ title, setTitle ] = useState("");
    const [ login, setLogin ] = useState(false);
    const [ show, setShow ] = useState(false);
    const [ nickname, setNickname ] = useState("");
    const [ userId, setUserId ] = useState("");

    function handleClick(e) {
        e.preventDefault();
        
        // console.log('e : ', e);
        // console.log('id : ', e.target.id.value);
        // console.log('pw : ', e.target.pw.value);

        var json = {id: e.target.id.value, password: e.target.pw.value};

        axios.post('http://192.249.18.176:443/login', json).then( res => {
            if(res.status === 200){
                console.log(res.data);
                console.log(res.data.nickname);

                setUserId(e.target.id.value);
                setNickname(res.data.nickname);
                setTitle(`환영합니다 ${res.data.nickname}님!`);
                setLogin(true);
                setShow(true);
                // nav(`/home/${e.target.id.value}`, {state: {nickname: res.data.nickname}});
                // window.alert(`환영합니다 ${res.data.nickname}님!`);
            }
        }).catch((e) => {
            console.log(e);
            setTitle(`아이디와 비밀번호를 다시 확인해주세요.`);
            setShow(true);
            setLogin(false);
            // window.alert('아이디와 비밀번호를 다시 확인해주세요.');
        });

    }
    return (
    <div className='mainbackground'>
        <div style={{width: "35%", height:"40%"}} className='domainstructure'>
            <div className='domain' style={{paddingTop: "2%"}}>로그인</div>
            <div className='loginbody'>
                <form onSubmit={handleClick}>
                    <div className='loginparent'>
                        <div className='loginchild'> 
                            <div>
                                <input className='inputid' name="id" type = "text"  placeholder='Enter User ID' required/>
                            </div>
                            <div>
                                <input className='inputpw' name="pw" type = "password" placeholder='Enter Password' required/>
                            </div>
                        </div>
                        <button className='loginbutton' type="submit">시작</button>
                    </div>
                </form>
                <div className='registerlink' style={{marginTop: "2%"}}><a href="/register">아이디가 없으신가요?</a></div>
            </div>
        </div>

        <Dialog
            open={show}
            TransitionComponent={Transition}
            onClose={() => setShow(false)}>
            <DialogTitle>{title}</DialogTitle>
            <DialogActions>
                <Button onClick={(e) => {
                    e.preventDefault();
                    if(login) {
                        nav(`/home/${userId}`, {state: {nickname: nickname}});
                    } else {
                        setShow(false);
                    }
                }}>
                    확인
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    );
}

export default Login;