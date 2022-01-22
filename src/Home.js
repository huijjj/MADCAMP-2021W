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
  

const userId = "hui0213";
const API_BASE = "http://192.249.18.176:443";

// install Swiper modules 
SwiperCore.use([Pagination]);
SwiperCore.use([Scrollbar]);

export default function Home( {userId, userNickname} ) {
	
	const [ recipes, setRecipes ] = useState([]);
	const [ recipeVersions, setRecipeVersions ] = useState([]);
	const [ searchTerm, setSearchTerm] = useState("");
    const [ recipesLoading, setRecipesLoading ] = useState(false);
    const [ recipeList, setRecipeList ] = useState([]);

    useEffect(()=> {
        const dragflag = document.getElementsByClassName("swiper-scrollbar-drag");

		    // get every recipe of given userId
        axios.get(`${API_BASE}/recipe/${userId}`).then(res => {
            console.log(res.data);
            setRecipes(res.data);	
            const tmp = document.createElement('div')

            // detail recipe
            Promise.all(res.data.map(recipes => axios.get(`${API_BASE}/recipe/version/${recipes.versions[recipes.versions.length - 1].id}`)))
                .then(re => {
                setRecipeVersions(re.map(e => e.data));
                console.log(re.map(e => e.data));
                console.log(re);

                setRecipeList(res.data.filter(val => {
                    if(searchTerm == "") {
                        return val;
                      } else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())){
                        return val;
                      }
                }).map((elem, index) => {
                    return(
                        <div className = "recipe">
                            <div className = "recipe_content">
                                <div className = "recipe_title">
                                    {elem.title}
                                </div>
                                <div className = "recipe_ingredients">
                                        {
                                            re[index].data.ingredients?.map(el =>{
                                                return(<div className = "ingredient"> {`${el.name}  ${el.amount} g`} </div>)
                                            })
                                        }
                                </div> 
                            </div>
                        </div>
                    );

                }))

            }).catch(console.log);

        }).catch(console.log);

        //setRecipesLoading(true);

    }, []);
  
    
    return (
        <>
            <div id = "title_bar">
                <span id = "title">김민채의 요리교실</span>
                <span id = "say_hi">민채님 안녕하세요 :)</span>
            </div>
            <Swiper slidesPerView="auto" slidesOffsetBefore = {50} slidesOffsetAfter = {50} centeredSlides={false} spaceBetween={50} grabCursor={true} pagination={{
                "clickable": true}} className="mySwiper">
                <SwiperSlide><SlideItem/></SwiperSlide>
            <SwiperSlide><SlideItem/></SwiperSlide>
            <SwiperSlide><SlideItem/></SwiperSlide>
            <SwiperSlide><SlideItem/></SwiperSlide>
            <SwiperSlide><SlideItem/></SwiperSlide>
            </Swiper>
            <input
                type = 'text'
                placeholder = 'Search'
                style={elementStyle}
                onChange={(event)=>{
                    setSearchTerm(event.target.value);
                }}
            />
            <div class = "recipe_container">
                {recipeList}
            </div>
        </>
    );

}

    