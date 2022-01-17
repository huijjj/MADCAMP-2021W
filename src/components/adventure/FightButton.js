import { Button } from "@mui/material";

export default function FightButton({ hStamina, fight, onFight, onStop }) {
  const onClick = (e) => {
    e.preventDefault();
    if(fight.current) {
      onStop();
    }
    else {
      onFight();
    }
  }

  return (<>
      {(hStamina > 0) ? <Button variant="contained" color="success" onClick={onClick}>싸우기</Button> : <></>}
    </>);
} 


// <Button onClick={() => {
//         fighting = true;
//         interval = setInterval(draw, 0.01);
//       }}>
//         { fighting ? "" : "싸우기" }
//       </Button>
//       <Button onClick={() => {
//         fighting = false;
//         clearInterval(interval);
//         handleAttack();
//         console.log(`stoppedX = ${stoppedX}`);
//         console.log(`attackValue = ${attackValue}`);
//         }}>
//           { fighting ? "멈추기" : "" }
//       </Button>