import {
  engineStatusData,
  IEngineStartStopResponse,
  IEngineSwitchResponse,
} from "../../restApi/engine";
import engineStatus from "../../restApi/engine";
import { IQueryParams } from "../../restApi/template";
import { urlData } from "../../restApi/template";
import { ICarAndId } from "./buttons";

interface IAnimId {
  [key: string]: number,
}
const animId: IAnimId = {}
const obj1: IQueryParams[] = [
  {
    key: urlData.id,
    value: "1",
  },
  {
    key: urlData.status,
    value: engineStatusData.started,
  },
];
const obj2: IQueryParams[] = [
  {
    key: urlData.id,
    value: "1",
  },
  {
    key: urlData.status,
    value: engineStatusData.drive,
  },
];

export function easeInOut(time: number): number {
  return 0.5 * (1 - Math.cos(Math.PI * time));
}

export function getDistance() {
  const bodyWight = document.body.offsetWidth;
  const row: HTMLDivElement = document.querySelector(".row_container");
  const carStartPos = 100;
  const rowWight = row.offsetWidth;
  const endRoad = rowWight + (bodyWight - rowWight / 2);
  const distance = endRoad - (bodyWight - rowWight / 2) - carStartPos * 1.25;
  return distance;
}
export interface ITimeResponse {
  id: string;
  time: number;
}
export async function getTime(id: string): Promise<number> {
  obj1[0].value = id;
  const response = <IEngineStartStopResponse>(
    await engineStatus.updateStatus(obj1)
  );
  const time = Math.round(response.distance / response.velocity);
  return time;
}
//------------------------------------------------------------------------
// export async function getTime2(id: string): Promise<ITimeResponse> {
//   obj1[0].value = id;
//   const response = <IEngineStartStopResponse>(
//     await engineStatus.updateStatus(obj1)
//   );
//   const time = response.distance / response.velocity;
//   return { id, time };
// }


//----------------------------------------------------------------------

//---------------------------------------------------------------------------
export let requestId: number = 0;

export function startAnimation(
    // car: HTMLElement,
  id: string,
  duration: number,
  callback = (progress: number) => {
    const translate = easeInOut(progress) * getDistance();
    const row: HTMLElement = document.getElementById(`${id}`);
    const car = <HTMLDivElement>row.childNodes[2];

    car.style.transform = `translateX(${translate}px)`;
  }
): number {
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
  return requestId;
}
//--------------------------------------------------------------------------------------
export interface ICarAndTime {
  id: string,
  duration: number
}
export function startAnimation2(
  data: ITimeResponse,
  callback = (progress: number) => {
    const translate = easeInOut(progress) * getDistance();
    const row: HTMLElement = document.getElementById(`${data.id}`);
    const car = <HTMLDivElement>row.childNodes[2];
    car.style.transform = `translateX(${translate}px)`;
  }
): ITimeResponse {
  let startAnimation: number;

  requestId = requestAnimationFrame(function animationCar(time: number) {
    if (!startAnimation) {
      startAnimation = time;
    }
    const progress = (time - startAnimation) / data.time;
    callback(progress);
    if (progress < 1) {
      requestId = requestAnimationFrame(animationCar);

    }
  });
  return data
}

export interface ICarAndIdAndTime  {
  id: ICarAndId
  time: number;
}
export async function getWinner(){
  const rows = <NodeListOf<HTMLDivElement>>document.querySelectorAll('.row_container');
  const arr: ICarAndId[] =[]
  const arr1: ICarAndIdAndTime[] =[]
  const arr2: ICarAndIdAndTime[] = []
  rows.forEach(el => arr.push({id: el.id, car: <HTMLDivElement>el.children[2]}))

}

export async function startAnim(id: string): Promise<ITimeResponse> {
  try {

    const time = await getTime(id);
    const row = document.getElementById(id);
    const startBtn = <HTMLButtonElement>row.children[1].firstElementChild;
    const stopBtn = <HTMLButtonElement>row.children[1].lastElementChild;

    startBtn.disabled = true;
    stopBtn.disabled = false;
    startAnimation(id, time);
    await engineStatus.drive(id);
    const timeSec =  setTimeToSeconds(time)
      return { id, time }
    } catch {
      cancelAnimationFrame(animId[id]);
      return Promise.reject()
  }
}

function setTimeToSeconds (time: number) {
    return time/1000;
}