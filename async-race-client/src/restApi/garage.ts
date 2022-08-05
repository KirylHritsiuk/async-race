import { Api, ICarResponse, urlData } from '../restApi/template'

class GarageApi extends Api<ICarResponse> {
    constructor(path: string) {
        super(path)
    }
}

export default new GarageApi(urlData.garage);