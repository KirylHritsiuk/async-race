import { Page } from '../templates/templatePage';
import GarageApi from '../../restApi/garage';
import {
  Api,
  ICarResponse,
  IQueryParams,
  urlData,
} from '../../restApi/template';
import CarRow from '../components/car/carRow';
import { pagListener } from '../components/listeners/garage';
import Storage from '../components/storage/sessionStorage';
import formHTML from '../../common/components/form';

export const garagePagData = {
  page: 1,
  limit: 7,
};

export const obj: IQueryParams[] = [
  {
    key: urlData.page,
    value: garagePagData.page,
  },
  {
    key: urlData.limit,
    value: garagePagData.limit,
  },
];
export class Garage extends Page {
  api: Api<ICarResponse>;

  storage: Storage;

  static TextObject = {
    Class: 'garage',
    Title: 'Garage',
    GarageForm: 'form',
    GarageTitleClass: 'garage_title',
    GaragePages: 'garage_pagination',
    GaragePath: '/garage',
    Win: 'win',
    GaragePagId: 'garagePag',
  };

  constructor(id: string) {
    super(id);
    this.api = GarageApi;
    this.storage = new Storage(Garage.TextObject.Class, obj);
  }

  private static createGarageForm(initClass: string) {
    const form = document.createElement('form');
    form.id = 'form';
    form.className = initClass;
    form.innerHTML = formHTML;
    return form;
  }

  private static viewWinner() {
    const title = document.createElement('h2');
    title.className = Garage.TextObject.Win;
    title.id = Garage.TextObject.Win;
    title.style.position = 'absolute';
    return title;
  }

  async render() {
    const cars = await this.api.getAll();
    this.container.append(
      Garage.createGarageForm(Garage.TextObject.GarageForm),
      Page.createTitle(
        Garage.TextObject.GarageTitleClass,
        Garage.TextObject.Title,
        cars.length.toString(),
      ),
      Page.createPagination(
        Garage.TextObject.GaragePages,
        obj,
        Garage.TextObject.Class,
        Garage.TextObject.GaragePagId,
      ),
      Garage.viewWinner(),
    );
    this.container.addEventListener('click', async (e) => {
      await pagListener(e);
    });
    return this.container;
  }

  async renderRow() {
    const container = <HTMLElement>document.querySelector('.pagination_rows');
    const response = await this.api.getPage(this.storage.getData());
    for (let i = 0; i < response.data.length; i++) {
      const carRow = new CarRow(response.data[i]);
      container.append(carRow.render());
    }
    return container;
  }
}
