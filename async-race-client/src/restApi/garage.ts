import { Api, ICarResponse, IQueryParams } from '../restApi/template'

export const enum  urlData {
    baseUrl = 'http://localhost:3000',
    totalCount = 'X-Total-Count',
    garage = '/garage',
    engine = '/engine',
    winners = '/winners',
    page = '_page',
    limit = '_limit',
}
const enum garagePagData {
    page = '1',
    limit = '7' 
}
const obj: IQueryParams[] = [
    {
        key: urlData.page,
        value: garagePagData.page
    },
    {
        key: urlData.limit,
        value: garagePagData.limit
    },
]
class GarageApi extends Api<ICarResponse> {
    constructor(path: string) {
        super(path)
    }
    // async getData() {
    //    const page = await this.getPage(obj);
    //    const data = page.count
    //    return data
    // }
}

export default new GarageApi(urlData.garage);