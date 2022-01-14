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
    ctx.save();
    // ctx.translate(150,150);


    ctx.beginPath();
    ctx.rect(x, 0, 50, 50);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(400, 0, 10, 50);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();

    x += 2;
  };

  setInterval(draw, 10);
  

  return (
    <canvas ref={canvasRef} width={500} height={50}></canvas>
  );
}