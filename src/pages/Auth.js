import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Auth.css';

const API_BASE = process.env.REACT_APP_API_BASE;

export default function Auth({ getId }) {
  const navigate = useNavigate();

  const onClick = (target) => {
    navigate(`/${target}`);
  }

  const onLogin = (e) => {
    e.preventDefault();
    
    const id = e.target.id.value;
    const pwd = e.target.pwd.value;
    axios.post(`${API_BASE}/user/login`, {
      id: id, 
      pwd: pwd
    }).then(res => {
      // console.log(res.data.status);
      if(res.data.status) {
        window.alert("Login Failed");
      }
      else {
        getId(res.data[0].id);
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
            <input placeholder="id" className="LoginFormInputId" name="id"></input>
            <input placeholder="password" type="password" autoComplete="off" name="pwd"></input>
          </div>
          <input type="submit" value="Login"></input>
        </form>
        <div className="RegisterButton" onClick={(e) => {
          e.preventDefault();
          onClick("register");
        }}>
          계정이 없으신가요?
        </div>
      </div>
    </div>
  );
}