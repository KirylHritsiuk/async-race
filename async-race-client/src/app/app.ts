import { Page } from '../pages/components/templatePage';
import { Garage } from '../pages/garage/garage';
import { Winners } from '../pages/winners/winners';
import { Header } from '../pages/header/header';
import { Buttons } from '../pages/components/buttons';
import { pagListener } from '../pages/components/listeners/paginationListener';
import { easeInOut, getDistance, getTime } from '../pages/components/animationCar'
const duration = 1000;  //** заменить 
const distance = 1100; //** заменить 
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
        const btnRace = document.querySelector("#raceBtn")!;
        const btnStart = document.querySelector("#startCar")!;
        const car1 = document.querySelector(".car")!;
        const car = <HTMLCollection>document.getElementsByClassName('car')!
        btn.addEventListener('click', Buttons.create);
        btnGen.addEventListener('click', Buttons.generate);
        btnUpdate.addEventListener('click', Buttons.update);
        // btnRace.addEventListener('click', async ()=>{
        //     for(let i = 0; i < car.length; i++){
        //         const id = (<HTMLElement>(car[i])).closest('.row_container').id,
        //             carModel = <HTMLElement>(car[i]),
        //         time = await getTime(id);
        //     //    startAnimation(carModel, time + 500);
        //     }
        // });
        // btnStart.addEventListener('click', async ()=>{
           
        //         const id = car1.closest('.row_container').id,
        //             carModel = <HTMLElement>car1,
        //         time = await getTime(id);
        //        startAnimation(carModel, time + 500);
            
        // });

        // document.body.addEventListener('click', (e) => {
        //     console.log("bodyLisner")
        //     pagListener(e)})
        
    }
}