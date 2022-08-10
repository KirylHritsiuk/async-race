import { engineStatusData, IEngineStartStopResponse } from "../../../restApi/engine";
import engineStatus from "../../../restApi/engine";
import { IQueryParams, urlData } from "../../../restApi/template";

export async function getTime(id: string): Promise<number> {
    const startData: IQueryParams[] = [
        {
          key: urlData.id,
          value: id,
        },
        {
          key: urlData.status,
          value: engineStatusData.started,
        },
      ];
    const response = <IEngineStartStopResponse>(await engineStatus.updateStatus(startData))     
    return Math.round(response.distance / response.velocity);
  }