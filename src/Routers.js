import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Main from './Main';
import Home from './Home';
import RecipeAdd from './RecipeAdd';
import RecipeDetail from './RecipeDetail';
import RecipeChart from './RecipeChart';

function Routers() {

    return(
        <Routes>
            <Route path = '/' element={<Main />} />
            <Route path = '/register' element={<Register />} />
            <Route path = '/login' element={<Login />} />
            <Route path = '/home/:userId' element={<Home />} />
            <Route path = '/recipe/add/:userId' element={<RecipeAdd />} />
            <Route path = '/:userId/:recipe' element={<RecipeDetail />} />
            <Route path = '/:userId/:recipe/chart' element={<RecipeChart />} />
        </Routes>
    );
}

export default Routers;