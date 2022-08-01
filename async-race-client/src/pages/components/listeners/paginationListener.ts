import { Buttons } from '../buttons'

export function pagListener(e: Event){
    const elem = <HTMLElement>e.target;
    const row = <HTMLElement>elem.closest(".row_container")!;
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
                break;
            case 'stopCar':
                break;
            case 'prev':

                break;
            case 'next':
                break;
            case 'car':
                break;
        }
}
