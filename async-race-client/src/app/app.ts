import { Page } from '../pages/templates/templatePage';
import { Garage } from '../pages/garage/garage';
import { Winners } from '../pages/winners/winners';
import { Header } from '../pages/header/header';

export const enum PageId {
  Header = 'header',
  Garage ='garage',
  Winners ='winners',
}

export class App {
  private static container: HTMLElement = document.createElement('div');

  private header: Header;

  private garagePage: Garage;

  private winnersPage: Winners;

  static pageContainer: HTMLElement;

  constructor() {
    this.header = new Header(PageId.Header, PageId.Header);
    this.garagePage = new Garage(PageId.Garage);
    this.winnersPage = new Winners(PageId.Winners);

    App.container.className = 'page container';
    App.container.id = 'page';
  }

  async renderNewPage(idPage: string) {
    App.container.innerHTML = '';
    let page: Page | null = null;

    if (idPage === PageId.Garage) {
      page = this.garagePage;
    } else if (idPage === PageId.Winners) {
      page = this.winnersPage;
    }
    if (page) {
      const pageHTML = await page.render();
      App.container.append(pageHTML);
      await page.renderRow();
    }
  }

  private async routeChange() {
    window.addEventListener('hashchange', async () => {
      const hash = window.location.hash.slice(1);
      await this.renderNewPage(hash);
    });
  }

  async run() {
    const headerHTML = this.header.render();
    document.body.append(headerHTML, App.container);
    await this.renderNewPage(window.location.hash.slice(1));
    this.routeChange();
  }
}
