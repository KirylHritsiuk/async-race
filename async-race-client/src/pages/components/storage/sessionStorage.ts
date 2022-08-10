import { IQueryParams } from '../../../restApi/template';

export function getFromSessionStorage(obj:IQueryParams[], key: string): IQueryParams[]{
    if(sessionStorage.getItem(key)){
        const data = <string>sessionStorage.getItem(key)
        return JSON.parse(data);
    }
    else {
        sessionStorage.setItem(key, JSON.stringify(obj));
        console.log('set');
        return obj
    }
}

export function setToSessionStorage(key: string , count: string, obj: IQueryParams[]) {
    obj[0].value = count;
    sessionStorage.setItem(key, JSON.stringify(obj));
  }