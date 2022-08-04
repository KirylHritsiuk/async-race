import { engineStatusData, IEngineStartStopResponse }from '../../restApi/engine'
import engineStatus from '../../restApi/engine'
import { IQueryParams } from '../../restApi/template';
import { urlData } from '../../restApi/template';
const duration = 1000; // растояние
const distance = 500; // время

const obj1: IQueryParams[] =[
    {
        key: urlData.id,
        value: '1'
    },
    {
        key: urlData.status,
        value: engineStatusData.started
    }
]
const obj2: IQueryParams[] =[
    {
        key: urlData.id,
        value: '1'
    },
    {
        key: urlData.status,
        value: engineStatusData.drive
    }
]


export function easeInOut(time: number): number {
    return 0.5 * (1 - Math.cos(Math.PI*time));
}

export function getDistance(){
    const bodyWight = document.body.offsetWidth;
    const row: HTMLDivElement = document.querySelector('.row_container');
    const carStartPos = 100;
    const rowWight = row.offsetWidth;
    const endRoad = rowWight + (bodyWight - rowWight/2)
    const distance = endRoad - (bodyWight - rowWight/2) - carStartPos*1.25; 
    return distance;
}

export async function getTime(id: string): Promise<number>{
    console.log('get time')
    obj1[0].value = id;
    const response = <IEngineStartStopResponse>(await engineStatus.updateStatus(obj1));
    console.log(response.velocity)
    const time = (response.distance / response.velocity);
    return time
}
export let requestId: number;
export function startAnimation(car: HTMLElement, duration: number, callback = (progress: number) => {

    const translate = easeInOut(progress) * getDistance();
    car.style.transform = `translateX(${translate}px)`;
    
}): void{

    let startAnimation: number;

    requestId =  requestAnimationFrame(function animationCar(time: number){
        if(!startAnimation){
            startAnimation = time;
        }

        const progress = (time - startAnimation) / duration;
        
        callback(progress);
        
        if(progress < 1) {
            requestId = requestAnimationFrame(animationCar);
        }
    })
     
}


