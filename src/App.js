
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination"
import SlideItem from "./SlideItem";
import "./Home.css"




// import Swiper core and required modules
import SwiperCore, {
  Pagination
} from 'swiper';


// install Swiper modules
SwiperCore.use([Pagination]);


export default function App() {
  
  
  
  return (
    <>
    <Swiper slidesPerView={3} centeredSlides={true} spaceBetween={30} grabCursor={true} pagination={{
  "clickable": true
}} className="mySwiper">
  <SwiperSlide><SlideItem/></SwiperSlide><SwiperSlide>Slide 2</SwiperSlide><SwiperSlide>Slide 3</SwiperSlide><SwiperSlide>Slide 4</SwiperSlide><SwiperSlide>Slide 5</SwiperSlide><SwiperSlide>Slide 6</SwiperSlide><SwiperSlide>Slide 7</SwiperSlide><SwiperSlide>Slide 8</SwiperSlide><SwiperSlide>Slide 9</SwiperSlide>
  </Swiper>
    </>
  )
}