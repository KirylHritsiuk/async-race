import GarageApi from '../../restApi/garage'
import { ICarBody, ICarResponse, IWinResponse } from '../../restApi/template';
import { CarRow } from './carRow';
import { incrCount } from '../components/count'
import{ randModel } from '../components/randomCarName';
import{ randIndex } from '../components/randomCarName';
import { randomColor } from '../components/randomColor';
export class Buttons {
   static nameUpdate: HTMLInputElement = document.querySelector("#updateName")!;
   static colorUpdate: HTMLInputElement = document.querySelector("#updateColor")!;

    static async create() {
        const container: HTMLElement = document.querySelector('.pagination_rows');
        const nameCreate: HTMLInputElement = document.querySelector("#createName");
        const colorCreate: HTMLInputElement = document.querySelector("#createColor");
        incrCount(1)
        const data: ICarBody = {
            name: nameCreate.value,
            color: colorCreate.value,
        }

       const body: ICarResponse =  await GarageApi.create(data)
        console.log(data);
        const row = new CarRow(body);
        if(container.children.length < 7) container.append(row.render());
       return body;
    }
    static async generate() {
        const container: HTMLElement = document.querySelector('.pagination_rows');
        incrCount(100)
        for(let i = 0; i < 99; i++){
            const data: ICarBody = {
                name: randModel(randIndex()) ,
                color: randomColor()
            }
            const body: ICarResponse =  await GarageApi.create(data)
            if(container.children.length < 7) {
                const row = new CarRow(body);
                container.append(row.render());
            }
        }
    }
    update(){}
    race(){}
    reset(){}
}

