import { ICarBody, ICarResponse, IWinResponse } from '../../restApi/template';
import { WinnerCar } from '../components/winnerCar';
import { getPageFromLocalStorage, obj } from '../garage/garage';
import { Car } from './templateCar';
let count = 1;
export  class WinRow {
    private container: HTMLElement;
    private car: WinnerCar;
    static TextObject = {
        row: 'row_container',
        position: 'winner_position',
        car: 'winner_car',
        name: 'winner_name',
        wins: 'winner_wins',
        time: 'winner_time',
        winner: 'winner'
    }
    mark: string;
    constructor(private data: IWinResponse, private carData: ICarResponse ) {
        this.container = document.createElement('div');
        this.container.className =`${WinRow.TextObject.row} ${WinRow.TextObject.winner}`;
        this.container.id = data.id.toString();
        this.container.dataset.mark = carData.name; 
        this.data = data;
        this.carData = carData;
        this.mark = carData.name;
        this.car = new WinnerCar(this.carData);
    }

    private createPositionNumberCol(className: string, pos: number) {
        const controls = document.createElement('div');
        controls.className = className;
        controls.innerHTML = `<h6 class="positionNumber">${pos}</h6>`
        return controls;
    }
    private createCarCol(className: string) {
        const controls = document.createElement('div');

        controls.className = className;
        controls.append(this.car.create())
        return controls;
    }
    private createNameCol(className: string, name: string = 'Name') {
        const container = document.createElement('div');
        container.className =className;
        container.innerHTML =  `<h6 class="">${this.carData.name}</h6>`
      return container
    }
    private createWinsCol(className: string) {
        const container = document.createElement('div');
        container.className = className;
        container.innerHTML = `${this.data.wins}`
        return container;
    }
    private createTimeCol(className: string) {
        const container = document.createElement('div');
        container.className = className;
        container.innerHTML = `${this.data.time}`
        return container;
    }
    render (pos: number) {
        const [number, car, name, wins, time] = [
            this.createPositionNumberCol(WinRow.TextObject.position, pos),
            this.createCarCol(WinRow.TextObject.car),
            this.createNameCol(WinRow.TextObject.name),
            this.createWinsCol(WinRow.TextObject.wins),
            this.createTimeCol(WinRow.TextObject.time),];
        this.container.append(number);
        this.container.append(car);
        this.container.append(name);
        this.container.append(wins);
        this.container.append(time);
        return this.container;
    } 
}