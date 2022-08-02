import { Api, ICarResponse } from '../restApi/template'

export const enum  urlData {
    baseUrl = 'http://localhost:3000',
    totalCount = 'X-Total-Count',
    garage = '/garage',
    engine = '/engine',
    winners = '/winners',
    page = '_page',
    limit = '_limit',
}
class GarageApi extends Api<ICarResponse> {
    constructor(path: string) {
        super(path)
    }
}

export default new GarageApi(urlData.garage);