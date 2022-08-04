import { Api, urlData } from "./template";

export interface IEngineStartStopResponse {
    velocity: number,
    distance: number
}
export interface IEngineSwitchResponse {
    success: boolean;
}
export type IEngineResponse = IEngineStartStopResponse | IEngineSwitchResponse
export const enum engineStatusData {
    started = 'started',
    stopped = 'stopped',
    drive = 'drive'
}

class EngineApi extends Api<IEngineResponse>{
    constructor(path: string){
        super(path)
    }
}
export default new EngineApi(urlData.engine);