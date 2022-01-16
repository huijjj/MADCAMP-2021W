export default function ItemListItem({ item, type, onClick }) {
  const imgSrc = `/images/items/${type}.png`;

  return (
    <div onClick={() => onClick(type, item)} style={{display: "flex", flexDirection: "column", margin: "1rem"}}>
      <div style={{display: "flex"}}>
        <img style={{ objectFit :"cover", width: "7rem", height: "7rem"}} alt={`${type}.png`} src={imgSrc} />
        <div style={{display: "flex", flexDirection: "column"}}>
          <div>
            <div>{type}</div>
            <br></br>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}