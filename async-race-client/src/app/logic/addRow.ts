import { CarRow } from "../../pages/components/carRow";

export function addRows() {
    const container: HTMLElement = document.querySelector('.pagination_rows')!;
    for(let i = 0; i < 7; i++){
       const carRow = new CarRow('testID');
        container.append(carRow.render());
    }  
}
