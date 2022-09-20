import { ITimeResponse } from '../animation/animationCar';
import WinApi from '../../../restApi/winners';
import { IWinResponse } from '../../../restApi/template';
import isEmpty from './isEmpty';

const dataParams: IWinResponse = {
  id: 1,
  wins: 1,
  time: 1,
};

async function setWinner(data: ITimeResponse) {
  const checkWinner = await WinApi.getOnce(data.id);
  if (isEmpty(checkWinner)) {
    dataParams.id = Number(data.id);
    dataParams.time = data.timeSec;
    await WinApi.create(dataParams);
  } else {
    checkWinner.wins++;
    if (checkWinner.time > data.timeSec) checkWinner.time = data.timeSec;
    await WinApi.update(data.id, checkWinner);
  }
}

export default setWinner;
