import { GameBlock } from "../types";

/*
class LogicManagerClass {

    blockArray : GameBlock[] = [];

    constructor(){
        this.blockArray = [];
    }

}
*/



const InitializeBlockArray = () => {

    const blockCount = 81;
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
                guessValue : 0,
                blockAddress : Math.floor(col / 3) * 3 + Math.floor(row / 3) + 1,
            }

    
            blockArray.push(valueObject);
        }
    }


    InitializeBlockValue(blockArray);
    console.log(blockArray);

    return blockArray;

}

const InitializeBlockValue = (blockArray : GameBlock[]) => {


    // 초기값을 채워넣을 횟수를 말합니다.
    const initLength = 40;

    const arrayLength = blockArray.length;

    let roopCount = 0;
    let successCount = 0;

    while(true){
        
        const randomCount = Math.floor(Math.random() * arrayLength);

        if(blockArray[randomCount].guessValue != 0){
            continue;
        }

        if(!VaildCheckBlock(blockArray[randomCount],blockArray)){
            continue;
        }

        successCount++;
        roopCount++;

        if(successCount >= initLength){
            console.log("굿이다");
            break;
        }

        
        if(roopCount >= 10000){
            console.log("노답");
            break;
        }
    }

    console.log(successCount);
}

const VaildCheckBlock = (gameBlock : GameBlock,blockArray : GameBlock[]) : boolean => {

    const candidateValue = [1,2,3,4,5,6,7,8,9];
    let returnCheck = true;

    while(true){

        const valueLength = candidateValue.length;
        if(valueLength == 0) {
          //  console.log("오류...");
            returnCheck = false;
            break;
        };

        const randomCount = Math.floor(Math.random() * valueLength);
        const chooseValue = candidateValue[randomCount];

        
        const blockAddressCheck = blockArray.some(obj => {

            /**
             * 같은 구역내에 숫자가 같으면 안됩니다...
             */
            const checkOne = obj.blockAddress == gameBlock.blockAddress;

            /**
             * 같은 열내에 숫자가 같으면 안됩니다...
             */
            const checkTwo = obj.row == gameBlock.row;

            /**
             * 같은 행내에 숫자가 같으면 안됩니다...
             */
            const checkThree = obj.col == gameBlock.col;

            return (checkOne || checkTwo || checkThree) && obj.guessValue == chooseValue;
        }
        );


        if(!blockAddressCheck){
            gameBlock.guessValue = chooseValue;
            break;
        }

        candidateValue.splice(randomCount,1);


    }

    return returnCheck;


}

const VaildCheck = (gameBlock : GameBlock,blockArray : GameBlock[]) => {

    console.log("ID : " + gameBlock.id);

    if(gameBlock.value == 0 && gameBlock.guessValue == 0){
 
        console.log("여기서 틀림 1");
        return false;
    }

    const blockAddressCheck = blockArray.some(obj => {

        /**
         * 같은 구역내에 숫자가 같으면 안됩니다...
         */
        const checkOne = obj.blockAddress == gameBlock.blockAddress && obj.guessValue == gameBlock.value;
        if(checkOne){
            console.log("여기서 틀림 2");
        }

        /**
         * 같은 열내에 숫자가 같으면 안됩니다...
         */
        const checkTwo = obj.row == gameBlock.row && obj.guessValue == gameBlock.value;
        if(checkTwo){
            console.log("여기서 틀림 3");
        }
        /**
         * 같은 행내에 숫자가 같으면 안됩니다...
         */
        const checkThree = obj.col == gameBlock.col && obj.guessValue == gameBlock.value;
        if(checkThree){
            console.log("여기서 틀림 4");
        }

        return (checkOne || checkTwo || checkThree)/* && obj.guessValue == gameBlock.value */;
    }
    );

    return !blockAddressCheck;

}

const ProblemCheck = (blockArray : GameBlock[]) => {

    console.log(blockArray);
    const arrayLength = blockArray.length;

    for(let i = 0; i < arrayLength; i++){
        if(!VaildCheck(blockArray[i],blockArray)){
            alert("땡~")
            return;
        };
    }

    alert("다맞음!!!");
    
}

const LogicManager = {
    initializeBlockArray : InitializeBlockArray,
    problemCheck : ProblemCheck,
}



export default LogicManager;