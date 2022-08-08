import {ITimeResponse2} from '../components/animationCar'
import WinApi, { dataParams } from '../../restApi/winners'
import { IWinResponse } from '../../restApi/template';

export async function setWinner(data: ITimeResponse2) {
    const checkWinner = await WinApi.getOnce(data.id)
    if(isEmpty(checkWinner)) {
        dataParams.id = Number(data.id);
        dataParams.time = data.time;
        await WinApi.create(dataParams)
        console.log('if')
    }else {
        console.log('else')
        checkWinner.wins += 1 
        if (checkWinner.time < data.time/1000 ) checkWinner.time = data.time/1000;
        await WinApi.update(data.id, checkWinner)
    }
}

function isEmpty(object: IWinResponse) {
    for (let key in object) {
      
      return false;
    }
    return true;
  }