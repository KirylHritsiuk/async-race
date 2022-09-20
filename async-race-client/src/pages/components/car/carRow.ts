import finishSVG from '../../../common/svg/finish';
import { ICarResponse } from '../../../restApi/template';
import GarageCar from './garageCar';

class CarRow {
  private container: HTMLElement;

  private car: GarageCar;

  static TextObject = {
    Row: 'row_container',
    Options: 'car_options',
    Controls: 'car_controls',
    Road: 'car__road',
    Finish: 'car_finish',
  };

  mark: string;

  private static createCarControls(className: string) {
    const controls = document.createElement('div');
    controls.className = className;
    controls.innerHTML = `<button id="startCar" class="button btn-1" name="startBtn" type="button">A</button>
                              <button id="stopCar" class="button btn-2" name="stopBtn" type="button" disabled>B</button>`;
    return controls;
  }

  private static createCarRoad(className: string) {
    const road = document.createElement('hr');
    road.className = className;
    return road;
  }

  private static createCarFinish(className: string) {
    const container = document.createElement('div');
    container.className = className;
    container.innerHTML = finishSVG;
    return container;
  }

  private static createCarOptions(className: string, mark: string) {
    const controls = document.createElement('div');
    controls.className = className;
    controls.innerHTML = `<button id="selectCar" class="button btn-1" type="button">SELECT</button>
                              <button id="removeCar" class="button btn-2" type="button">REMOVE</button>
                              <h6 class="mark">${mark}</h6>`;
    return controls;
  }

  constructor(private data: ICarResponse) {
    this.container = document.createElement('div');
    this.container.className = CarRow.TextObject.Row;
    this.container.id = data.id.toString();
    this.container.dataset.mark = data.name;
    this.data = data;
    this.mark = data.name;
    this.car = new GarageCar(this.data);
  }

  render() {
    const [options, controls, finish, road, car] = [
      CarRow.createCarOptions(CarRow.TextObject.Options, this.mark),
      CarRow.createCarControls(CarRow.TextObject.Controls),
      CarRow.createCarFinish(CarRow.TextObject.Finish),
      CarRow.createCarRoad(CarRow.TextObject.Road),
      this.car.create()];
    this.container.append(...[options, controls, finish, road, car]);
    return this.container;
  }
}

export default CarRow;
