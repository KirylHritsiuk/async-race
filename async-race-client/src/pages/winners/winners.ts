import { Page } from "../components/templatePage";


export class Winners extends Page {
    static TextObject = {
        Title: 'Winners',
        Count: '1',
        TitleClass: 'winners_title',
        PagClass: 'winner_pagination',
        Page: '1'
    };
    constructor (id: string) {
        super(id);
        // this.container.className = '';
    }
    render() {
        const [title, pagination] = [
            this.createTitle(Winners.TextObject.TitleClass,
                             Winners.TextObject.Title, 
                             Winners.TextObject.Count), 
            this.createPagination(Winners.TextObject.PagClass, Winners.TextObject.Page)];
            this.container.append(title);
            this.container.append(pagination);
        return this.container
    }

}