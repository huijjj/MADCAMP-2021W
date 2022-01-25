import axios from 'axios';
import React from 'react';
import {useNavigate} from "react-router-dom"
import './Register.css';

function Register() {
    const nav = useNavigate()

	function handleClick(e) {
		e.preventDefault();

		// console.log('id : ', e.target.id.value);
        // console.log('pw : ', e.target.pw.value);
        // console.log('rpw : ', e.target.rpw.value);
        // console.log('nn : ', e.target.nickname.value);

        if(e.target.pw.value !== e.target.rpw.value){
            window.alert('비밀번호가 틀립니다.');
        }
        else{
            var json = {id: e.target.id.value, password: e.target.pw.value, nickname: e.target.nickname.value};
		    axios.post('http://192.249.18.176:443/register', json).then((res) =>{
                console.log(res.data);
                nav("/login", {id: e.target.id.value, password: e.target.pw.value, nickname: e.target.nickname.value});
            }).catch((e) =>{
                console.log(e);
                window.alert('중복된 아이디입니다. 다른 아이디를 사용해주세요.');
            });
        }
  }
  return (
    <div className='mainbackground'>
        <div style={{width: "35%", height:"45%"}} className='domainstructure'>
            <div className='registerdomain'>회원가입</div>
            <div className='registerbody'>
                <form onSubmit={handleClick}>
                    <div className='registerparent'>
                        <div className='registerchild'> 
                            <div>
                                <input className='inputid' name="id" type = "text"  placeholder='Enter User ID' required/>
                            </div>
                            <div>
                                <input className='inputid' name="pw" type = "password" placeholder='Enter Password' required/>
                            </div>
                            <div>
                                <input className='inputid' name="rpw" type = "password" placeholder='Enter Password Again' required/>
                            </div>
                            <div>
                                <input className='inputpw' name="nickname" type = "text" placeholder='Enter User Nickname' required/>
                            </div>
                        </div>
                        <button className = "registerbutton" type='submit' >회원가입</button>
                    </div>
                </form>
                <div className='loginlink' style={{paddingTop: "30px"}}><a href='/login'>기존 회원이신가요?</a></div>
            </div>
        </div>
    </div>
    );
}

export default Register;