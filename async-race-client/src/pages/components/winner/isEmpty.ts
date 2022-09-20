import { IWinResponse } from '../../../restApi/template';

const isEmpty = (object: IWinResponse) => {
  for (const key in object) {
    return false;
  }
  return true;
};

export default isEmpty;
