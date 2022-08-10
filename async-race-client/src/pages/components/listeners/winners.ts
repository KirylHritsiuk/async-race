import { PageId } from '../../../app/app';
import { obj, orderData, sortData, Winners, winnersPagData } from '../../winners/winners';
import { getFromSessionStorage, setToSessionStorage } from '../storage/sessionStorage';
import { WinHeadRow } from '../winner/winHeadRow';

export async function pagListener(e: Event){
    const [
        elem,
        pageCount, 
        pageRow,
        prev,
        next,
        allCars
    ] = [
        <HTMLButtonElement>e.target,
        document.querySelector('#pageCount'),
        document.querySelector('.pagination_rows'),
        <HTMLButtonElement>document.querySelector('#prev'),
        <HTMLButtonElement>document.querySelector('#next'),
        <HTMLElement>document.querySelector('#count')]
    let count = pageCount.textContent;
    const winners = new Winners(PageId.Winners)
    const currentSort = getFromSessionStorage(obj, Winners.TextObject.Class)
        switch(elem.id){
            case WinHeadRow.DataObject[3].title:
            if(currentSort[3].value !== orderData.z) {
                currentSort[2].value = sortData.wins,
                currentSort[3].value = orderData.z
                sessionStorage.setItem(Winners.TextObject.Class, JSON.stringify(currentSort))
                pageRow.innerHTML = '';
                winners.renderRow()
            } else {
                currentSort[2].value = sortData.wins,
                currentSort[3].value = orderData.a
                sessionStorage.setItem(Winners.TextObject.Class, JSON.stringify(currentSort))
                pageRow.innerHTML = '';
                winners.renderRow()
            }
                break;
            
            case WinHeadRow.DataObject[4].title:
                if(currentSort[3].value !== orderData.z) {
                    currentSort[2].value = sortData.time,
                    currentSort[3].value = orderData.z
                    sessionStorage.setItem(Winners.TextObject.Class, JSON.stringify(currentSort))
                    pageRow.innerHTML = '';
                    winners.renderRow()
                } else {
                    currentSort[2].value = sortData.time,
                    currentSort[3].value = orderData.a
                    sessionStorage.setItem(Winners.TextObject.Class, JSON.stringify(currentSort))
                    pageRow.innerHTML = '';
                    winners.renderRow()
                }
                break;    
            case 'next':
                if(Number(count) === (Math.ceil(Number(allCars.textContent)/Number(obj[1].value)))) {
                    next.setAttribute('disabled', 'disabled');
                    break;
                }
                if(Number(allCars.textContent) > Number(winnersPagData.limit)){
                    let incrCount = (Number(count) + 1).toString();
                    pageCount.textContent = incrCount;
                    setToSessionStorage(Winners.TextObject.Class, incrCount, obj);
                    prev.removeAttribute('disabled');
                    pageRow.innerHTML = '';
                   winners.renderRow()
                } else {
                    next.setAttribute('disabled', 'disabled');
                }
                
            break;
            case 'prev':
                let decrCount = (Number(count) - 1);
                if(decrCount > 0) {
                    pageCount.textContent = decrCount.toString();
                    setToSessionStorage(Winners.TextObject.Class, decrCount.toString(), obj);
                    pageRow.innerHTML = '';
                    winners.renderRow()
                    next.removeAttribute('disabled');
                }
                if(decrCount === 1) {
                    prev.setAttribute('disabled', 'disabled');
                }
            break;
        }
}


