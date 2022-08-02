import { PageId } from '../../../app/app';
import { IQueryParams } from '../../../restApi/template';
import { Garage, obj } from '../../garage/garage';
import { Buttons } from '../buttons';

export function pagListener(e: Event){
    const elem = <HTMLElement>e.target;
    const row = <HTMLElement>elem.closest(".row_container")!;
    const pageCount = document.querySelector('#pageCount');
    const pageRow = document.querySelector('.pagination_rows');
    const prev = <HTMLButtonElement>document.querySelector('#prev');
    const next = <HTMLButtonElement>document.querySelector('#next');
    const allCars = <HTMLElement>document.querySelector('#count');
    let count = pageCount.textContent;
    const garage = new Garage(PageId.Garage)
        switch(elem.id){
            case 'selectCar':
                const updateBtn = <HTMLButtonElement>document.getElementById('updateBtn');
                const updateName = <HTMLInputElement>document.getElementById('updateName');
                updateBtn.value = row.id;
                updateName.value = row.dataset.mark;
                updateBtn.disabled = false;
                updateName.disabled = false;
                break;
            case 'removeCar':
                Buttons.delete(row.id);
                row.remove()
                break;
            case 'startCar':
                console.log('startCar')
                break;
            case 'stopCar':
                console.log('stopCar')
                break;
                case 'next':
                if(Number(count) === (Math.ceil(Number(allCars.textContent)/Number(obj[1].value)))) break;
                if(Number(allCars.textContent) > 7 ){
                    let incrCount = (Number(count) + 1).toString();
                    pageCount.textContent = incrCount;
                    setCountToLocalStorage(incrCount);
                    prev.removeAttribute('disabled');
                    pageRow.innerHTML = '';
                    garage.renderRow()
                } else {
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