import { Api, ICarResponse, urlData } from '../restApi/template';

class GarageApi extends Api<ICarResponse> {
  constructor(protected path: string = urlData.garage) {
    super(path);
  }
}

export default new GarageApi();
