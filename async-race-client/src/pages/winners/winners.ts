import {
  Api, ICarResponse, IQueryParams, IWinResponse, urlData,
} from '../../restApi/template';
import { pagListener } from '../components/listeners/winners';
import { Page } from '../templates/templatePage';
import Storage from '../components/storage/sessionStorage';
import WinnersApi from '../../restApi/winners';
import CarApi from '../../restApi/garage';
import WinRow from '../components/winner/winRow';
import WinHeadRow from '../components/winner/winHeadRow';

export const winnersPagData = {
  page: 1,
  limit: 10,
};

export const sortData = {
  id: 'id',
  wins: 'wins',
  time: 'time',
};

export const orderData = {
  a: 'ASC',
  z: 'DESC',
};

export const winnerParams: IQueryParams[] = [
  {
    key: urlData.page,
    value: winnersPagData.page,
  },
  {
    key: urlData.limit,
    value: winnersPagData.limit,
  },
  {
    key: urlData.sort,
    value: sortData.time,
  },
  {
    key: urlData.order,
    value: orderData.a,
  },
];
export class Winners extends Page {
  api: Api<IWinResponse>;

  carApi: Api<ICarResponse>;

  headRow: WinHeadRow;

  storage: Storage;

  static TextObject = {
    Class: 'winners',
    Title: 'Winners',
    TitleClass: 'winners_title',
    PagClass: 'winner_pagination',
    PagId: 'winnersPag',
  };

  constructor(id: string) {
    super(id);
    this.api = WinnersApi;
    this.carApi = CarApi;
    this.headRow = new WinHeadRow();
    this.storage = new Storage(Winners.TextObject.Class, winnerParams);
  }

  async render() {
    const winners = await this.api.getAll();
    const [title, pagination] = [
      Page.createTitle(
        Winners.TextObject.TitleClass,
        Winners.TextObject.Title,
        winners.length.toString(),
      ),
      Page.createPagination(
        Winners.TextObject.PagClass,
        winnerParams,
        Winners.TextObject.Class,
        Winners.TextObject.PagId,
      )];
    this.container.append(title);
    this.container.append(pagination);
    pagination.addEventListener('click', (e) => pagListener(e));
    return this.container;
  }

  async renderRow() {
    const container = <HTMLElement>document.querySelector('.pagination_rows');
    // const page = getFromSessionStorage(winnerParams, Winners.TextObject.Class);
    const page = this.storage.getData();
    const responseWin = await this.api.getPage(page);

    container.prepend(this.headRow.render());

    responseWin.data.forEach(async (data, index) => {
      let position = index + 1;
      if (<number > page[0].value > 1) {
        position += <number>page[0].value * <number>page[1].value;
      }
      const responseCar: ICarResponse = await this.carApi.getOnce(data.id);
      const winRow = new WinRow(data, responseCar);
      container.append(winRow.render(position));
    });
    return container;
  }
}
