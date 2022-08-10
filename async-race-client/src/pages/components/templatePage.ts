import { IQueryParams } from "../../restApi/template";
import { getPageFromSessionStorage } from "./sessionStorage";

export abstract class Page {
    protected container: HTMLElement;
    static TextObject = {}
    static MainClass = {
        class: 'container',
    }
    constructor(id: string) {
        this.container = document.createElement('div');
        this.container.className = id
        this.container.id = id;
    }
    protected createTitle(initClass: string ,title: string, count: string) {
        const container = document.createElement('div');
        container.className = initClass;
        container.innerHTML = `<h4 class="title">${title}</h4>
        <h4 class="title">(<span id="count">${count}</span>)</h4>`
        return container;
    }
    protected createPagination(initClass: string , obj:IQueryParams[], key: string, id: string) {
        const pagination = document.createElement('div');
        pagination.id = id;
        pagination.className = initClass;
        const page = getPageFromSessionStorage(obj, key);
        pagination.innerHTML = `<div class="pagination_title">
                <h5 class="title">Page</h5>
                <h5 class="title">#<span id="pageCount">${page[0].value}</span></h5>
            </div>
            <div id='pagRows' class="pagination_rows"></div>
            <div class="pagination_controls">
                <button id="prev" class="button btn-1" type="button" >PREV</button>
                <button id="next" class="button btn-1" type="button">NEXT</button>
            </div>`
        return pagination;
    }
    async render (){
        return this.container;
    }
    async renderRow() {
        return this.container;
    }
}

