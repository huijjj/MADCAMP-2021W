import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      if(res.data.status)
      {
        window.alert("Register Fail");
      }
      else
      {
        window.alert("Register Success");
        navigate(`/`);
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
      <div>Register</div>
      <form onSubmit={onRegister}>
        <input name="id"></input>
        <input name="nick"></input>
        <input name="pwd"></input>
        <input type="submit"></input>
      </form>
    </div>
  );
}