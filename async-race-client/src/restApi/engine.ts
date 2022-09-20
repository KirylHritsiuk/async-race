import { Api, IQueryParams, urlData } from './template';

export interface IEngineStartStopResponse {
    velocity: number,
    distance: number
}
export interface IEngineSwitchResponse {
    success: boolean;
}

export interface IEngine {
    switch : IEngineStartStopResponse,
    startStop: IEngineStartStopResponse
}
export const engineStatusData = {
  started: 'started',
  stopped: 'stopped',
  drive: 'drive',
};

class EngineApi extends Api<IEngineStartStopResponse | IEngineSwitchResponse> {
  constructor(protected path: string = urlData.engine) {
    super(path);
  }

  async updateStatus(queryParams: IQueryParams[]): Promise<IEngineStartStopResponse> {
    const response = await fetch(`${this.url}${this.path}?${Api.generateQueryString(queryParams)}`, {
      method: 'PATCH',
    });
    const car: IEngineStartStopResponse = await response.json();
    return car;
  }

  async drive(id: string): Promise<IEngineSwitchResponse | Response> {
    const response: Response = await fetch(`${this.url}${this.path}?${urlData.id}=${id}&${urlData.status}=${engineStatusData.drive}`, {
      method: 'PATCH',
    });
    if (!response.ok) return Promise.reject();
    const car: IEngineSwitchResponse = await response.json();
    return car;
  }
}
export default new EngineApi();
