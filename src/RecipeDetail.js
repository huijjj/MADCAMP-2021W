import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import './RecipeDetail.css';
import 'antd/dist/antd.css'

import {FloatingMenu, MainButton, ChildButton,} from 'react-floating-button-menu';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import RemoveIcon from '@mui/icons-material/Remove';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import ModeIcon from '@mui/icons-material/Mode';

function RecipeDetail() {
    const API_BASE = "http://192.249.18.176:443";

    const loc = useLocation();
    const nav = useNavigate();
    // console.log(loc.state);
    const owner = loc.state.owner;
    const title = loc.state.title;
    const versions = loc.state.versions; // 버전이 배열로 저장되어 있음.
    const  _id = useParams().recipe; // id of recipe in DB
    const img = loc.state.img;

    const [ingredientList, setIngredientList] = useState([]);
    const [memo, setMemo] = useState("");
    const [procedure, setProcedure] = useState([]);
    const [version, setVersion] = useState(versions.length);
    const [dropContent, setDropContent] = useState();
    const [isOpen, setisOpen] = useState(false);


    function onVersionClicked({ key }){
        setVersion(Number(key));
    }

    const onDelete = (e, deleteAll) => {
        e.preventDefault();
        if(deleteAll) {
            if(window.confirm("레시피 전체 삭제")) {
                axios.delete(`${API_BASE}/recipe/${_id}`).then(_ => {
                    window.alert("삭제 완료");
                    nav(`/home/${owner}`);
                }).catch(console.log);
            }
        }
        else {
            if(window.confirm("이 버전을 삭제")) {

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
        <div className = "contents">
            <div className = "buttons">
            <div className='gotochart' onClick={() => {
                    // console.log(versions);
                    nav(`/${owner}/${_id}/chart`, {state: {versions: versions}});
                }}>차트 보기</div>
                <div className="delete_all" onClick={(e) => onDelete(e, true)}>
                    레시피 전체 삭제
                </div>
                {
                    versions.length !== 1 && 
                    <div className = "delete_this" onClick={(e) => onDelete(e, false)}>
                        이 버전만 삭제
                    </div>
                }
                <div className="add_version" onClick={(e) => e.preventDefault()}>
                    버전 추가
                </div>


            </div>

        <div className = "detail_body">

            <FloatingMenu className="floating_menu_button" slideSpeed={500} direction='down' spacing={20} isOpen={isOpen}>
                <MainButton className= "menu_button" iconResting={<MenuIcon></MenuIcon>} iconActive={<CloseIcon></CloseIcon>} backgroundColor='black'
                onClick={() => { if(isOpen==false) {setisOpen(true)} else {setisOpen(false)}}} size={56}/>
                <ChildButton  icon = {<StackedLineChartIcon style={{ color:"rgb(90,90,90)"}}/>}  backgroundColor='white' size={50}
                onClick={()=> {console.log('first button clicked')}}/>
                <ChildButton icon = {<RemoveIcon style={{ color:"rgb(90,90,90)"}}></RemoveIcon>} backgroundColor='white' size={50}
                onClick={()=> {console.log('second button clicked')}}/>
                <ChildButton icon = {<ClearAllIcon style={{color:"rgb(90,90,90)"}}/>} backgroundColor='white' size={50}
                onClick={()=> {console.log('3rd button clicked')}}/>
                <ChildButton icon = {<ModeIcon style={{color:"rgb(90,90,90)"}}/>} backgroundColor='white' size={50}
                onClick={()=> {console.log('4th button clicked')}}/>
            </FloatingMenu>
            <div className='recipebody'>
                <div className='recipemain'>{title}</div>
                <div className='versionbutton'>
                    <Dropdown overlay={dropContent}>
                        <Button>ver. {version}<DownOutlined /></Button>
                    </Dropdown>
                </div>

            </div>
            <div className='upstructure'>
                <div>{
                    img ? <img id = "inserted_image" width={250} height={250} src={`${API_BASE}/image/${img}`} alt="img"/> : <div className='picture'>사진</div>
                }</div>
                <div className='memobody'>
                    <div className='memomain'>MEMO</div>
                    <div className='memotext'>{memo}</div>
                </div>
            </div>
            <div className = "ingredient_wrapper">
                <div className='ingredientbody'>
                    {ingredientList}
                </div>
            </div>
            <div className = "procedure_wrapper">
                {procedure}
            </div>

        </div>
        </div>
    );
}

export default RecipeDetail;