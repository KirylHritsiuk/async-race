import { Page } from '../pages/components/templatePage';
import { Garage } from '../pages/garage/garage';
import { Winners } from '../pages/winners/winners';
import { addRows } from './logic/addRow';
import { Header } from '../pages/header/header';

export const enum PageId {
    Header = 'header',
    Garage = 'garage',
    Winners = 'winners',
} 

export class App {
    private static container: HTMLElement = document.createElement('div');
    private header: Header;
    private GaragePage: Garage;
    private WinnersPage: Winners;
    static pageContainer: HTMLElement;

    static renderNewPage(idPage: string) {  
        const pageContainer = document.querySelector('#page')
        pageContainer.innerHTML = '';
        let page: Page | null = null;

        if (idPage === PageId.Garage) {
            page = new Garage(idPage);

        } else if (idPage === PageId.Winners) {
            page = new Winners(idPage)
        } 
        if (page) {
            const pageHTML = page.render();
            pageContainer.append(pageHTML);
            addRows()
        }
    }
    constructor() {
        this.header = new Header(PageId.Header, PageId.Header);
        this.GaragePage = new Garage(PageId.Garage);
        this.WinnersPage = new Winners(PageId.Winners);

        App.container.className = 'page container';
        App.container.id = 'page';
    }
    private routeChange() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            App.renderNewPage(hash);
        })
    }
    run() {
        const headerV2HTML = this.header.render();
        document.body.append(headerV2HTML);
        document.body.append(App.container);
        App.renderNewPage(PageId.Garage);
        this.routeChange()
        addRows()
    }
}