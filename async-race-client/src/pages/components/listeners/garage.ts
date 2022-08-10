import { PageId } from "../../../app/app";
import { engineStatusData } from "../../../restApi/engine";
import { IQueryParams, urlData } from "../../../restApi/template";
import { Garage, garagePagData, obj } from "../../garage/garage";
import engineStatus from "../../../restApi/engine";
import { animId, startAnimation } from "../animation/animationCar";
import { getTime } from "../animation/getTime";
import { setToSessionStorage } from "../storage/sessionStorage";
import { Buttons } from "./buttons";

export async function pagListener(e: Event) {
  const [elem, pageCount, carsCount, pagRowsContainer, prev, next, allCars] = [
    <HTMLButtonElement>e.target,
    document.querySelector("#pageCount")!,
    document.querySelector("#count")!,
    document.querySelector(".pagination_rows")!,
    <HTMLButtonElement>document.querySelector("#prev"),
    <HTMLButtonElement>document.querySelector("#next"),
    <HTMLElement>document.querySelector("#count"),
  ];

  let count = pageCount.textContent;
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
  
  switch (elem.id) {
    case "selectCar":
      const row = <HTMLElement>elem.closest(".row_container");
      const updateBtn = <HTMLButtonElement>document.getElementById("updateBtn");
      const updateName = <HTMLInputElement>(
        document.getElementById("updateName")!
      );
      updateBtn.value = row.id;
      updateName.value = <string>row.dataset.mark;
      updateBtn.disabled = false;
      updateName.disabled = false;
      break;
    case "removeCar":
      const row1 = <HTMLElement>elem.closest(".row_container");
      row1.remove();
      await Buttons.delete(row1.id);
      carsCount.textContent = (await garage.api.getAll()).length.toString();
      break;

    case "startCar":
      try {
        const row2 = <HTMLElement>elem.closest(".row_container");
        const time = await getTime(row2.id);
        elem.disabled = true;
        (<HTMLButtonElement>elem.nextElementSibling).disabled = false;
        startAnimation(row2.id, time);
        const drive = await engineStatus.drive(row2.id, time);
        if (drive instanceof undefined)
          window.cancelAnimationFrame(animId[row2.id]);
      } catch {
        window.cancelAnimationFrame(animId[row.id]);
      }
      break;

    case "stopCar":
      const row3 = <HTMLElement>elem.closest(".row_container");
      data[0].value = row3.id;
      data[1].value =engineStatusData.stopped;
      const car3 = <HTMLDivElement>row3.childNodes[2],
        stop = await engineStatus.updateStatus(data);
      if (stop) {
        window.cancelAnimationFrame(animId[row3.id]);
        car3.style.transform = "translateX(0px)";
        elem.disabled = true;
      }
      (<HTMLButtonElement>elem.previousElementSibling).disabled = false;
      break;

    case "next":
      if (
        Number(count) ===
        Math.ceil(Number(allCars.textContent) / <number>obj[1].value)
      ) {
        next.setAttribute("disabled", "disabled");
        break;
      }
      if (Number(allCars.textContent) > garagePagData.limit) {
        let incrCount = (Number(count) + 1).toString();
        pageCount.textContent = incrCount;
        setToSessionStorage(Garage.TextObject.Class, incrCount, obj);
        prev.removeAttribute("disabled");
        pagRowsContainer.innerHTML = "";
        garage.renderRow();
      } else {
        next.setAttribute("disabled", "disabled");
      }
      break;
    case "prev":
      let decrCount = Number(count) - 1;
      if (decrCount > 0) {
        pageCount.textContent = decrCount.toString();
        setToSessionStorage(Garage.TextObject.Class, decrCount.toString(), obj);
        pagRowsContainer.innerHTML = "";
        garage.renderRow();
        next.removeAttribute("disabled");
      }
      if (decrCount === 1) {
        prev.setAttribute("disabled", "disabled");
      }
      break;
    case "createBtn":
      Buttons.create();
      break;
    case "updateBtn":
      Buttons.update();
      break;
    case "raceBtn":
      Buttons.race(elem);
      break;

    case "resetBtn":
      Buttons.reset();
      break;

    case "generateBtn":
      Buttons.generate();
      break;
  }
}
