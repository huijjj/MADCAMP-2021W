import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Home.css";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination";
import "./SlideItem";
// import Swiper core and required modules
import SwiperCore, {
    Pagination,
    Scrollbar
  } from 'swiper';
import SlideItem from "./SlideItem";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';

const userId = "hui0213";
const API_BASE = "http://192.249.18.176:443";

// install Swiper modules 
SwiperCore.use([Pagination]);
SwiperCore.use([Scrollbar]);

export default function Home({ userNickname }) {
	const nav = useNavigate();
    const { userId } = useParams();
	const [ recipes, setRecipes ] = useState([]);
	const [ recipeVersions, setRecipeVersions ] = useState([]);
	const [ searchTerm, setSearchTerm] = useState("");
    const [ recipeList, setRecipeList ] = useState([]);
  	const [ recipesLoading, setRecipesLoading ] = useState(false);
  	const [ favoriteRecipeList, setFavoriteRecipeList ] = useState([]);

    useEffect(()=> {
        const dragflag = document.getElementsByClassName("swiper-scrollbar-drag");

		    // get every recipe of given userId
        axios.get(`${API_BASE}/recipe/${userId}`).then(res => {
            // console.log(res.data);
            setRecipes(res.data);	
            const tmp = document.createElement('div');

			setFavoriteRecipeList(res.data.map(element => {
				if (element.favorite === true) {
					return (
						<SwiperSlide onClick={() => {
                            console.log(element);
                            nav(`/${element.owner}/${element._id}`, {state: {favorite: element.favorite, owner: element.owner, title: element.title, versions: element.versions, img: element.img}});
                            }}>
                            <SlideItem img = {element.img} title = {element.title} />
                        </SwiperSlide>
					);
				}
			}));

            // detail recipe
            Promise.all(res.data.map(recipes => axios.get(`${API_BASE}/recipe/version/${recipes.versions[recipes.versions.length - 1].id}`)))
                .then(re => {
                setRecipeVersions(re.map(e => e.data));
                console.log(re.map(e => e.data));
                console.log(re);

                setRecipeList(res.data.filter(val => {
                    console.log(val);
                    if(searchTerm == "") {
                        return val;
                      } else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())){
                        return val;
                      }
                }).map((val, index) => (
                    <div key={index} className = "recipe" onClick={() => {
                        console.log(val.versions[val.versions.length-1].id);
                        nav(`/${val.owner}/${val._id}`, {state: {favorite: val.favorite, owner: val.owner, title: val.title, versions: val.versions, img: val.img}});
                        }}>
                        <div className = "recipe_content">
                            <div>{
                                val.img ? 
                                <img style={{ width: "100px", height: "100px" }} src={`${API_BASE}/image/${val.img}`}/> : <></>
                            }</div>
                            <div className = "recipe_title">
                                {val.title}
                            </div>
                            <div className = "recipe_ingredients">{
                                re[index].data.ingredients?.map((el,idx) => {
                                    if(idx == re[index].data.ingredients.length - 1 ) {
                                    	return(<div className = "ingredient" key = {idx}> &nbsp;{`${el.name}  ${el.amount}g`} </div>)
                                    } 
									else {
                                        return(<div className = "ingredient"  key = {idx}> &nbsp;{`${el.name}  ${el.amount}g,`} </div>)
                                    }})
                        	}</div> 
						</div>
					</div>)));
				}).catch(console.log);
        }).catch(console.log);

        //setRecipesLoading(true);

    }, [searchTerm]);
  
    return (
        <>
            <div id = "title_bar">
                <span id = "title">김민채의 요리보고 조리보고</span>
                <span id = "say_hi">{userNickname}님 안녕하세요 :)</span>
            </div>
            <Swiper slidesPerView="auto" slidesOffsetBefore = {50} slidesOffsetAfter = {50} centeredSlides={false} spaceBetween={50} grabCursor={true} pagination={{
                "clickable": true}} className="mySwiper">
                {/* <SwiperSlide><SlideItem/></SwiperSlide>
            <SwiperSlide><SlideItem/></SwiperSlide>
            <SwiperSlide><SlideItem/></SwiperSlide>
            <SwiperSlide><SlideItem/></SwiperSlide>
            <SwiperSlide><SlideItem/></SwiperSlide> */}
			{favoriteRecipeList}
            </Swiper>
            <div className = "search">
                <div>
                <input
                    className="searchInput"
                    type = 'text'
                    placeholder = '🍎 🍓 🍒 🍑 🍅 🍟'
                    onChange={(event)=>{
                        setSearchTerm(event.target.value);
                    }}
                />
                </div>

            </div>

            <Fab
                mainButtonStyles={{background : "#BF7D7C", fontSize : "10px"} /*mainButtonStyles*/}
                // actionButtonStyles={actionButtonStyles}
                // style={style}
                icon={"ADD"}
                // event={event}
                alwaysShowTitle={true}
                onClick={(e) => {
                    e.preventDefault();
                    nav(`/recipe/add/${userId}`);
                }}
                ></Fab>

            <div class = "recipe_container">
                {recipeList}
            </div>
			<div onClick={(e) => {
				e.preventDefault();
				nav(`/recipe/add/${userId}`);
			}}>
				add
			</div>
        </>
    );

}