import GarageApi from '../../restApi/garage'
import { ICarBody, ICarResponse, IQueryParams, IWinResponse, urlData } from '../../restApi/template';
import { CarRow } from './carRow';
import { updateTitle } from './updateTitle'
import { randModel } from './randomCarName';
import { randIndex } from './randomCarName';
import { randomColor } from './randomColor';
import { startAnim } from './animationCar';
import { setWinner } from './setWinner'
export interface ICarAndId {
    id: string,
    car: HTMLDivElement
}
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
        container.replaceChild(createRow.render(), row )
        console.log(container)
    }
    static async race(){
        const startButtons = <NodeListOf<HTMLButtonElement>>document.getElementsByName('startBtn');
        const stopButtons = <NodeListOf<HTMLButtonElement>>document.getElementsByName('stopBtn');
       
        const race: HTMLButtonElement = document.querySelector('#raceBtn');
        const reset: HTMLButtonElement = document.querySelector('#resetBtn');
        race.disabled = true;
        reset.disabled = false;
        const rows = <NodeListOf<HTMLDivElement>>document.querySelectorAll('.row_container');
        const id: string[] = [];
        rows.forEach(el => id.push(el.id))
        startButtons.forEach(el => el.disabled = true )
    
        const  winner = await Promise.any(id.map(startAnim))
  
        const winTitle = document.getElementById('win');
        setWinner(winner);
        console.log(winner)
        setTimeout( () => {
           GarageApi.getOnce(winner.id)
            .then(val => {winTitle.textContent = `${val.name} WIN! ${winner.time/1000}s`
            winTitle.style.visibility = 'visible'})
        }, winner.time)
      
    }
    static reset(){
        const stopButtons = <NodeListOf<HTMLButtonElement>>document.getElementsByName('stopBtn');
        const race: HTMLButtonElement = document.querySelector('#raceBtn');
        const reset: HTMLButtonElement = document.querySelector('#resetBtn');
        const title: HTMLElement = document.getElementById('win');
        title.style.visibility = 'hidden'
        stopButtons.forEach(el => el.click())
        reset.disabled = true;
        race.disabled = false;
    }
    static async delete(id: string){
        await GarageApi.delete(id);
    }
}

