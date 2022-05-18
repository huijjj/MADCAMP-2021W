import Draggable from 'react-draggable';

export default function Animals({ animalList, onStop }) {

  const onDrag = (e, _) => {
    e.preventDefault();
  }

  // const onStop = (e, data) => {
  //   e.preventDefault();
  //   const target = animalList[e.target.id];

  //   const newX = target.X + data.x;
  //   const newY = target.Y + data.y;

  //   // console.log(target.id, newX, newY);  
  //   axios.put(`${API_BASE}/animal/move`, {
  //     id: target.id,
  //     X: newX,
  //     Y: newY
  //   }).then();
  // }


  return <>{
    animalList.map((e, i) => {
      const X = e.X;
      const Y = e.Y;

      // console.log(X, Y);
      const style = {
        width: "10rem",
        height: "10rem",
        transform: "translate(" + X +"px," + Y +"px)",
        position: "absolute"
      };

      const src = `/images/${e.type}.png`;

      return (<Draggable onDrag={onDrag} onStop={onStop} key={e.id}>
        <div id={i} style={{width: "10rem"}}>
          <img alt={e.type} id={i} style={style} src={src} />
        </div>
      </Draggable>);
  })}</>;
} 