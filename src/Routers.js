import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Main from './Main';
import Home from './Home';

function Routers() {
    return(
        <div>
            <Routes>
                <Route path = '/' element={<Main/>} />
                <Route path = '/login' element={<Login/>} />
                <Route path = '/register' element={<Register/>} />
                <Route path = '/home' element={<Home/>} />
            </Routes>
        </div>
    )
}

export default Routers;