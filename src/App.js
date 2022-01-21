import './App.css';
import Routers from './Routers';
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination"
import SlideItem from "./SlideItem";
import "./Home.css"


// import Swiper core and required modules
import SwiperCore, { Pagination } from 'swiper';


// install Swiper modules
SwiperCore.use([Pagination]);



export default function App() {
  
  return (
    <div style={{ width: "100%", height: "100%" }} className="App">
      <Routers/>
    </div>
  );
}


  
  
