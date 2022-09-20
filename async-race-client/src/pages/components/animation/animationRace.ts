import { animId, ITimeResponse, startAnimation } from './animationCar';
import getTime from './getTime';
import engineStatus from '../../../restApi/engine';
import { setTimeToSeconds } from './setTimeToSeconds';

const startAnim = async (id: string): Promise<ITimeResponse> => {
  try {
    const time = await getTime(id);
    const row = <HTMLDivElement>document.getElementById(id);
    const startBtn = <HTMLButtonElement>row.children[1].firstElementChild;
    const stopBtn = <HTMLButtonElement>row.children[1].lastElementChild;

    startBtn.disabled = true;
    stopBtn.disabled = false;

    startAnimation(id, time);

    await engineStatus.drive(id);

    const timeSec = setTimeToSeconds(time);

    return { id, timeSec };
  } catch {
    cancelAnimationFrame(animId[id]);
    return Promise.reject();
  }
};

export default startAnim;
