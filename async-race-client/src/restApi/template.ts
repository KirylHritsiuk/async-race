export interface ICarBody {
    name: string,
    color: string,
}
export interface IWinBody {
    wins: number,
    time: number,
}
export interface ICarResponse extends ICarBody {
    id: number
}
export interface IWinResponse extends IWinBody {
    id: number
}
export interface IQueryParams {
    key: string,
    value: string,
}
export abstract class Api {
    protected url: string;
    protected totalCount: string;

    // static MainData = {
    //     url: ,
    // }
    constructor(protected path: string) {
        this.url = 'http://localhost:3000',
        this.totalCount = 'X-Total-Count',
        this.path = path
    }
    static generateQueryString(queryParams: IQueryParams[] = []): string {
        return queryParams.length ? `${queryParams.map( el => el.key + '=' + el.value).join('&')}` : '';
    };
    protected async getAll(queryParams: IQueryParams[]){
        const response = await fetch(`
            ${this.url}
            ${this.path}?
            ${Api.generateQueryString(queryParams)}`
        )
        const data: ICarResponse[] = await response.json();
        const count = response.headers.get(this.totalCount);
        return { data, count }
    }
    protected async getOnce(body: ICarBody | IWinBody){
        const response = await fetch(`${this.url}${this.path}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })
        const car: ICarResponse | IWinResponse = await response.json();
        return car

    }
    protected async create(body: ICarBody | IWinBody){
        const response = await fetch(`${this.url}${this.path}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })
        const car: ICarResponse | IWinResponse = await response.json();
        return car 
    };
    protected async update(id: string, body: ICarBody | IWinBody){
        const response = await fetch(`${this.url}${this.path}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body), 
        })
        const car: ICarResponse | IWinResponse  = await response.json();
        return car
    }
    protected async delete(id: string){
        const response = await fetch(`${this.url}${this.path}}/${id}`,{
            method: 'DELETE',
        })
        const car: ICarResponse | IWinResponse = await response.json();
        return car
    }
}