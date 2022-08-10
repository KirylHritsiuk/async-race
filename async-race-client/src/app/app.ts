import { Page } from '../pages/templates/templatePage';
import { Garage } from '../pages/garage/garage';
import { Winners } from '../pages/winners/winners';
import { Header } from '../pages/header/header';


export const enum PageId {
    Header = 'header',
    Garage = 'garage',
    Winners = 'winners',
} 

export class App {
    private static container: HTMLElement = document.createElement('div');
    private header: Header;
    private garagePage: Garage;
    private winnersPage: Winners;
    static pageContainer: HTMLElement;
    
    static async renderNewPage(idPage: string) {  
        const pageContainer = document.querySelector('#page')
        pageContainer.innerHTML = '';
        let page: Page | null = null;

        if (idPage === PageId.Garage) {
            page = new Garage(idPage);

        } else if (idPage === PageId.Winners) {
            page = new Winners(idPage)
        } 
        if (page) {
            const pageHTML = await page.render();
            pageContainer.append(pageHTML);
            await page.renderRow()
        }  
    }
    constructor() {
        this.header = new Header(PageId.Header, PageId.Header);
        this.garagePage = new Garage(PageId.Garage);
        this.winnersPage = new Winners(PageId.Winners);

        App.container.className = 'page container';
        App.container.id = 'page';
    }
    private  routeChange() {
        window.addEventListener('hashchange', async() => {
            const hash = window.location.hash.slice(1);
            App.renderNewPage(hash);
        })
    }
    async run() {
        window.location.hash = PageId.Garage;
        const headerHTML = this.header.render();
        document.body.append(headerHTML, App.container);
        await App.renderNewPage(PageId.Garage);
        this.routeChange()
    }
}