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
export abstract class Api<T> {
    protected url: string;
    protected totalCount: string;

    constructor(protected path: string) {
        this.url = 'http://localhost:3000',
        this.totalCount = 'X-Total-Count',
        this.path = path
    }
    static generateQueryString(queryParams: IQueryParams[] = []): string {
        return queryParams.length ? `${queryParams.map( el => el.key + '=' + el.value).join('&')}` : '';
    };
    async getPage(queryParams: IQueryParams[]){
        try {
        const response = await fetch(`
            ${this.url}${this.path}?${Api.generateQueryString(queryParams)}`
        )
        const data: ICarResponse[] = await response.json();
        const count = response.headers.get(this.totalCount);
        return { data, count }
        } catch (error) {
            console.error(error, this.url, this.path)
        }
    }
 
    async getAllOrOnce(id: string = ''): Promise<T>{
        const response = await fetch(`${this.url}${this.path}/${id}`)
        const car: T = await response.json();
        return car
    }
    async create(body: ICarBody | IWinBody): Promise<T> {
        const response = await fetch(`${this.url}${this.path}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })
        const car: T = await response.json();
        return car 
    };
    async update(id: string, body: ICarBody | IWinBody){
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
    async delete(id: string){
        const response = await fetch(`${this.url}${this.path}/${id.trim()}`,{
            method: 'DELETE',
        })
        const car: ICarResponse | IWinResponse = await response.json();
        return car
    }
}