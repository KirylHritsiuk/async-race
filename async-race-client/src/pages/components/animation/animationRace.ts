import { animId, ITimeResponse, startAnimation } from "./animationCar";
import { getTime } from "./getTime";
import engineStatus from "../../../restApi/engine";

export async function startAnim(id: string): Promise<ITimeResponse> {
  try {
    const [time, row] = [
      await getTime(id),
      <HTMLDivElement>document.getElementById(id),
    ];
    const [startBtn, stopBtn] = [
      <HTMLButtonElement>row.children[1].firstElementChild,
      <HTMLButtonElement>row.children[1].lastElementChild,
    ];
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
}

function setTimeToSeconds(time: number) {
  return time / 1000;
}
