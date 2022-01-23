import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Chart from 'react-apexcharts';
// import './RecipeChart.css';

function RecipeChart() {
    const API_BASE = "http://192.249.18.176:443";

    const nav = useNavigate();
    const loc = useLocation();
    const versions = loc.state.versions;

    const [ingredientList, setIngredientList] = useState([]);
    const [chartOption, setChartOption] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        Promise.all(versions.map(e => axios.get(`${API_BASE}/recipe/version/${e.id}`)))
            .then(res => {
                setIngredientList(res.map(el => {
                    // console.log(el.data.ingredients);
                    return el.data.ingredients;
                }))
                setLoading(true);
            })
            .catch(console.log);
    }, []);

    useEffect(() => {
        let ingredientName = [];
        if(ingredientList.length) {
            // console.log(ingredientList);
            // console.log(ingredientList.length); // version의 개수
            // console.log(ingredientList[0].length); // 첫 version에 있는 ingredient의 개수
            // console.log(ingredientList[0][0].name); // 첫 version의 첫 ingredient의 이름
            for(var i=0; i<ingredientList.length; i++){
                for(var j=0; j<ingredientList[i].length; j++){
                    ingredientName.push(ingredientList[i][j].name);
                }
            }
            // console.log(ingredientName);
            var uniqueName = ingredientName.filter((item, pos) => ingredientName.indexOf(item) === pos);
            // console.log(uniqueName);

            const ingredientAmount = [];
            for(var i = 0; i < uniqueName.length; i++) {
                ingredientAmount.push([]);
                for(var j = 0; j < ingredientList.length; j++) {
                    const tar = ingredientList[j].find(e => e.name === uniqueName[i]);
                    // console.log(tar);
                    ingredientAmount[i].push(tar ? tar.amount : 0);
                }
            }
            console.log(ingredientAmount);

            for(var i=0; i<uniqueName.length; i++){
                var state;
                state = {
                    options: {
                        chart: {
                            id: `${uniqueName[i]}`
                        },
                        xaxis: {
                            categories: versions.map((_, i) => "ver. " + (i + 1))
                        }
                    },
                    series: [{
                    name: `${uniqueName[i]}`,
                    data: ingredientAmount[i]
                    }]
                }
                chartOption.push(state);
            }
            setChartOption(chartOption);
            // console.log(chartOption);
        }
    }, [ingredientList], [loading])

    return (
        <>
            <div>
                {
                    chartOption &&
                    chartOption.map((e, i) => 
                        <div key={i}>
                            <Chart 
                                options={e.options}
                                series={e.series}
                                type="line"
                                width="700"/>
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default RecipeChart;