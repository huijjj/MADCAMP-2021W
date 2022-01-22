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

    useEffect(()=> {
        const dragflag = document.getElementsByClassName("swiper-scrollbar-drag");

        // const swiperArray = document.getElementsByClassName('swiper-slide');

        // for (let i = 0; i < swiperArray.length;  i++){
        //     swiperArray[i].style.width = "500px";
        // }

		// get every recipe of given userId
    axios.get(`${API_BASE}/recipe/${userId}`).then(res => { //userId -> ${userId}
		// console.log(`userId : `, {userId});
		// console.log(`userNickname : `, {userNickname});
		
		console.log(res.data);
		setRecipes(res.data);

		Promise.all(res.data.map(recipes => axios.get(`${API_BASE}/recipe/version/${recipes.versions[recipes.versions.length - 1].id}`)))
			.then(re => {
          		setRecipeVersions(re.map(e => e.data));
					console.log(re.map(e => e.data));
					console.log(re);
				}).catch(console.log);
	  	}).catch(console.log);
    }, []);
	
	const styleInfo = {
		paddingRight:'10px'
	}
	const elementStyle ={
		border:'solid',
		borderRadius:'10px',
		position:'relative',
		left:'10vh',
		height:'3vh',
		width:'20vh',
		marginTop:'5vh',
		marginBottom:'10vh'
	}
	
	const items = recipes.filter(val=>{
		if(searchTerm == "") {
			return val;
		} else if(val.title.toLowerCase().includes(searchTerm.toLowerCase())){
			return val;
		}
	}).map((val, key) => {
		return(
			<div className="recipes" key={key}>
			  <p>{val.title}</p>
			</div>
			)
	})

    return (
        <>
			<div id = "title_bar">
				<span id = "title">김민채의 요리교실</span>
				<span id = "say_hi">{userNickname}님 안녕하세요 :)</span>
			</div>
			<Swiper slidesPerView="auto" slidesOffsetBefore = {50} slidesOffsetAfter = {50} centeredSlides={false} spaceBetween={50} grabCursor={true} pagination={{
			"clickable": true}} className="mySwiper">
				<SwiperSlide><SlideItem/></SwiperSlide>
				<SwiperSlide><SlideItem/></SwiperSlide>
				<SwiperSlide><SlideItem/></SwiperSlide>
				<SwiperSlide><SlideItem/></SwiperSlide>
				<SwiperSlide><SlideItem/></SwiperSlide>
			</Swiper>

			<div>
				<input
					type = 'text'
					placeholder = 'Search'
					style={elementStyle}
					onChange={(event)=>{
						setSearchTerm(event.target.value);
					}}
				/>
				{items}
			</div>

        </>
      );

}
