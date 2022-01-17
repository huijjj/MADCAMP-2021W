const ProgressBar = (props) => {
  const { bgcolor, stamina, staminaMAX } = props;
  const staminaNew = (stamina < 0) ? 0 : stamina

  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
  }

  const fillerStyles = {
    height: '100%',
    width: `${(staminaNew/staminaMAX) * 100}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right',
    textJustify: 'center'
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${staminaNew}/${staminaMAX}`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;