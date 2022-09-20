import { setCar } from '../../common/svg/setCar';
import { ICarResponse } from '../../restApi/template';

export abstract class Car {
  protected container: HTMLDivElement;

  static MainClass = {
    className: 'car',
  };

  protected color: string;

  constructor(
        protected data: ICarResponse,
        protected height: string,
        protected weight: string,
        protected position?: string,
  ) {
    this.color = data.color;
    this.weight = weight;
    this.height = height;
    this.position = position;
    this.container = document.createElement('div');
  }

  create() {
    this.container.style.left = '50px';
    this.container.style.position = this.position;
    this.container.className = Car.MainClass.className;
    this.container.innerHTML = setCar.call(this);
    return this.container;
  }
}
