import { Api, ICarResponse, IQueryParams, IWinResponse } from '../restApi/template'


export class WinnersApi extends Api<IWinResponse> {
    constructor(path: string) {
        super(path)
    }
}