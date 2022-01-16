import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../style/Register.css";

const API_BASE = process.env.REACT_APP_API_BASE;


export default function Register() {
  const navigate = useNavigate();
  const onRegister = (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const nick = e.target.nick.value;
    const pwd = e.target.pwd.value;
    axios.post(`${API_BASE}/user/register`,
    {
      id: id,
      nick: nick, 
      pwd: pwd
    })
    .then(res => {
      // console.log(res.data.status);
      if(res.data.status) {
        window.alert("모종의 이유로 회원가입에 실패했습니다.");
      }
      else {
        window.alert("회원가입에 성공하셨습니다. 가입하신 계정으로 로그인 해주세요.");
        navigate(`/`);
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="Register">
      <div className="Background">
        <div className="Title">REGISTER</div>
        <form className="LoginForm" onSubmit={onRegister}>
          <div className="LoginFormInput">
            <input className="LoginFormInputId" autoComplete="off" placeholder="id" name="id"></input>
            <input className="LoginFormInputId" autoComplete="off" placeholder="password" name="pwd"></input>
            <input className="LoginFormInputId" autoComplete="off" placeholder="nickname" name="nick"></input>
            <input autoComplete="off" placeholder="email"></input>
          </div>
          <input type="submit"></input>
        </form>
      </div>
    </div>
  );
}