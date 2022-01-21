import { React, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Main from './Main';
import Home from './Home';

function Routers() {
    const [userId, setUserId] = useState("");
    const [userNickname, setUserNickname] = useState("");

    return(
        <div>
            <Routes>
                <Route path = '/' element={<Main/>} />
                <Route path = '/register' element={<Register/>} />
                <Route path = '/login' element={<Login setUserId={setUserId} setUserNickname={setUserNickname}/>} />
                <Route path = '/home/:id' element={<Home userId={userId} userNickname={userNickname}/>} />
            </Routes>
        </div>
    )
}

export default Routers;