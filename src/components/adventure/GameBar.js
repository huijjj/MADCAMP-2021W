import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function GameBar() {
  
  var x = 0;

  var canvasRef = useRef(null);

  const draw = ()=> {
    
    var canvas = canvasRef.current;
    var ctx = canvas.getContext("2d");
    
    ctx.clearRect(0, 0, 500, 50)

    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.strokeStyle = 'rgba(0,153,255,0.4)';
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.rect(300, 0, 50, 50);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(315, 0, 20, 50);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(x, 0, 10, 50);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    x += 1.5;
  };

  var interval = setInterval(draw, 0.01);
  

  return (
    <>
      <canvas ref={canvasRef} width={400} height={50}></canvas>
      <Button onClick={() => clearInterval(interval)}>
        공격하기
      </Button>
    </>
  );
}