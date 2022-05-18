export default function ItemListItem({ count, type, stat, onClick }) {
  const imgSrc = `/images/items/${type}.png`;

  return (
    <div onClick={() => onClick(type)} style={{display: "flex", flexDirection: "column", padding: "1rem"}}>
      <div style={{display: "flex", width: "100%"}}>
        <img style={{ objectFit :"cover", width: "7rem", height: "7rem"}} alt={`${type}.png`} src={imgSrc} />
        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
          <div>
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
              <div>{`${type === "rose" ? "흑장미" : type === "dumbell" ? "아령" : "책"}`}&nbsp;&nbsp;</div>
              <div>{count}</div>
            </div>
            <br></br>
            <br></br>
          </div>
          <div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>지: &nbsp;</div>
                <div>{stat.geee}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>덕: &nbsp;</div>
                <div>{stat.duck}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>체: &nbsp;</div>
                <div>{stat.chae}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}