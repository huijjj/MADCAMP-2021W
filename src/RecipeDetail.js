import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import './RecipeDetail.css';
import 'antd/dist/antd.css'

function RecipeDetail() {
    const API_BASE = "http://192.249.18.176:443";

    const loc = useLocation();
    const nav = useNavigate();
    // console.log(loc.state);
    const owner = loc.state.owner;
    const title = loc.state.title;
    const versions = loc.state.versions; // 버전이 배열로 저장되어 있음.
    const _id = loc.state._id; // id of recipe in DB

    const [ingredientList, setIngredientList] = useState([]);
    const [memo, setMemo] = useState("");
    const [procedure, setProcedure] = useState([]);
    const [version, setVersion] = useState(versions.length);
    const [dropContent, setDropContent] = useState();


    function onVersionClicked({ key }){
        if(version !== Number(key)) {
            setVersion(Number(key));
        }
    }
  
    useEffect(()=>{
        setDropContent(
            <Menu onClick={onVersionClicked}>{
                versions.map((_, i) => (
                    <Menu.Item key={i + 1}>{i + 1}</Menu.Item>
                ))
            }</Menu>
        );
    }, []); 

    useEffect(() => {
        axios.get(`${API_BASE}/recipe/version/${versions[version - 1].id}`).then(res => {
            console.log(res.data);
            setIngredientList(res.data.ingredients.map((val, index) => (
                <div className='ingredientitem' key={`ingredient_${index}`}>{val.name} {val.amount}g</div>
            )));
            setMemo(res.data.memo);
            setProcedure(res.data.procedure.map((val, index) => (
                <>
                <div className='procedurebody' key={`procedure_${index}`}>
                    <div className='procedureindex'>{index+1}</div>
                    <div className='procedureitem'>{val.content}</div>
                </div>
                </>
            )));
        }).catch(console.log);
    }, [version]);
    
    return(
        <>
            <div className='recipebody'>
                <div className='recipemain'>{title}</div>
                <div className='versionbutton'>
                    <Dropdown overlay={dropContent}>
                        <Button>ver. {version}<DownOutlined /></Button>
                    </Dropdown>
                </div>
                <button className='gotochart' onClick={() => {
                    // console.log(versions);
                    nav(`/${owner}/${_id}/chart`, {state: {versions: versions}});
                    }}>chart</button>
            </div>
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
    );
}

export default RecipeDetail;