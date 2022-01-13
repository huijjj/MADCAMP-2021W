export default function AnimalListItem({
  id,
  name,
  type,
  sex,
  geee,
  duck,
  chae,
  onClick
}) {
  const imgSrc = `/images/${type.substring(0, 3)}/${type.at(3)}.jpg`;

  return (
    <div onClick={() => onClick(id, name)} style={{ display: "flex", flexDirection: "column", margin: "1rem" }}>
      <div style={{display: "flex"}}>
        <img style={{ objectFit :"cover", width: "7rem", height: "7rem" }} alt={`${type}.jpg`} src={imgSrc} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <div>{name}({sex})</div>
            <br></br>
          </div>
          <div>
            <div>지: {geee}</div>
            <div>덕: {duck}</div>
            <div>체: {chae}</div>
          </div>
        </div>
      </div>
    </div>
  );
}