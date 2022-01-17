import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import FightButton from "./FightButton.js";

export default function GameBar({ isStart, speed, stamina, setStamina, hStamina, setHStamina }) {
  
  var stoppedX = Number(0);
  var isAttack = false;
  var attackValue = 0;
  var x = 0;
  var interval;
  const sojuImage = new Image(20, 50);
  const tableImage = new Image(100, 100);
  sojuImage.src = 'images/soju.png';
  tableImage.src = 'images/table.png';

  const fighting = useRef();
  fighting.current = false;
  // const [ fighting, setFighting ] = useState(false);

  var canvasRef = useRef(null);
  const draw = ()=> {
    if (x > 648) {
      clearInterval(interval);
      fighting.current = false;
      setStamina(stamina - 30);
    }

    var canvas = canvasRef.current;
    var ctx = canvas?.getContext("2d");
    
    ctx.clearRect(0, 0, 800, 160)

    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.strokeStyle = 'rgba(0,153,255,0.4)';
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.drawImage(tableImage, 480, 80, 80, 80);
    ctx.closePath();

    ctx.beginPath();
    ctx.drawImage(sojuImage, x, 0, 24, 80);
    ctx.closePath();
    
    
    stoppedX = x;
    x += speed;
    console.log(stoppedX);
  };

  
  const handleAttack = () => {
    if (498 <= stoppedX && stoppedX <= 518) {
      isAttack = true;
      attackValue = 50;
      console.log("red");
    }

    else if (468 <= stoppedX && stoppedX < 498 || 518 < stoppedX && stoppedX <= 548) {
        isAttack = true;
        attackValue = 30;
        console.log("orange");
    }
    else if (stoppedX === 0) {
      console.log("starting point");
    }
    else {
      attackValue = 30;
      console.log("outside");
    }

    (isAttack)
      ? setHStamina(hStamina-attackValue)
      : setStamina(stamina-attackValue)
  }

  // console.log(`speed: ${speed}`);
  const onFight = () => {
    // setFighting(true);
    fighting.current = true;
    interval = setInterval(draw, 0.01);
  }

  const onStop = () => {
    fighting.current = false;
    clearInterval(interval);
    handleAttack();
  }
 
  return (
    <>
      <canvas ref={canvasRef} width={800} height={160} />
      <br />
      <FightButton hStamina={hStamina} fight={fighting} onFight={onFight} onStop={onStop}/>
    </>
  );
}