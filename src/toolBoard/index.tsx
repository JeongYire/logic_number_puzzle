import SudokuManager from "../logicManager";
import useGameStore from "../store";


const ToolBoard = () => {

    const TOOLBOARD_WIDTH = 150;
    const TOOLBOARD_HEIGHT = 600;

    const blockArray = useGameStore((state) => state.blockArray); 

    return (
      <>
        <div style={{
            width : TOOLBOARD_WIDTH,
            height : TOOLBOARD_HEIGHT,
            border : 1,
            borderColor : 'black',
            borderStyle : 'groove' 
        }}>
          <button onClick={() => {
            SudokuManager.integrityCheck();
          }}>검증하기</button>
        </div>
      </>
    )
  }
  
export default ToolBoard;
  