import { Api, ICarResponse, IQueryParams, IWinResponse, urlData } from "../../restApi/template";
import { pagListener } from "../components/listeners/pagination/winners";
import { Page } from "../components/templatePage";
import { getPageFromLocalStorage } from "../garage/garage";
import WinnersApi  from '../../restApi/winners';
import CarApi  from '../../restApi/garage';
import { WinRow } from '../components/winRow';
import { WinHeadRow } from '../components/winHeadRow';


export  const enum  winnersPagData {
    page = '1',
    limit = '10', 
}
export const enum sortData {
    id ='id',
    wins = 'wins',
    time  = 'time'
}
export const enum orderData {
    a = 'ASC',
    z = 'DESC'
}
export const obj: IQueryParams[] = [
    {
        key: urlData.page,
        value: winnersPagData.page
    },
    {
        key: urlData.limit,
        value: winnersPagData.limit
    },
    {
        key: urlData.sort,
        value: sortData.time
    },
    {
        key: urlData.order,
        value: orderData.a
    },
]
export class Winners extends Page {
    api: Api<IWinResponse>;
    carApi: Api<ICarResponse>;
    headRow: WinHeadRow;
    static TextObject = {
        Class: 'winners',
        Title: 'Winners',
        Count: '1',
        TitleClass: 'winners_title',
        PagClass: 'winner_pagination',
        Page: '1'
    };
    constructor (id: string) {
        super(id);
        this.api = WinnersApi;
        this.carApi = CarApi;
        this.headRow = new WinHeadRow()
    }
    async render() {
        const winners = await this.api.getAll();
        const [title, pagination] = [
            this.createTitle(Winners.TextObject.TitleClass,
                             Winners.TextObject.Title, 
                             winners.length.toString()), 
            this.createPagination(Winners.TextObject.PagClass, Winners.TextObject.Page)];
            this.container.append(title);
            this.container.append(pagination);
            pagination.addEventListener('click', e => pagListener(e))
        return this.container
    }
    async renderRow() {
        const container: HTMLElement = document.querySelector('.pagination_rows')!;
        const pageCount: HTMLSpanElement = document.getElementById('pageCount');
        const page = getPageFromLocalStorage(obj, Winners.TextObject.Class);
        container.prepend(this.headRow.render())
        pageCount.textContent = `${page[0].value}`
        const responseWin = await this.api.getPage(page)
        console.log('renderRow', obj)
        for(let i = 0; i < responseWin.data.length; i++){
            const position = i + 1;
            const responseCar: ICarResponse = await this.carApi.getOnce((responseWin.data[i].id).toString())
            const winRow = new WinRow(responseWin.data[i], responseCar );
            container.append(winRow.render(position));
        } 
        return container;    
    } 

    
}