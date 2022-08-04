import { requestId } from "../pages/components/animationCar";

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
export const enum  urlData {
    baseUrl = 'http://localhost:3000',
    totalCount = 'X-Total-Count',
    garage = '/garage',
    engine = '/engine',
    winners = '/winners',
    page = '_page',
    limit = '_limit',
    id = 'id',
    status = 'status',
}
export abstract class Api<T> {
    protected url: string;
    protected totalCount: string;

    constructor(protected path: string) {
        this.url = urlData.baseUrl,
        this.totalCount = urlData.totalCount,
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
            console.log('get page')
        const data: ICarResponse[] = await response.json();
        const count = response.headers.get(this.totalCount);
        return { data, count }
        } catch (error) {
            console.error(error, this.url, this.path)
        }
    }
 
    async getAll(id: string = ''): Promise <T[]> { 
        const response = await fetch(`${this.url}${this.path}/${id}`)
        const car: T[] = await response.json();
        return car
    }
    async getOnce(id: string = ''): Promise<T> { 
        const response = await fetch(`${this.url}${this.path}/${id}`)
        const car: T  = await response.json();
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
    async update(id: string, body: ICarBody | IWinBody): Promise<T> {
        const response = await fetch(`${this.url}${this.path}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body), 
        })
        const car: T = await response.json();
        return car
    }
    async updateStatus(queryParams: IQueryParams[]): Promise<T> {
        try{
            const response = await fetch(`${this.url}${this.path}?${Api.generateQueryString(queryParams)}`, {
                method: 'PATCH',
            })
            const car: T = await response.json();
            return car
        }catch(err) {
            console.error(err, this.url, this.path);
            window.cancelAnimationFrame(requestId)
        }
    }
    async delete(id: string): Promise<T> {
        const response = await fetch(`${this.url}${this.path}/${id.trim()}`,{
            method: 'DELETE',
        })
        const car: T = await response.json();
        return car
    }
}