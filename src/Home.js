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
  
  // install Swiper modules
  SwiperCore.use([Pagination]);
  SwiperCore.use([Scrollbar]);

export default function Home() {

    useEffect(()=> {
        const dragflag = document.getElementsByClassName("swiper-scrollbar-drag");

        // const swiperArray = document.getElementsByClassName('swiper-slide');

        // for (let i = 0; i < swiperArray.length;  i++){
        //     swiperArray[i].style.width = "500px";
        // }


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
        </>
      );

}
