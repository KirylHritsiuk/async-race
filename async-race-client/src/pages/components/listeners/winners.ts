import { PageId } from '../../../app/app';
import {
  orderData, sortData, Winners, winnersPagData,
} from '../../winners/winners';
import WinHeadRow from '../winner/winHeadRow';

export async function pagListener(e: Event) {
  const [
    elem,
    pageCount,
    pageRow,
    prev,
    next,
    allCars,
  ] = [
        <HTMLButtonElement>e.target,
        document.querySelector('#pageCount'),
        document.querySelector('.pagination_rows'),
        <HTMLButtonElement>document.querySelector('#prev'),
        <HTMLButtonElement>document.querySelector('#next'),
        <HTMLElement>document.querySelector('#count')];
  const count = pageCount.textContent;
  const winners = new Winners(PageId.Winners);
  const currentSort = winners.storage.getData();
  const decrCount = (Number(count) - 1);

  switch (elem.id) {
    case WinHeadRow.DataObject[3].title:
      if (currentSort[3].value !== orderData.z) {
        currentSort[2].value = sortData.wins,
        currentSort[3].value = orderData.z;
        winners.storage.setData(currentSort);
        pageRow.innerHTML = '';
        winners.renderRow();
      } else {
        currentSort[2].value = sortData.wins,
        currentSort[3].value = orderData.a;
        winners.storage.setData(currentSort);
        pageRow.innerHTML = '';
        winners.renderRow();
      }
      break;

    case WinHeadRow.DataObject[4].title:
      if (currentSort[3].value !== orderData.z) {
        currentSort[2].value = sortData.time,
        currentSort[3].value = orderData.z;
        winners.storage.setData(currentSort);
        pageRow.innerHTML = '';
        winners.renderRow();
      } else {
        currentSort[2].value = sortData.time,
        currentSort[3].value = orderData.a;
        winners.storage.setData(currentSort);
        pageRow.innerHTML = '';
        winners.renderRow();
      }
      break;
    case 'next':
      if (
        Number(count) === (Math.ceil(Number(allCars.textContent) / Number(currentSort[1].value)))
      ) {
        next.setAttribute('disabled', 'disabled');
        break;
      }
      if (Number(allCars.textContent) > Number(winnersPagData.limit)) {
        const incrCount = (Number(count) + 1).toString();
        pageCount.textContent = incrCount;
        currentSort[0].value = incrCount;
        winners.storage.setData(currentSort);
        prev.removeAttribute('disabled');
        pageRow.innerHTML = '';
        winners.renderRow();
      } else {
        next.setAttribute('disabled', 'disabled');
      }

      break;
    case 'prev':

      if (decrCount > 0) {
        pageCount.textContent = decrCount.toString();
        currentSort[0].value = decrCount.toString();
        winners.storage.setData(currentSort);
        pageRow.innerHTML = '';
        winners.renderRow();
        next.removeAttribute('disabled');
      }
      if (decrCount === 1) {
        prev.setAttribute('disabled', 'disabled');
      }
      break;
    default:
  }
}
