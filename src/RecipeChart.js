import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ApexChart from 'react-apexcharts';
// import './RecipeChart.css';

function RecipeChart() {
    const API_BASE = "http://192.249.18.176:443";

    const nav = useNavigate();
    const loc = useLocation();
    // console.log(loc);
    const versions = loc.state.versions;

    const [ingredientList, setIngredientList] = useState([]);

    useEffect(() => {
        Promise.all(versions.map(e => axios.get(`${API_BASE}/recipe/version/${e.id}`)))
            .then(res => setIngredientList(res.map(el => {
                // console.log(el.data.ingredients);
                return el.data.ingredients;
            })))
            .catch(console.log);
    }, []);
    
    useEffect(() => {
        if(ingredientList.length) {
            
        }
    }, [ingredientList])
    
    // 만든 ingredient의 string array에서 반복문으로 그래프 만들기
    

    return (
        <>
            <div>hi</div>
            {ingredientList.map((e, i) => (
                e.map((el, id) => <div className='ingredientitem' key={`ingredient_${id}`}>{el.name} {el.amount}g</div>)
            ))}

            
        </>
    );
}

export default RecipeChart;