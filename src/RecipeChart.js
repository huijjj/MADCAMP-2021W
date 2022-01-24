import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Chart from 'react-apexcharts';
import './RecipeChart.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Slide from '@mui/material/Slide';

function RecipeChart() {
    const API_BASE = "http://192.249.18.176:443";

    const nav = useNavigate();
    const loc = useLocation();
    console.log(loc.state);
    const versions = loc.state.versions;

    const [ingredientList, setIngredientList] = useState([]);
    const [chartOption, setChartOption] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        Promise.all(versions.map(e => axios.get(`${API_BASE}/recipe/version/${e.id}`)))
            .then(res => {
                setIngredientList(res.map(el => {
                    // console.log(el.data.ingredients);
                    return el.data.ingredients;
                }))
                setLoading(true);
                setShow(true);
            }).catch(console.log);
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
            // console.log(ingredientAmount);

            for(var i=0; i<uniqueName.length; i++){
                var state;
                state = {
                    options: {
                        chart: {
                            id: `${uniqueName[i]}`,
                            toolbar: {show: false},
                            zoom: {
                                enabled: false
                            }
                        },
                        xaxis: {
                            categories: versions.map((_, i) => "ver. " + (i + 1))
                        },
                        colors: ['#3E4E80'],
                    },
                    series: [{
                    name: `${uniqueName[i]}`,
                    data: ingredientAmount[i]
                    }]
                }
                // console.log(state.options.chart.id);
                chartOption.push(state);
            }
            setChartOption(chartOption);
            // console.log(chartOption);
        }
    }, [ingredientList], [loading])

    return (
        <Slide direction="up" in={show} mountOnEnter unmountOnExit>
            <div className = "graph_container">
                <div className = "graph_content">
                <KeyboardBackspaceIcon id="graph_back_button" onClick={(e) => { 
                    e.preventDefault();
                    setShow(false);
                    setTimeout(() => {
                        nav(-1); 
                    }, 200);
                }}/>
                <div className = "graph_title">버전 별 재료 변화</div>
                <div>
                    {
                        chartOption &&
                        chartOption.map((e, i) => 
                            <div className='chartbody' key={i}>
                                <Chart
                                    fill={e.colors}
                                    options={e.options}
                                    series={e.series}
                                    type="line"
                                    width="700"/>
                                <div className='chartname'>{`${e.options.chart.id}의 version에 따른 재료량 추이 그래프`}</div>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                            </div>
                        )
                    }
                </div>
                </div>
            </div>
        </Slide>
    );
}

export default RecipeChart;