
import useGameStore from "../store";
import GameBlock from "./gameBlock";


const GameBoard = () => {

    const GAMEBOARD_WIDTH = 650;
    const GAMEBOARD_HEIGHT = 600;

    const blockArray = useGameStore((state) => state.blockArray); 

    return (
      <>
        <div style={{
            width : GAMEBOARD_WIDTH,
            height : GAMEBOARD_HEIGHT,
            border : 1,
            borderColor : 'black',
            borderStyle : 'groove',
            display : "grid",
        }}>
          {
            blockArray.map(obj => {
              return  <GameBlock key={'block_' + obj.id} id={obj.id} col={obj.col} row={obj.row} value={obj.value} guessValue={obj.guessValue}/>
            })
          }
        </div>
      </>
    )
  }
  
export default GameBoard;
  