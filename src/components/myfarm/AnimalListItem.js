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
  const imgSrc = `/images/${type}.png`;

  return (
    <div onClick={() => onClick(id, name)} style={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
      <div style={{display: "flex"}}>
        <img style={{ objectFit :"cover", width: "7rem", height: "7rem", marginRight: "0.5rem" }} alt={`${type}.png`} src={imgSrc} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <div style={{ fontWeight: "bold", marginTop: "0.5rem"}}>{name} ({sex})</div>
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