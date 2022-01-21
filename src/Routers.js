import { React, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Main from './Main';
import Home from './Home';
import RecipeAdd from './RecipeAdd';

function Routers() {
    const [userId, setUserId] = useState("");
    const [userNickname, setUserNickname] = useState("");

    return(
        <div>
            <Routes>
                <Route path = '/' element={<Main/>} />
                <Route path = '/register' element={<Register/>} />
                <Route path = '/login' element={<Login setUserId={setUserId} setUserNickname={setUserNickname} />} />
                <Route path = '/home/:id' element={<Home userId={userId} userNickname={userNickname} />} />
                <Route path = '/recipe/add/:userId' element={<RecipeAdd />} />
            </Routes>
        </div>
    )
}

export default Routers;