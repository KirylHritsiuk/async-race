import { getCar } from '../car/getCar';
import { easeInOut } from './easeInOut';
import getDistance from './getDistance';

export const setTransform = (progress: number, id: string) => {
  const translate = easeInOut(progress) * getDistance();

  getCar(id).style.transform = `translateX(${translate}px)`;
};
