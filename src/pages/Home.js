import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';

import "../style/Home.css";

const API_BASE = process.env.REACT_APP_API_BASE;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const tier = ['학사', '석사', '박사', '포닥', '교수'];

function Home({ userId, setUserId }) {
  const navigate = useNavigate();
  const [ profileOpen, setProfileOpen ] = useState(false);
  const [ userInfo , setUserInfo ] = useState({});
  const [ animal, setAnimal ] = useState("");

  const onProfileClick = (e) => {
    e.preventDefault();
    setProfileOpen(true);
  }

  const onProfileClose = (e) => {
    e.preventDefault();
    setProfileOpen(false);
  }

  const onClick = (target) => {
    navigate(`/${target}`);
  }
  
  useEffect(() => {
    setUserId(window.sessionStorage.getItem('id'));
    console.log(window.sessionStorage.getItem('id'));
    console.log('진입띠');
    axios.get(`${API_BASE}/user/show/${userId}`).then(res => {
      axios.get(`${API_BASE}/animal/owner/${res.data[0].id}`).then(res => {
        console.log(res.data);
        setAnimal(res.data.length ? res.data[0].type : "");
      });
      setUserInfo({
        id: res.data[0].id,
        nickname: res.data[0].nick,
        tier: tier[res.data[0].tier],
        money: res.data[0].Money,
        graduateCnt : res.data[0].graduateCount
      });
    }).catch(err => console.log(err));
  }, [userId]);
  
  return (
    <div className="Home">
      <AccountCircleIcon
        sx={{ fontSize: 80 }}
        className="HomeProfileIcon" 
        onClick={onProfileClick} />
      <Dialog
        open={profileOpen}
        onClose={onProfileClose}
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description" >
        <div className="HomeUserStatus">
          <div className="HomeUserStatusClose">
            <CloseIcon onClick={onProfileClose}/>
          </div>
          {animal ? <img className="HomeUserStatusImg" src={`/images/${animal}.png`}/> : <></>}
          <div className="HomeUserStatusNick">{userInfo.nickname}</div>
          <div className="HomeUserStatusOther">
            <div className="HomeUserStatusOtherStat">
              <div> <img src={`/images/icons/graduationCap.png`} style={{height: "2rem", width: "2rem", objectFit: "cover", marginRight: "5px"}} /></div>
              <div>{userInfo.tier}</div>
            </div>
            <div className="HomeUserStatusOtherStat">
              <div> <img src={`/images/icons/money.png`} style={{height: "2rem", width: "2rem", objectFit: "cover", marginRight: "5px"}} /></div>
              <div>{userInfo.money}원</div>
            </div>
            <div className="HomeUserStatusOtherStat">
              <div>졸업시킨 학생 수: &nbsp;&nbsp;</div>
              <div>{userInfo.graduateCnt}</div>
            </div>
          </div>
        </div>
      </Dialog>
      <div className="HomeRow">
        <div className="HomeItem1"></div>
        <div className="HomeItem2"></div>
        <div className="HomeItem3"></div>
        <div className="HomeItem4"></div>
        <div className="HomeItem5"></div>
        <div className="HomeItem6"></div>
        <div className="HomeItem7"></div>
        <div className="HomeItem8"></div>
        <div className="HomeItem9"></div>
        <div className="HomeItem10"></div>
        <div className="HomeItem11"></div>
      </div>
      <div className="HomeRow">
        <div className="HomeItem12"></div>
        <div className="HomeItem13"></div>
        <div className="HomeItem14"></div>
        <div className="HomeItem15"></div>
        <div className="HomeItem16" onClick={e => {
          e.preventDefault();
          onClick("animalshop");
        }}></div>
        <div className="HomeItem17"></div>
        <div className="HomeItem18"></div>
        <div className="HomeItem19"></div>
        <div className="HomeItem20"></div>
        <div className="HomeItem21"></div>
        <div className="HomeItem22"></div>   
      </div>
      <div className="HomeRow">
        <div className="HomeItem23"></div>
        <div className="HomeItem24"></div>
        <div className="HomeItem25"></div>
        <div className="HomeItem26"></div>
        <div className="HomeItem27"></div>
        <div className="HomeItem28"></div>
        <div className="HomeItem29"></div>
        <div className="HomeItem30"></div>
        <div className="HomeItem31" onClick={e => {
          e.preventDefault();
          onClick("myfarm");
        }}></div>
        <div className="HomeItem32"></div>
        <div className="HomeItem33"></div>   
      </div>
      <div className="HomeRow">
        <div className="HomeItem34"></div>
        <div className="HomeItem35"></div>
        <div className="HomeItem36" onClick={e => {
          e.preventDefault();
          onClick("adventure");
        }}></div>
        <div className="HomeItem37"></div>
        <div className="HomeItem38"></div>
        <div className="HomeItem39"></div>
        <div className="HomeItem40"></div>
        <div className="HomeItem41"></div>
        <div className="HomeItem42"></div>
        <div className="HomeItem43"></div>
        <div className="HomeItem44"></div>   
      </div>
      <div className="HomeRow">
        <div className="HomeItem45"></div>
        <div className="HomeItem46"></div>
        <div className="HomeItem47"></div>
        <div className="HomeItem48"></div>
        <div className="HomeItem49"></div>
        <div className="HomeItem50"></div>
        <div className="HomeItem51"></div>
        <div className="HomeItem52" onClick={e => {
          e.preventDefault();
          onClick("itemshop");
        }}></div>
        <div className="HomeItem53"></div>
        <div className="HomeItem54"></div>
        <div className="HomeItem55"></div>   
      </div>
      <div className="HomeRow">
        <div className="HomeItem56"></div>
        <div className="HomeItem57"></div>
        <div className="HomeItem58"></div>
        <div className="HomeItem59"></div>
        <div className="HomeItem60"></div>
        <div className="HomeItem61"></div>
        <div className="HomeItem62"></div>
        <div className="HomeItem63"></div>
        <div className="HomeItem64"></div>
        <div className="HomeItem65"></div>
        <div className="HomeItem66"></div>   
      </div>
      <div className="HomeRow">
        <div className="HomeItem67"></div>
        <div className="HomeItem68"></div>
        <div className="HomeItem69"></div>
        <div className="HomeItem70"></div>
        <div className="HomeItem71"></div>
        <div className="HomeItem72"></div>
        <div className="HomeItem73"></div>
        <div className="HomeItem74"></div>
        <div className="HomeItem75"></div>
        <div className="HomeItem76"></div>
        <div className="HomeItem77"></div>   
      </div>
    </div>
  );
};

export default Home;