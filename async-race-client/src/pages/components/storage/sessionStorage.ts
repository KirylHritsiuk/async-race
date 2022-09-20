import { IQueryParams } from '../../../restApi/template';

class Storage {
  constructor(protected key: string, protected data: IQueryParams[]) {
    this.key = key;
    this.data = data;
  }

  getData(): IQueryParams[] {
    if (sessionStorage.getItem(this.key)) {
      const data = <string>sessionStorage.getItem(this.key);
      return JSON.parse(data);
    }
    sessionStorage.setItem(this.key, JSON.stringify(this.data));
    return this.data;
  }

  setData(data: IQueryParams[]) {
    this.data = data;
    sessionStorage.setItem(this.key, JSON.stringify(this.data));
  }

  removeData() {
    sessionStorage.removeItem(this.key);
  }
}

export default Storage;
