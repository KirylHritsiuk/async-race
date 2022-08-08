import { Api, ICarResponse, IQueryParams, IWinResponse, urlData } from '../restApi/template'

export const dataParams: IWinResponse = {
    id: 1,
    wins: 1,
    time: 1,
}
class WinnersApi extends Api<IWinResponse> {
    constructor(path: string) {
        super(path)
    }
}

export default new WinnersApi(urlData.winners);