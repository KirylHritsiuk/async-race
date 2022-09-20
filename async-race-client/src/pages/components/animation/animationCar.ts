import { setTransform } from './setTransform';

export interface IAnimId {
  [key: string]: number;
}
export const animId: IAnimId = {};
export interface ITimeResponse {
  id: string;
  timeSec: number;
}

export const requestId = 0;

export function startAnimation(
  id: string,
  duration: number,
  callback = setTransform,
) {
  let startAnimation: number;

  requestAnimationFrame(function animationCar(time: number) {
    if (!startAnimation) {
      startAnimation = time;
    }

    const progress = (time - startAnimation) / duration;

    callback(progress, id);

    if (progress < 1) {
      animId[id] = requestAnimationFrame(animationCar);
    }
  });
}
