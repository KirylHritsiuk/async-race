import { ICarBody, ICarResponse } from "../../restApi/template";
import { easeInOut } from "./animationCar";
import { Car } from "./templateCar";


export class GarageCar extends Car {
    static DataObject = {
        height: '1.5em',
        weight: '4em',
        position: 'absolute'
    }
    constructor(
        data: ICarResponse,
        height: string = GarageCar.DataObject.height, 
        weight: string = GarageCar.DataObject.weight, 
        position: string = GarageCar.DataObject.position) {
      super(data, height, weight, position)
    }
}


