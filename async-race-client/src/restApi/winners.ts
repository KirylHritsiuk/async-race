import { Api, IWinResponse, urlData } from '../restApi/template';

class WinnersApi extends Api<IWinResponse> {
  constructor(protected path: string = urlData.winners) {
    super(path);
  }
}

export default new WinnersApi();
