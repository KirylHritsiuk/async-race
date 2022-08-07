import { Api, ICarResponse, IQueryParams, IWinResponse, urlData } from '../restApi/template'


class WinnersApi extends Api<IWinResponse> {
    constructor(path: string) {
        super(path)
    }
}

export default new WinnersApi(urlData.winners);