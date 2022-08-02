import { Api, urlData } from "./template";

export interface IEngineResponse {
    velocity: number,
    distance: number
}
export interface IEngineSwitcheResponse {
    success: boolean;
}
export const enum engineStatus {
    started = 'started',
    stopped = 'stopped',
    drive = 'started'
}

class EngineApi extends Api<IEngineResponse>{
    constructor(path: string){
        super(path)
    }
    async startStopEngine(){}
    async switchDriveMode(){}
}
export default new EngineApi(urlData.engine);