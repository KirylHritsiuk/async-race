import { modelsBase } from "../../carsDataBase/carsMark";

export function randIndex (){
    const [min, max] = [0, modelsBase.length ]
    const index = Math.round(min - 0.5 + Math.random() * (max - min + 1));
    return index;
}
export  function randModel (index:number){
    const [min, max] = [0, modelsBase[index].model.length]
    const modelIndex = Math.round( min - 0.5 + Math.random() * (max - min + 1));
    const data = `${modelsBase[index].mark} ${modelsBase[index].model[modelIndex]}`
    return data;
}
