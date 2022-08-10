import GarageApi from "../../restApi/garage";
import WinnersApi from "../../restApi/winners";
import {
  ICarBody,
  ICarResponse,
} from "../../restApi/template";
import { CarRow } from "./carRow";
import { updateTitle } from "./updateTitle";
import { randModel } from "./randomCarName";
import { randIndex } from "./randomCarName";
import { randomColor } from "./randomColor";
import { startAnim } from "./animationCar";
import { setWinner } from "./setWinner";
import { garagePagData } from "../garage/garage";
export interface ICarAndId {
  id: string;
  car: HTMLDivElement;
}
export class Buttons {
  static generateCount: number = 100;
  static async create() {
    const [container, nameCreate, colorCreate] = [
      <HTMLDivElement>document.querySelector("#pagRows"),
      <HTMLInputElement>document.querySelector("#createName"),
      <HTMLInputElement>document.querySelector("#createColor"),
    ];
    updateTitle(1);
    const data: ICarBody = {
      name: nameCreate.value,
      color: colorCreate.value,
    };
    const body: ICarResponse = await GarageApi.create(data);
    const row = new CarRow(body);
    if (container.children.length < garagePagData.limit) container.append(row.render());
    return body;
  }

  static async generate() {
    const container = <HTMLDivElement>document.querySelector("#pagRows");
    updateTitle(Buttons.generateCount);
    for (let i = 0; i < Buttons.generateCount; i++) {
      const data: ICarBody = {
        name: randModel(randIndex()),
        color: randomColor(),
      };
      const body: ICarResponse = await GarageApi.create(data);
      if (container.children.length < garagePagData.limit) {
        const row = new CarRow(body);
        container.append(row.render());
      }
    }
  }

  static async update() {
    const [container, name, color, btn] = [
      <HTMLDivElement>document.querySelector("#pagRows"),
      <HTMLInputElement>document.querySelector("#updateName"),
      <HTMLInputElement>document.querySelector("#updateColor"),
      <HTMLButtonElement>document.querySelector("#updateBtn"),
    ];
    const body = {
      name: name.value,
      color: color.value,
    };
    await GarageApi.update(btn.value, body);
    btn.disabled = true;
    name.disabled = true;
    name.value = "";
    const data: ICarResponse = await GarageApi.getOnce(btn.value);
    const row = document.getElementById(`${btn.value}`);
    const createRow = new CarRow(data);
    container.replaceChild(createRow.render(), row);
  }

  static async race(elem: HTMLButtonElement) {
    const [pagButtons, rows, prev, next] = [
      <NodeListOf<HTMLButtonElement>>(
        document.querySelectorAll(".pagination_controls")
      ),
      <NodeListOf<HTMLDivElement>>document.querySelectorAll(".row_container"),
      <HTMLButtonElement>document.querySelector("#prev"),
      <HTMLButtonElement>document.querySelector("#next"),
    ];

    const resetBtn = <HTMLButtonElement>elem.nextElementSibling;
    elem.disabled = true;
    prev.disabled = true;
    next.disabled = true;
    elem.disabled = true;
    pagButtons.forEach((el) => (el.disabled = true));
    const id: string[] = [];
    rows.forEach((el) => id.push(el.id));

    const winner = await Promise.any(id.map(startAnim));
    const winTitle = document.getElementById("win");

    setWinner(winner);
    const winnerData = await GarageApi.getOnce(winner.id);

    winTitle.textContent = `${winnerData.name} WIN! ${winner.time / 1000}s`;
    winTitle.style.visibility = "visible";
    resetBtn.disabled = false;
  }
  static reset() {
    const [stopButtons, race, reset, title, prev, next] = [
      <NodeListOf<HTMLButtonElement>>document.getElementsByName("stopBtn"),
      <HTMLButtonElement>document.querySelector("#raceBtn"),
      <HTMLButtonElement>document.querySelector("#resetBtn"),
      <HTMLElement>document.getElementById("win"),
      <HTMLButtonElement>document.querySelector("#prev"),
      <HTMLButtonElement>document.querySelector("#next")]
    title.style.visibility = "hidden";
    stopButtons.forEach((el) => el.click());
    reset.disabled = true;
    race.disabled = false;
    prev.disabled = false;
    next.disabled = false;
  }
  static async delete(id: string) {
    await GarageApi.delete(id);
    await WinnersApi.delete(id);
  }
}
