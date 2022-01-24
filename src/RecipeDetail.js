import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

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
    const nickname = loc.state.nickname;
    // const versions = loc.state.versions; // 버전이 배열로 저장되어 있음.
    const  _id = useParams().recipe; // id of recipe in DB
    const img = loc.state.img;
    const fav = loc.state.favorite;

    const [ingredientList, setIngredientList] = useState([]);
    const [memo, setMemo] = useState("");
    const [procedure, setProcedure] = useState([]);
    const [versions, setVersions] = useState(loc.state.versions);
    const [version, setVersion] = useState(versions.length);
    const [dropContent, setDropContent] = useState();
    const [prev, setPrev] = useState();


    function onVersionClicked({ key }){
        setVersion(Number(key));
    }

    const onDelete = (e, deleteAll) => {
        e.preventDefault();
        if(deleteAll) {
            if(window.confirm("레시피 전체 삭제")) {
                axios.delete(`${API_BASE}/recipe/${_id}`).then(_ => {
                    window.alert("삭제 완료");
                    nav(`/home/${owner}`, {state: {nickname: nickname}});
                }).catch(console.log);
            }
        }
        else {
            if(window.confirm("이 버전을 삭제")) {
                axios.delete(`${API_BASE}/recipe/version/${_id}/${versions[version - 1].id}`).then(res => {
                    window.alert("삭제 완료");
                    // nav(`/home/${owner}`);
                    console.log(res.data);
                    setVersions(res.data.versions);
                    setVersion(res.data.versions.length);
                }).catch(console.log);
            }
        }
    };
  
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
            setPrev(res.data);
            setIngredientList(res.data.ingredients.map((val, index) => (
                <div className='ingredientitem' key={`ingredient_${index}`}>{val.name} {val.amount}g</div>
            )));
            setMemo(res.data.memo);
            setProcedure(res.data.procedure.map((val, index) => (
                <div className='procedurebody' key={`procedure_${index}`}>
                    <div className='procedureindex'>{index+1}</div>
                    <div className='procedureitem'>{val.content}</div>
                </div>
            )));
        }).catch(console.log);
    }, [version]);
    
    return(
        <>
            <div onClick={() => {
                nav(-1);
                }}>
                뒤로 가기
            </div>
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
                <button onClick={(e) => onDelete(e, true)}>
                    레시피 전체 삭제
                </button>
                {
                    versions.length !== 1 && 
                    <button onClick={(e) => onDelete(e, false)}>
                        이 버전만 삭제
                    </button>
                }
                <button onClick={(e) => {
                    e.preventDefault();
                    nav(`/recipe/add/${owner}`, { state: { 
                        img: img,
                        favorite: fav,
                        title: title,
                        prev: prev,
                        id: _id
                     }});
                }}>
                    버전 추가
                </button>
            </div>
            <div className='upstructure'>
                <div className='picture'>사진</div>
                <div>{
                    img ? <img src={`${API_BASE}/image/${img}`}/> : <></>
                }</div>
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