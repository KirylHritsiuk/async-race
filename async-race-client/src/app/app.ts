import { Page } from '../pages/components/templatePage';
import { Garage } from '../pages/garage/garage';
import { Winners } from '../pages/winners/winners';
import { Header } from '../pages/header/header';
import { Buttons } from '../pages/components/buttons';
import { pagListener } from '../pages/components/listeners/paginationListener';

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
        this.GaragePage = new Garage(PageId.Garage);
        this.WinnersPage = new Winners(PageId.Winners);

        App.container.className = 'page container';
        App.container.id = 'page';
    }
     private  routeChange() {
        window.addEventListener('hashchange', async() => {
            const hash = window.location.hash.slice(1);
            await App.renderNewPage(hash);
        })
    }
   async run() {
        const headerHTML = this.header.render();
        document.body.append(headerHTML);
        document.body.append(App.container);
        await App.renderNewPage(PageId.Garage);
        this.routeChange()
        const btn = document.querySelector("#createBtn")!;
        const btnUpdate = document.querySelector("#updateBtn")!;
        const btnGen = document.querySelector("#generateBtn")!;
        const btnRemove = document.querySelector("#removeCar")!;
        const btnSelect = document.querySelector("#selectCar")!;
        const btnStart = document.querySelector("#startCar")!;
        const btnStop = document.querySelector("#stopCar")!;
        const btnNext = document.querySelector("#next")!;
        const btnPrev = document.querySelector("#prev")!;
        btn.addEventListener('click', Buttons.create);
        btnGen.addEventListener('click', Buttons.generate);
        btnUpdate.addEventListener('click', Buttons.update);
        document.body.addEventListener('click', (e) => {pagListener(e)})
        
    }
}