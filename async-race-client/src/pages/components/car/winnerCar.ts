import { ICarResponse } from '../../../restApi/template';
import { Car } from '../../templates/templateCar';

class WinnerCar extends Car {
  static DataObject = {
    height: '1em',
    weight: '2em',
  };

  constructor(
    data: ICarResponse,
    height: string = WinnerCar.DataObject.height,
    weight: string = WinnerCar.DataObject.weight,
  ) {
    super(data, height, weight);
  }
}

export default WinnerCar;
