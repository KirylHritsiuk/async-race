import { PageId } from '../../../../app/app';
import { engineStatusData } from '../../../../restApi/engine';
import { IQueryParams, urlData } from '../../../../restApi/template';
import { Garage, obj} from '../../../garage/garage';
import { Buttons } from '../../buttons';
import engineStatus from '../../../../restApi/engine'

export async function  pagListener(e: Event){
    const [
        elem,
        pageCount, 
        carsCount, 
        pageRow,
        prev,
        next,
        allCars
    ] = [
        <HTMLButtonElement>e.target,
        document.querySelector('#pageCount')!,
        document.querySelector('#count')!,
        document.querySelector('.pagination_rows')!,
        <HTMLButtonElement>document.querySelector('#prev'),
        <HTMLButtonElement>document.querySelector('#next'),
        <HTMLElement>document.querySelector('#count')]

      let count = pageCount.textContent;
    const garage = new Garage(PageId.Garage)
    console.log('pag', elem);
  
        switch(elem.id){
               


            case 'next':
                if(Number(count) === (Math.ceil(Number(allCars.textContent)/Number(obj[1].value)))) {
                    next.setAttribute('disabled', 'disabled');
                    break;
                }
                if(Number(allCars.textContent) > 7 ){
                    let incrCount = (Number(count) + 1).toString();
                    pageCount.textContent = incrCount;
                    setCountToLocalStorage(incrCount);
                    prev.removeAttribute('disabled');
                    pageRow.innerHTML = '';
                    garage.renderRow()
                } else {
                    console.log('<7')
                    next.setAttribute('disabled', 'disabled');
                }
                
            break;
            case 'prev':
                let decrCount = (Number(count) - 1);
                if(decrCount > 0) {
                    pageCount.textContent = decrCount.toString();
                    setCountToLocalStorage(decrCount.toString());
                    pageRow.innerHTML = '';
                    garage.renderRow()
                    next.removeAttribute('disabled');
                }
                if(decrCount === 1) {
                    prev.setAttribute('disabled', 'disabled');
                }
            break;
        }
}
 function setCountToLocalStorage(count: string){
   obj[0].value = count;
   localStorage.setItem('page', JSON.stringify(obj))  
 }


