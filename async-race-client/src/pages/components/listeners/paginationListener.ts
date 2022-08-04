import { PageId } from '../../../app/app';
import { engineStatusData } from '../../../restApi/engine';
import { IQueryParams, urlData } from '../../../restApi/template';
import { Garage, obj} from '../../garage/garage';
import { getTime, requestId, startAnimation } from '../animationCar';
import { Buttons } from '../buttons';
import engineStatus from '../../../restApi/engine'
export async function  pagListener(e: Event){
    const [elem,pageCount, carsCount, pageRow,prev,next,allCars] = [
        <HTMLButtonElement>e.target,
        document.querySelector('#pageCount'),
        document.querySelector('#count'),
        document.querySelector('.pagination_rows'),
        <HTMLButtonElement>document.querySelector('#prev'),
        <HTMLButtonElement>document.querySelector('#next'),
        <HTMLElement>document.querySelector('#count')]
      const row = <HTMLElement>elem.closest(".row_container")!;
      const car = <HTMLDivElement>row.childNodes[2];
      let count = pageCount.textContent;
    const garage = new Garage(PageId.Garage)
    console.log('pag');
    const obj1: IQueryParams[] =[
        {
            key: urlData.id,
            value: row.id
        },
        {
            key: urlData.status,
            value: engineStatusData.started
        }
    ]
    const obj2: IQueryParams[] =[
        {
            key: urlData.id,
            value: row.id
        },
        {
            key: urlData.status,
            value: engineStatusData.drive
        }
    ]
    const obj3: IQueryParams[] =[
        {
            key: urlData.id,
            value: row.id
        },
        {
            key: urlData.status,
            value: engineStatusData.stopped
        }
    ]
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
                row.remove();
                await Buttons.delete(row.id);
                carsCount.textContent = (await garage.api.getAll()).length.toString()
                
                break;
            case 'startCar':
                
                console.log('startCar');
                try{

                    const time = await getTime(row.id)
                    elem.disabled = true;
                    (<HTMLButtonElement>elem.nextElementSibling).disabled = false;
                    startAnimation(car, time);
                    engineStatus.updateStatus(obj2)
                        .then(
                            result => result,
                            error => {
                                window.cancelAnimationFrame(requestId)
                                engineStatus.updateStatus(obj3)
                                console.log('error')
                            }
                            
                        ).catch(() => {
                        window.cancelAnimationFrame(requestId)})
                
                } catch {
                    window.cancelAnimationFrame(requestId);
                }finally{
                    await engineStatus.updateStatus(obj3)
                } 
                break;
            case 'stopCar':
                
                console.log('stopCar')
                window.cancelAnimationFrame(requestId);
                car.style.transform ='translateX(0px)';
                await engineStatus.updateStatus(obj3)
                elem.disabled = true;
                (<HTMLButtonElement>elem.previousElementSibling).disabled = false
            break;
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