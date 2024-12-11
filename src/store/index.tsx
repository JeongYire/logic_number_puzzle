import { create } from "zustand";
import LogicManager from "../logicManager";
import { GameBlock } from "../types";

type GameStorage = {
    blockArray : GameBlock[],
    setBlockArray : (array : GameBlock[]) => void,
    setGameBlock : (id : number,value : number) => void,
}

const useGameStore = create<GameStorage>((set,get) => ({
    blockArray : LogicManager.initializeBlockArray(),
    setBlockArray : () => {

     
    },
    setGameBlock : (id : number,value : number) => {
        
        console.log("setGameBlock");

        const getState = get();
        const findIndex = getState.blockArray.findIndex(obj => obj.id == id);

        console.log(findIndex);
        console.log(value);

        getState.blockArray[findIndex].value = value;

        set(({
            blockArray : getState.blockArray,
        }))

    }
}))

export default useGameStore;