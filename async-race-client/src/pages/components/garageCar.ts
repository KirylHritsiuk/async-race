import { ICarBody, ICarResponse } from "../../restApi/template";
import { easeInOut } from "./animationCar";
import { Car } from "./templateCar";


export class GarageCar extends Car {
    static DataObject = {
        height: '1.5em',
        weight: '4em',
    }
    constructor(
        data: ICarResponse,
        height: string = GarageCar.DataObject.height, 
        weight: string = GarageCar.DataObject.weight) {
      super(data, height, weight)
    }
}


