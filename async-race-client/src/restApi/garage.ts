import { Api, ICarResponse, IQueryParams } from '../restApi/template'


export class GarageApi extends Api {
    constructor(path: string) {
        super(path)
    }
}