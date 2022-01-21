import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login( {getId} ) {
    const nav = useNavigate();
    function handleClick(e) {
        e.preventDefault();
        var json = {id: e.target.id.value, password: e.target.pw.value};

        axios.post('http://192.249.18.176:443/login', json).then( res => {
            console.log(`res.data`, res)
            if(res.status === 200){
                nav('/home');
                window.alert('로그인 성공!');
            }
        }).catch((e) => {
            console.log(e);
            window.alert('아이디와 비밀번호를 다시 확인해주세요.');
        });

    }
    return (
    <>
        <div className='domain'>로그인</div>
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
            <div className='registerlink'><a href="/register">아이디가 없으신가요?</a></div>
        </div>
    </>
    );
}

export default Login;