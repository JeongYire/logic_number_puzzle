import { GameBlock } from "../types";


class SudokuLogic{

    childLogic : SudokuLogic | null;
    blockArray : GameBlock[] = [];
    myBlock : GameBlock;

    constructor(blockArray : GameBlock[],myBlock : GameBlock){
        this.childLogic = null;
        this.blockArray = blockArray;
        this.myBlock = myBlock;
    }

    private vaildCheck = (gameBlock : GameBlock) => {
        

        if(gameBlock.isDetect) return true;
    
        if(gameBlock.value == 0){
            return false;
        }
    
        const blockAddressCheck = this.blockArray.some(obj => {
    
            /**
             * 같은 구역내에 숫자가 같으면 안됩니다...
             */
            const checkOne = obj.blockAddress == gameBlock.blockAddress;
            if(checkOne){
               // console.log("여기서 걸림 2");
            }
    
            /**
             * 같은 열내에 숫자가 같으면 안됩니다...
             */
            const checkTwo = obj.row == gameBlock.row;
            if(checkTwo){
                //console.log("여기서 걸림 3");
            }
            /**
             * 같은 행내에 숫자가 같으면 안됩니다...
             */
            const checkThree = obj.col == gameBlock.col;
            if(checkThree){
              //  console.log("여기서 걸림 4");
            }
    
            return obj.id != gameBlock.id && (checkOne || checkTwo || checkThree) &&  obj.value == gameBlock.value;
        }
        );

        return !blockAddressCheck;
    
    }

    private getCandidateValue = () => {

        const candidateValue = [];
        const candidateValueLength = 9;
   
        for(let i = 0; i < candidateValueLength; i++){

            const chooseValue = i+1;

            this.myBlock.value = chooseValue;
            const isVaild = this.vaildCheck(this.myBlock);
            if(isVaild){
                candidateValue.push(chooseValue);
            }
            this.myBlock.value = 0;
        
        }

        return candidateValue;

    }

    calculateAction = () => {

        const candidateValue = this.getCandidateValue();
        const candidateValueLength = candidateValue.length;

        if(this.childLogic == null){
            console.log("끝에 다다름...");
        }

        if(candidateValueLength == 0){
            return false;
        }

        if(this.childLogic == null){
            return true;
        }

        let failCount = 0;

        for (let i = 0; i < candidateValueLength; i++) {
  
            this.myBlock.value = candidateValue[i];
    
            if (this.childLogic.calculateAction()) {
                return true; 
            } else {
                failCount++;
                this.myBlock.value = 0;
            }

           
        }

        return failCount < candidateValueLength; 
    }

}

class SudokuLogicManager {

    blockArray : GameBlock[] = [];

    constructor(){
        this.init();
    }

    init = () => {
        while(true){
            this.blockArray = this.initBlockArray();
            this.initBlockValue();

            if(this.integrityCheck()){
               
                break;
            }else{
                console.log("다시 만듭니다...");
            }
        }

    }

    private vaildCheck = (gameBlock : GameBlock) => {
    
        if(gameBlock.isDetect) return true;
    
       // console.log(gameBlock.id);
        //console.log(gameBlock);
    
        if(gameBlock.value == 0){
            console.log("여기서 걸림 1.5");
            return false;
        }
    
        const blockAddressCheck = this.blockArray.some(obj => {
    
            /**
             * 같은 구역내에 숫자가 같으면 안됩니다...
             */
            const checkOne = obj.id != gameBlock.id && obj.blockAddress == gameBlock.blockAddress && obj.value == gameBlock.value;
            if(checkOne){
                console.log("여기서 걸림 2");
            }
    
            /**
             * 같은 열내에 숫자가 같으면 안됩니다...
             */
            const checkTwo = obj.id != gameBlock.id && obj.row == gameBlock.row && obj.value == gameBlock.value;
            if(checkTwo){
                console.log("여기서 걸림 3");
            }
            /**
             * 같은 행내에 숫자가 같으면 안됩니다...
             */
            const checkThree = obj.id != gameBlock.id && obj.col == gameBlock.col && obj.value == gameBlock.value;
            if(checkThree){
                console.log("여기서 걸림 4");
            }
    
            return (checkOne || checkTwo || checkThree)/* && obj.guessValue == gameBlock.value */;
        }
        );

        //console.log("blockAddressCheck : " + blockAddressCheck);
    
        return !blockAddressCheck;
    
    }

