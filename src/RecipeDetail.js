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
    // const favorite = loc.state.favorite; // 디테일 파트에서는 즐겨찾기 기능 구현 x
    const owner = loc.state.owner;
    const title = loc.state.title;
    const versions = loc.state.versions; // 버전이 배열로 저장되어 있음.
    const _id = loc.state._id; // id of recipe in DB

    // const [version, setVersion] = useState(0);
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
                <div className='ingredientitem' key={index}>{val.name} {val.amount}g</div>
            )));
            setMemo(res.data.memo);
            setProcedure(res.data.procedure.map((val, index) => (
                <div className='procedureitem' key={index}>{val.content}</div>
            )));
        }).catch(console.log);
    }, [version]);
    
    return(
        <>
            <div className='recipemain'>{title}</div>
            <div>
                <Dropdown overlay={dropContent}>
                    <Button>ver. {version}<DownOutlined /></Button>
                </Dropdown>
            </div>
            <div className='upstructure'>
                <div className='picture'>사진</div>
                <div className='memobody'>
                    <div className='memomain'>MEMO</div>
                    {memo}
                </div>
            </div>
            <div className='ingredientbody'>
                {ingredientList}
            </div>
            <div className='procedurebody'>
                {procedure}
            </div>
        </>
    );
}

export default RecipeDetail;