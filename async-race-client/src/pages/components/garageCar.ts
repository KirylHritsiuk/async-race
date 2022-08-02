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
    
    // startAnimation(duration, (progress) => {
    //     const translate = easeInOut(progress) * distance;
    //     this.container.style.transform = `translateX(${translate}px)`;
        
    // }): typeof startAnimation{
    //     let startAnimation = 0;
    //     requestAnimationFrame(function animationCar(time: number){
    //         if(!startAnimation){
    //             startAnimation = time;
    //         }
    //         const progress = (time - startAnimation) / duration;
    //         callback(progress);
            
    //         if(progress < 1) {
    //             requestAnimationFrame(animationCar);
    //         }
    //     }) 
    // }
}


