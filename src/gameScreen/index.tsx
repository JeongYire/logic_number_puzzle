

const GameScreen = (props  : {children : JSX.Element}) => {

    

    return (
      <>
        <div style={{
          display : "flex",
        }}>
            {props.children}
        </div>
      </>
    )
  }
  
export default GameScreen;
  