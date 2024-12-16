import useGameStore from "../../store";


const GameBlock = (props : {id : number,col : number,row : number,value : number,isDetect : boolean}) => {

  
    const borderBottomCheck = (props.col) % 3 == 0 && (props.col) < 9;
    const borderRightCheck = (props.row) % 3 == 0 && (props.row) < 9;

    const setGameBlock = useGameStore(state => state.setGameBlock);

    return (
      <>
        <div style={{
            border : 1,
            borderColor : 'black',
            borderStyle : 'solid',
            display : "grid",
            gridRow : props.col,
            gridColumn : props.row,
            borderRightColor : borderRightCheck ? "red" : "black",
            borderBottomColor : borderBottomCheck ? "red" : "black",
            borderRightWidth : borderRightCheck ? 2 : 1,
            borderBottomWidth : borderBottomCheck ? 2 : 1,
        }}>
            {
               props.isDetect? 
               <div style={{
                width : '100%',
                height : '100%',
                position : 'relative',
                display : 'flex',
                justifyContent:'center',
                alignItems : 'center',
               }}>
                 <span style={{
                    position : 'absolute',
                    fontSize : '3em',
                    color : 'blue',
                 }}>
                    {props.value}
                 </span>
                </div>
               :
               <div style={{
                width : '100%',
                height : '100%',
                position : 'relative',
                display : 'flex',
                justifyContent:'center',
                alignItems : 'center',
               }}>
                  <input
                    style={{
                      width:'calc(100% - 10px)',
                      height:'calc(100% - 10px)',
                      fontSize : '3em',
                      textAlign : 'center',
                      justifyContent:'center',
                      display:'flex',
                    }}

                    onChange={(e) => {
                      if(Number.isNaN(Number(e.currentTarget.value))){
                        setGameBlock(props.id,0);
                      }else{
                        setGameBlock(props.id,Number(e.currentTarget.value));
                      } 
                    }}
                  />
                </div>
            }
        </div>
      </>
    )
  }
  
export default GameBlock;
  