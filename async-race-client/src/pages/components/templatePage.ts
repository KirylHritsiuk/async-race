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
        <h4 id="carsCount" class="title">(${count})</h4>`
        return container;
    }
    protected createPagination(initClass: string , page: string) {
        const pagination = document.createElement('div');
        pagination.className = initClass;
        pagination.innerHTML = `<div class="pagination_title">
                <h5 class="title">Page</h5>
                <h5 id="page" class="title">#${page}</h5>
            </div>
            <div class="pagination_rows"></div>
            <div class="pagination_controls">
                <button class="button btn-1" type="button" disabled>PREV</button>
                <button class="button btn-1" type="button">NEXT</button>
            </div>`
        return pagination;
    }
    render (){
        return this.container;
    }
}