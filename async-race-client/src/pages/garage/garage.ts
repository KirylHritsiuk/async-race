import { Page } from '../components/templatePage';
import GarageApi  from '../../restApi/garage'
import { Api, ICarResponse, IQueryParams, urlData } from '../../restApi/template';
import { CarRow } from '../components/carRow';
import { Buttons } from "../components/buttons"
import { pagListener } from '../components/listeners/pagination/garage';
import { ITimeResponse2 } from '../components/animationCar';

export const enum garagePagData {
    page = '1',
    limit = '7' 
}
export const obj: IQueryParams[] = [
    {
        key: urlData.page,
        value: garagePagData.page
    },
    {
        key: urlData.limit,
        value: garagePagData.limit
    },
]
export class Garage extends Page {
    api: Api<ICarResponse>;
    static TextObject = {
        Class: 'garage',
        Title: 'Garage',
        GarageForm: 'form',
        GarageTitleClass: 'garage_title',
        Count: '',
        Page: '1',
        GaragePages: 'garage_pagination',
        GaragePath:'/garage',
        Win: 'win'
    }

    constructor(id: string) {
        super(id);
        this.api = GarageApi;
    }
    private createGarageForm(initClass: string) {
        const form = document.createElement('form');
        form.id = 'form';
        form.className = initClass;
        form.innerHTML = `<div id="create">
        <input id="createName" class="form__input" type="text"  placeholder="Enter mark car" >
        <input id="createColor" class="form__color" type="color">
        <button id="createBtn" class="button btn-1" type="button">CREATE</button>
    </div>
    <div id="update">
        <input id="updateName" class="form__input" type="text" placeholder="Select mark car on page" disabled>
        <input id="updateColor" class="form__color" type="color">
        <button id="updateBtn" class="button btn-1" type="button" disabled>UPDATE</button>
    </div>
    <div>
        <button id="raceBtn" class="button btn-1" type="button">RACE</button>
        <button id="resetBtn"class="button btn-2" type="button" disabled>RESET</button>
        <button id="generateBtn"class="button btn-1" type="button">GENERATE CARS</button>
    </div>`
        return form;
    }
    viewWinner(){
        const title = document.createElement('h2');
        title.className = Garage.TextObject.Win;
        title.id = Garage.TextObject.Win;
        title.style.position = 'absolute';
        return title;
    }
    async render () {
        const cars = await this.api.getAll();
        const [
            form, 
            title, 
            pagination,
            win
        ] = [
            this.createGarageForm(Garage.TextObject.GarageForm),
            this.createTitle(
                Garage.TextObject.GarageTitleClass,
                Garage.TextObject.Title,
                cars.length.toString()),
            this.createPagination(Garage.TextObject.GaragePages, garagePagData.page),
            this.viewWinner()
        ];
        this.container.addEventListener('click', async(e) =>  await pagListener(e))
        this.container.append(form);
        this.container.append(title);
        this.container.append(pagination);
        this.container.append(win)
        return this.container;
    }
    async renderRow () {
        const container: HTMLElement = document.querySelector('.pagination_rows')!;
        const response = await this.api.getPage(getPageFromLocalStorage(obj, Garage.TextObject.Class))
        for(let i = 0; i < response.data.length; i++){
            const carRow = new CarRow(response.data[i]);
            container.append(carRow.render());
        } 
        return container;
    }
}

export function getPageFromLocalStorage(obj:IQueryParams[], key: string): IQueryParams[]{
    if(localStorage.getItem(key)){
        console.log('if get');
        const data = sessionStorage.getItem(key)
        return JSON.parse(data);
    }
    else {
        sessionStorage.setItem(key, JSON.stringify(obj));
        console.log('set');
        return obj
    }

}