    private initBlockArray = () => {

        const blockArray : GameBlock[] = new Array();
    
        for(let col = 0; col < 9; col++){
    
            for(let row = 0; row < 9; row++){
    
            
                /**
                 * [0,0] [1,0] [2,0]
                 * [0,1] [1,1] [2,1]
                 * [0,2] [1,2] [2,2]
                 * 
                 * 6,4 = 5
                 * 6,5 = 5
                 * 6,6 = 5
                 */
    
                const index = ( col * 9 ) + row;
                let valueObject : GameBlock = {
                    id : index,
                    row : row+1,
                    col : col+1,
                    value : 0,
                    isDetect : false,
                    blockAddress : Math.floor(col / 3) * 3 + Math.floor(row / 3) + 1,
                }
    
        
                blockArray.push(valueObject);
            }
        }
    
    

        return blockArray;
    
    }

    private initBlockValue = () => {

        const initBlockValueAndCheck = (gameBlock : GameBlock) => {


            const candidateValue = [1,2,3,4,5,6,7,8,9];
            let returnValue = false;
            
            while(true){
    
                const candidateValueLength = candidateValue.length;
         
                if(candidateValueLength <= 0){
                    console.log("오류...");
                    returnValue =  false;
                    break;
                }
    
                const candidateValueRandomCount = Math.floor(Math.random() * candidateValueLength);
                const chooseValue = candidateValue[candidateValueRandomCount];
    
                gameBlock.value = chooseValue;
                const isVaild = this.vaildCheck(gameBlock);

                if(isVaild){
                    gameBlock.isDetect = true;
                    returnValue =  true;
                    break;
                }else{
                    gameBlock.value = 0;
                }
        
                candidateValue.splice(candidateValueRandomCount,1);
    
            }

            return returnValue;
    
        }


        // 초기값을 채워넣을 횟수를 말합니다.
        const initLength = 15;
    
        const arrayLength = this.blockArray.length;
    
        let roopCount = 0;
        let successCount = 0;
    
        while(true){
            
            const blockArrayRandomCount = Math.floor(Math.random() * arrayLength);
    
            if(this.blockArray[blockArrayRandomCount].isDetect == true){
                continue;
            }

            if(!initBlockValueAndCheck(this.blockArray[blockArrayRandomCount])){
                continue;
            }


            successCount++;
            roopCount++;
    
            if(successCount >= initLength){
                break;
            }
    
            
            if(roopCount >= 1000){
                break;
            }
        }

    }

    problemCheck = () => {

        const arrayLength = this.blockArray.length;
    
        for(let i = 0; i < arrayLength; i++){
            if(!this.vaildCheck(this.blockArray[i])){
                alert("땡~")
                return;
            };
        }
    
        alert("다맞음!!!");
        
    }

    integrityCheck = () => {
        console.log("유효성 검사 실시");
        const filterArray = this.blockArray.filter(obj => !obj.isDetect);
        const logicArray : SudokuLogic[] = new Array();
        filterArray.map((obj,index) => {

            const logicObject = new SudokuLogic(this.blockArray,obj);
            if(index - 1 >= 0){
                const parentLogicObject = logicArray[index-1];
                parentLogicObject.childLogic = logicObject;
            }
            logicArray.push(logicObject);

        })

        const calculateResult = logicArray[0].calculateAction();
        console.log("유효성 검사 결과 : " + calculateResult);
        return calculateResult;
    } 
    
}

const LogicManager = new SudokuLogicManager();


export default LogicManager;