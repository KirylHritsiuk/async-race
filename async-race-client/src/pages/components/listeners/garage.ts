import { PageId } from '../../../app/app';
import engineStatus, { engineStatusData } from '../../../restApi/engine';
import { IQueryParams, urlData } from '../../../restApi/template';
import { Garage, garagePagData, obj } from '../../garage/garage';
import { animId, startAnimation } from '../animation/animationCar';
import getTime from '../animation/getTime';
import { getCar } from '../car/getCar';
import { Buttons } from './buttons';

export async function pagListener(e: Event) {
  const [elem, pageCount, pagRowsContainer, prev, next, allCars] = [
    <HTMLButtonElement>e.target,
    <HTMLSpanElement>document.getElementById('pageCount'),
    <HTMLDivElement>document.getElementById('pagRows'),
    <HTMLButtonElement>document.getElementById('prev'),
    <HTMLButtonElement>document.getElementById('next'),
    <HTMLSpanElement>document.getElementById('count'),
  ];

  const count = pageCount.textContent;
  const garage = new Garage(PageId.Garage);
  const data: IQueryParams[] = [
    {
      key: urlData.id,
      value: '',
    },
    {
      key: urlData.status,
      value: '',
    },
  ];

  const button = {
    select: 'selectCar',
    remove: 'removeCar',
    start: 'startCar',
    stop: 'stopCar',
    next: 'next',
    prev: 'prev',
    create: 'createBtn',
    update: 'updateBtn',
    race: 'raceBtn',
    reset: 'resetBtn',
    generate: 'generateBtn',
  };
  const row = <HTMLElement>elem.closest('.row_container');
  const updateBtn = <HTMLButtonElement>document.getElementById('updateBtn');
  const updateName = <HTMLInputElement>document.getElementById('updateName');
  const decrCount = Number(count) - 1;
  switch (elem.id) {
    case button.select:
      updateBtn.value = row.id;
      updateName.value = <string>row.dataset.mark;
      updateBtn.disabled = false;
      updateName.disabled = false;
      break;

    case button.remove:
      row.remove();
      await Buttons.delete(row.id);
      allCars.textContent = (await garage.api.getAll()).length.toString();
      break;

    case button.start:
      try {
        const time = await getTime(row.id);
        elem.disabled = true;
        (<HTMLButtonElement>elem.nextElementSibling).disabled = false;
        startAnimation(row.id, time);
        const drive = await engineStatus.drive(row.id);
        if (drive instanceof undefined) window.cancelAnimationFrame(animId[row.id]);
      } catch {
        window.cancelAnimationFrame(animId[row.id]);
      }
      break;

    case button.stop:
      data[0].value = row.id;
      data[1].value = engineStatusData.stopped;
      if (await engineStatus.updateStatus(data)) {
        window.cancelAnimationFrame(animId[row.id]);
        getCar(elem).style.transform = 'translateX(0px)';
        elem.disabled = true;
      }
      (<HTMLButtonElement>elem.previousElementSibling).disabled = false;
      break;

    case button.next:
      if (
        Number(count)
        === Math.ceil(Number(allCars.textContent) / <number>obj[1].value)
      ) {
        next.setAttribute('disabled', 'disabled');
        break;
      }
      if (Number(allCars.textContent) > garagePagData.limit) {
        const incrCount = (Number(count) + 1).toString();
        pageCount.textContent = incrCount;
        obj[0].value = incrCount;
        garage.storage.setData(obj);
        prev.removeAttribute('disabled');
        pagRowsContainer.innerHTML = '';
        garage.renderRow();
      } else {
        next.setAttribute('disabled', 'disabled');
      }
      break;
    case button.prev:
      if (decrCount > 0) {
        pageCount.textContent = decrCount.toString();
        obj[0].value = decrCount.toString();
        garage.storage.setData(obj);
        pagRowsContainer.innerHTML = '';
        garage.renderRow();
        next.removeAttribute('disabled');
      }
      if (decrCount === 1) {
        prev.setAttribute('disabled', 'disabled');
      }
      break;
    case button.create:
      Buttons.create();
      break;
    case button.update:
      Buttons.update();
      break;
    case button.race:
      Buttons.race(elem);
      break;
    case button.reset:
      Buttons.reset();
      break;
    case button.generate:
      Buttons.generate();
      break;
    default:
  }
}
