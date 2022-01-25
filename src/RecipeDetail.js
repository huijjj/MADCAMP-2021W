import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import './RecipeDetail.css';
import 'antd/dist/antd.css'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import {FloatingMenu, MainButton, ChildButton,} from 'react-floating-button-menu';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import RemoveIcon from '@mui/icons-material/Remove';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import ModeIcon from '@mui/icons-material/Mode';

import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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
    const [isOpen, setisOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [deleteAllState, setDeleteAllState] = useState(true);

    function onVersionClicked({ key }){
        setVersion(Number(key));
    }

    const onDelete = (e, deleteAll) => {
        e.preventDefault();
        setDeleteAllState(deleteAll);
        if(deleteAll) {
            setDialogTitle('이 레시피를 삭제하시겠습니까?');
            setDialog(true);
            // if(window.confirm("레시피 전체 삭제")) {
            //     axios.delete(`${API_BASE}/recipe/${_id}`).then(_ => {
            //         window.alert("삭제 완료");
            //         setShow(false);
            //         setTimeout(() => nav(`/home/${owner}`, {state: {nickname: nickname}}), 400);
            //     }).catch(console.log);
            // }
        }
        else {
            setDialogTitle('이 버전을 삭제하시겠습니까?');
            setDialog(true);
            // if(window.confirm("이 버전을 삭제")) {
            //     axios.delete(`${API_BASE}/recipe/version/${_id}/${versions[version - 1].id}`).then(res => {
            //         window.alert("삭제 완료");
            //         // nav(`/home/${owner}`);
            //         console.log(res.data);
            //         setVersions(res.data.versions);
            //         setVersion(res.data.versions.length);
            //     }).catch(console.log);
            // }
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
            setShow(true);
        }).catch(console.log);
    }, [version]);
    
    return(
        <>        
        <Slide direction="up" in={show} mountOnEnter unmountOnExit>
            <div className = "detail_body">
                <div className= "buttons" style={{ display: "flex" }}>
                    <KeyboardBackspaceIcon sx={{ color: "rgb(90, 90, 90)" }} onClick={() => {
                        setShow(false);
                        setTimeout(() =>  nav(`/home/${owner}`, {state: {nickname: nickname}}), 200);
                    }}/>
                    <FloatingMenu className="floating_menu_button" slideSpeed={500} direction='down' spacing={20} isOpen={isOpen}>
                        <MainButton className= "menu_button" iconResting={<MenuIcon></MenuIcon>} iconActive={<CloseIcon></CloseIcon>} backgroundColor='black'
                        onClick={() => { if(isOpen==false) {setisOpen(true)} else {setisOpen(false)}}} size={56}/>
                        <ChildButton  icon = {<StackedLineChartIcon style={{ color:"rgb(90,90,90)"}}/>}  backgroundColor='white' size={50}
                        onClick={()=> {
                            console.log('chart button clicked');
                            nav(`/${owner}/${_id}/chart`, {state: {versions: versions}});
                        }}/>
                        {
                            versions.length !== 1 ? 
                            <ChildButton icon = {<RemoveIcon style={{ color:"rgb(90,90,90)"}}></RemoveIcon>} backgroundColor='white' size={50}
                            onClick={(e)=> {
                                console.log('remove version button clicked');
                                onDelete(e, false);
                            }}/> : <></>
                        }
                        <ChildButton icon = {<ClearAllIcon style={{color:"rgb(90,90,90)"}}/>} backgroundColor='white' size={50}
                        onClick={(e)=> {
                            console.log('remove recipe button clicked');
                            onDelete(e, true);
                        }}/>
                        <ChildButton icon = {<ModeIcon style={{color:"rgb(90,90,90)"}}/>} backgroundColor='white' size={50}
                        onClick={(e)=> {
                            console.log('version add clicked');
                            e.preventDefault();
                            nav(`/recipe/add/${owner}`, { state: { 
                                img: img,
                                favorite: fav,
                                title: title,
                                prev: prev,
                                id: _id
                            }});
                        }}/>
                    </FloatingMenu>
                </div>
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
        </Slide>

                
        <Dialog
            open={dialog}
            TransitionComponent={Transition}
            onClose={() => setShow(false)}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogActions>
                <Button onClick={(e) => {
                    e.preventDefault();
                    setDialog(false);
                }}>
                    취소
                </Button>
                <Button onClick={(e) => {
                    e.preventDefault();
                    if(deleteAllState) {
                        axios.delete(`${API_BASE}/recipe/${_id}`).then(_ => {
                            setDialog(false);
                            setTimeout(
                                () => {
                                    setShow(false);
                                    setTimeout(() => nav(`/home/${owner}`, {state: {nickname: nickname}}), 400);
                                }, 100
                            );
                        }).catch(console.log);
                    } else {
                        axios.delete(`${API_BASE}/recipe/version/${_id}/${versions[version - 1].id}`).then(res => {
                            // window.alert("삭제 완료");
                            // nav(`/home/${owner}`);
                            console.log(res.data);
                            setDialog(false);
                            setVersions(res.data.versions);
                            setVersion(res.data.versions.length);
                        }).catch(console.log);
                    }
                }}>
                    확인
                </Button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default RecipeDetail;