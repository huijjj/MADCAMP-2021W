import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RecipeDetail.css';

function RecipeDetail() {
    const API_BASE = "http://192.249.18.176:443";

    const loc = useLocation();
    const nav = useNavigate();
    // console.log(loc.state);
    const owner = loc.state.owner;
    const title = loc.state.title;
    const versions = loc.state.versions; // 버전이 배열로 저장되어 있음.
    const _id = loc.state._id;

    const [ingredientList, setIngredientList] = useState([]);
    const [memo, setMemo] = useState("");
    const [procedure, setProcedure] = useState([]);

    useEffect(()=>{
        axios.get(`${API_BASE}/recipe/version/${versions[versions.length - 1].id}/`).then( res => {
            console.log(res.data); 
            setIngredientList(res.data.ingredients.map((val, index) => (
                <div className='ingredientitem' key={index}>{val.name} {val.amount}g</div>
            )));
            setMemo(res.data.memo);
            setProcedure(res.data.procedure.map((val, index) => (
                <>
                <div className='procedurebody'>
                    <div className='procedureindex' key={index}>{index+1}</div>
                    <div className='procedureitem' key={index}>{val.content}</div>
                </div>
                </>
            )));
        }).catch(console.log);
    }, []);
    
    return(
        <>
            <div className='recipemain'>{title}</div>
            <div className='upstructure'>
                <div className='picture'>사진</div>
                <div className='memobody'>
                    <div className='memomain'>MEMO</div>
                    <div className='memotext'>{memo}</div>
                </div>
            </div>
            <div className='ingredientbody'>
                {ingredientList}
            </div>
            {procedure}
        </>
    )
}

export default RecipeDetail;