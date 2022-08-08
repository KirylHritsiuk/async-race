import { requestId, startAnimation } from "../pages/components/animationCar";
import { engineStatusData, IEngineStartStopResponse, IEngineSwitchResponse } from "./engine";

export const enum  urlData {
    baseUrl = 'http://localhost:3000',
    totalCount = 'X-Total-Count',
    garage = '/garage',
    engine = '/engine',
    winners = '/winners',
    page = '_page',
    limit = '_limit',
    sort = '_sort',
    order = '_order',
    id = 'id',
    status = 'status',
}
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
    // public requestId: number;

    constructor(protected path: string) {
        this.url = urlData.baseUrl,
        this.totalCount = urlData.totalCount,
        this.path = path
        // this.requestId = requestId
    }

    static generateQueryString(queryParams: IQueryParams[] = []): string {
        return queryParams.length ? `${queryParams.map( el => el.key + '=' + el.value).join('&')}` : '';
    };

    async getPage(queryParams: IQueryParams[]): Promise<{data: T[], count: string}> {
        try {
            const response = await fetch(`${this.url}${this.path}?${Api.generateQueryString(queryParams)}`)
            const data: T[] = response.status !== 500 ? await response.json() : {};
            const count = response.headers.get(this.totalCount);
            return { data, count }
        } catch (error) {
            console.error(error, this.url, this.path)
        }
    };
 
    async getAll(id: string = ''): Promise <T[]> { 
        const response = await fetch(`${this.url}${this.path}/${id}`)
        const car: T[] = await response.json();
        return car;
    };

    async getOnce(id: string = ''): Promise<T> { 
        const response = await fetch(`${this.url}${this.path}/${id}`)
        const car: T  =  response.status !== 404 ? await response.json() : {};
        return car;
    }

    async create(body: ICarBody | IWinBody): Promise<T> {
        const response = await fetch(`${this.url}${this.path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        const car: T = await response.json();
        return car; 
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
        return car;
    }

    async updateStatus(queryParams: IQueryParams[]): Promise<IEngineStartStopResponse> {
        const response = await fetch(`${this.url}${this.path}?${Api.generateQueryString(queryParams)}`, {
            method: 'PATCH',
        })
        const car: IEngineStartStopResponse = await response.json();
        return car
    }
    async drive(id: string, time?: number): Promise<IEngineSwitchResponse> {
        const response: Response  = await fetch(`${this.url}${this.path}?${urlData.id}=${id}&${urlData.status}=${engineStatusData.drive}`, {
            method: 'PATCH',
        })
        if(!response.ok ) {return undefined}
        const car: IEngineSwitchResponse = await response.json();
        return car
    }

    async delete(id: string): Promise<void>{
        await fetch(`${this.url}${this.path}/${id.trim()}`,{
            method: 'DELETE',
        })
    }
}