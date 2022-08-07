import { Api, urlData } from "./template";

export interface IEngineStartStopResponse {
    velocity: number,
    distance: number
}
export interface IEngineSwitchResponse {
    success: boolean;
}
// export type IEngineResponse = IEngineStartStopResponse | IEngineSwitchResponse
export interface IEngine {
    switch : IEngineStartStopResponse,
    startStop: IEngineStartStopResponse
}
export const enum engineStatusData {
    started = 'started',
    stopped = 'stopped',
    drive = 'drive'
}

class EngineApi extends Api<IEngineStartStopResponse | IEngineSwitchResponse>{
    constructor(path: string){
        super(path)
    }
}
export default new EngineApi(urlData.engine);