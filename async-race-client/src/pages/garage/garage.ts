import { Page } from '../components/templatePage';
import GarageApi  from '../../restApi/garage'
import { Api, ICarResponse, IQueryParams, urlData } from '../../restApi/template';
import { CarRow } from '../components/carRow';
import { Buttons } from "../components/buttons"

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
    async render () {
        const cars = await this.api.getAll();
        const [
            form, 
            title, 
            pagination
        ] = [
            this.createGarageForm(Garage.TextObject.GarageForm),
            this.createTitle(
                Garage.TextObject.GarageTitleClass,
                Garage.TextObject.Title,
                cars.length.toString()),
            this.createPagination(Garage.TextObject.GaragePages, garagePagData.page)
        ];
        this.container.append(form);
        this.container.append(title);
        this.container.append(pagination);

        
       
        return this.container;
    }
    async renderRow () {
        const container: HTMLElement = document.querySelector('.pagination_rows')!;
        const response = await this.api.getPage(getPageFromLocalStorage(obj))
        for(let i = 0; i < response.data.length; i++){
            const carRow = new CarRow(response.data[i]);
            container.append(carRow.render());
        } 
        return container;
    }
}

function getPageFromLocalStorage(obj:IQueryParams[]): IQueryParams[]{
    if(localStorage.getItem('page')){
        console.log('if get');
        const data = localStorage.getItem('page')
        return JSON.parse(data);
    }
    else {
        localStorage.setItem('page', JSON.stringify(obj));
        console.log('set');
        return obj
    }

}