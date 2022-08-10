import { getDistance} from './getDistance'
export interface IAnimId {
  [key: string]: number;
}
export const animId: IAnimId = {};
export interface ITimeResponse {
  id: string;
  timeSec: number;
}

export function easeInOut(time: number): number {
  return 0.5 * (1 - Math.cos(Math.PI * time));
}
export let requestId: number = 0;

export function startAnimation(
  id: string,
  duration: number,
  callback = (progress: number) => {
    const translate = easeInOut(progress) * getDistance(),
          row: HTMLElement = document.getElementById(`${id}`),
          car = <HTMLDivElement>row.childNodes[2];

    car.style.transform = `translateX(${translate}px)`;
  }
): void {
  let startAnimation: number;

  requestId = requestAnimationFrame(function animationCar(time: number) {
    if (!startAnimation) {
      startAnimation = time;
    }

    const progress = (time - startAnimation) / duration;

    callback(progress);

    if (progress < 1) {
      animId[id] = requestAnimationFrame(animationCar);
    }
  });
}

