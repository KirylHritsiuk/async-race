import {ITimeResponse} from '../animation/animationCar'
import WinApi, { dataParams } from '../../../restApi/winners'
import { IWinResponse } from '../../../restApi/template';

export async function setWinner(data: ITimeResponse) {
    const checkWinner = await WinApi.getOnce(data.id)
    if(isEmpty(checkWinner)) {
        dataParams.id = Number(data.id);
        dataParams.time = data.timeSec;
        await WinApi.create(dataParams)
    }else {
        checkWinner.wins ++;
        if (checkWinner.time < data.timeSec) checkWinner.time = data.timeSec;
        await WinApi.update(data.id, checkWinner)
    }
}

function isEmpty(object: IWinResponse) {
    for (let key in object) {
      return false;
    }
    return true;
  }