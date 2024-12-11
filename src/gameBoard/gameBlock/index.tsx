import useGameStore from "../../store";


const GameBlock = (props : {id : number,col : number,row : number,value : number,guessValue : number}) => {

    console.log("렌더링 + " + props.id)

    const borderBottomCheck = (props.col) % 3 == 0 && (props.col) < 9;
    const borderRightCheck = (props.row) % 3 == 0 && (props.row) < 9;

    const setGameBlock = useGameStore(state => state.setGameBlock);

    return (
      <>
        <div style={{
            border : 1,
            borderColor : 'black',
            borderStyle : 'groove',
            display : "grid",
            gridRow : props.col,
            gridColumn : props.row,
            borderRightColor : borderRightCheck ? "red" : "black",
            borderBottomColor : borderBottomCheck ? "red" : "black",
            borderRightWidth : borderRightCheck ? 2 : 1,
            borderBottomWidth : borderBottomCheck ? 2 : 1,
        }}>
            {
               props.guessValue != 0 ? 
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
                 }}>
                    {props.guessValue}
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
                 <input style={{
                    position:'absolute',
                    width:'calc(100% - 10px)',
                    height:'calc(100% - 10px)',
                    textAlign : 'center',
                    fontSize : '3em',
                 }}
                 
                 onChange={(e) => {
                    if(Number.isNaN(e.target.value)){
                        setGameBlock(props.id,0);
                    }else{
                        setGameBlock(props.id,Number(e.target.value));
                    }
                 }}

                 maxLength={1}
                 />
                </div>
            }
        </div>
      </>
    )
  }
  
export default GameBlock;
  