export  class WinHeadRow {
    private container: HTMLElement;
    static TextObject = {
        row: 'row_container',
        position: 'winner_position',
        car: 'winner_car',
        name: 'winner_name',
        wins: 'winner_wins',
        time: 'winner_time',
        head: 'head'
    }
    constructor() {
        this.container = document.createElement('div');
        this.container.className = `${WinHeadRow.TextObject.row} ${WinHeadRow.TextObject.head}`;
    }

    private createPositionNumberCol(className: string) {
        const container = document.createElement('div');
        container.className = className;
        container.innerHTML = `<h6>Number</h6>`;
        return container;
    }
    private createCarCol(className: string) {
        const container = document.createElement('div');
        container.className = className;
        container.innerHTML = `<h6>Car</h6>`
        return container;
    }
    private createNameCol(className: string) {
        const container = document.createElement('div');
        container.className = className;
        container.innerHTML =  `<h6>Name</h6>`
        return container
    }
    private createWinsCol(className: string) {
        const container = document.createElement('div');
        container.className = className;
        container.innerHTML = `<h6>Wins</h6>`
        return container
    }
    private createTimeCol(className: string) {
        const container = document.createElement('div');
        container.className = className;
        container.innerHTML = `<h6>Best time (seconds)</h6>`
        return container;
    }
    render () {
        const [number, car, name, wins, time] = [
            this.createPositionNumberCol(WinHeadRow.TextObject.position),
            this.createCarCol(WinHeadRow.TextObject.car),
            this.createNameCol(WinHeadRow.TextObject.name),
            this.createWinsCol(WinHeadRow.TextObject.wins),
            this.createTimeCol(WinHeadRow.TextObject.time),];
        this.container.append(number);
        this.container.append(car);
        this.container.append(name);
        this.container.append(wins);
        this.container.append(time);
        return this.container;
    } 
}