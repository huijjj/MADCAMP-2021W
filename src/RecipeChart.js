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
            console.log(ingredientList);
            console.log(ingredientList.length); // version의 개수
            console.log(ingredientList[0].length); // 첫 version에 있는 ingredient의 개수
            console.log(ingredientList[0][0].name); // 첫 version의 첫 ingredient의 이름
            
            let ingredientname = [];
            for(var i=0; i<ingredientList.length; i++){ // i : 각 version
                for(var j=0; j<ingredientList[i].length; j++){ // j: 각 version에 들어있는 ingredient의 개수
                    if(j=0){
                        ingredientname.push(ingredientList[0][0].name);
                    }
                    for(var k=0; k<ingredientname.length; k++){
                        while(ingredientList[k][j].name != ingredientname[k]){
                            ingredientname.push(ingredientList[k][j].name);
                        }
                    }
                }
            }
            console.log(ingredientname);
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