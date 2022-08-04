import GarageApi from '../../restApi/garage'
import { ICarBody, ICarResponse, IWinResponse } from '../../restApi/template';
import { CarRow } from './carRow';
import { updateTitle } from './updateTitle'
import { randModel } from './randomCarName';
import { randIndex } from './randomCarName';
import { randomColor } from './randomColor';
export class Buttons {
   static nameUpdate: HTMLInputElement = document.querySelector("#updateName")!;
   static colorUpdate: HTMLInputElement = document.querySelector("#updateColor")!;

    static async create() {
        const container: HTMLElement = document.querySelector('.pagination_rows');
        const nameCreate: HTMLInputElement = document.querySelector("#createName");
        const colorCreate: HTMLInputElement = document.querySelector("#createColor");
        updateTitle(1)
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
        updateTitle(100)
        for(let i = 0; i < 100; i++){
            const data: ICarBody = {
                name: randModel(randIndex()),
                color: randomColor()
            }
            const body: ICarResponse =  await GarageApi.create(data)
            if(container.children.length < 7) {
                const row = new CarRow(body);
                container.append(row.render());
            }
        }
    }
    static async update(){
       const [name, color, btn] =  [
        <HTMLInputElement> document.querySelector('#updateName'),
        <HTMLInputElement>document.querySelector('#updateColor'),
        <HTMLButtonElement>document.querySelector('#updateBtn')]
        const body = {
            name: name.value,
            color: color.value,
        }
        await GarageApi.update(btn.value, body);
        btn.disabled = true;
        name.disabled = true;
        name.value = '';
        const data: ICarResponse =  await GarageApi.getOnce(btn.value);
        const container: HTMLElement = document.querySelector('.pagination_rows');
        const row = document.getElementById(`${btn.value}`);
        const createRow = new CarRow(data);
        const node = container.replaceChild(createRow.render(), row )
        console.log(container)
    }
    static async race(){}
    static async reset(){}
    static async delete(id: string){
        await GarageApi.delete(id);
    }
}

