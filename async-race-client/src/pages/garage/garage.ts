import { Page } from '../components/templatePage'
export class Garage extends Page {
    static TextObject = {
        Class: 'garage',
        Title: 'Garage',
        GarageForm: 'form',
        GarageTitleClass: 'garage_title',
        Count: '4',
        Page: '1',
        GaragePages: 'garage_pagination',
    }
    constructor(id: string) {
        super(id);
    }
    private createGarageForm(initClass: string) {
        const form = document.createElement('form');
        form.className = initClass;
        form.innerHTML = `<label for="create">
        <input class="form__input" type="text">
        <input class="form__color" type="color">
        <button class="button btn-1" type="submit" value="CREATE">CREATE</button>
    </label>
    <label for="update">
        <input class="form__input" type="text">
        <input class="form__color" type="color">
        <button class="button btn-1" type="submit" value="UPDATE">UPDATE</button>
    </label>
    <label for="">
        <button class="button btn-1" type="button" value="RACE">RACE</button>
        <button class="button btn-2" type="reset" value="RESET">RESET</button>
        <button class="button btn-1" type="button" value="GENERATE CARS">GENERATE CARS</button>
    </label>`
        return form;
    }
    render (){
        const [form, title, pagination] = [
            this.createGarageForm(Garage.TextObject.GarageForm),
            this.createTitle(Garage.TextObject.GarageTitleClass,Garage.TextObject.Title, Garage.TextObject.Count),
            this.createPagination(Garage.TextObject.GaragePages, Garage.TextObject.Page)
        ];
        this.container.append(form);
        this.container.append(title);
        this.container.append(pagination);
        return this.container;
    }
}
