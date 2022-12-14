interface IWinnersHead{
    className: string;
    title: string;
    tag?: string;
}
class WinHeadRow {
  private container: HTMLElement;

  static TextObject = {
    row: 'row_container',
    head: 'head',
  };

  static DataObject: IWinnersHead[] = [
    { className: 'winner_position', title: 'Number', tag: 'h6' },
    { className: 'winner_car', title: 'Car', tag: 'h6' },
    { className: 'winner_name', title: 'Name', tag: 'h6' },
    { className: 'winner_wins', title: 'Wins', tag: 'h6' },
    { className: 'winner_time', title: 'Best time(seconds)', tag: 'h6' },
  ];

  constructor() {
    this.container = document.createElement('div');
    this.container.className = `${WinHeadRow.TextObject.row} ${WinHeadRow.TextObject.head}`;
  }

  private static createCol(data: IWinnersHead) {
    const container = document.createElement('div');
    container.className = data.className;
    container.id = data.title;
    container.innerHTML = `${data.title}`;
    return container;
  }

  render() {
    const cols = WinHeadRow.DataObject.map(WinHeadRow.createCol);
    cols.forEach((el) => this.container.append(el));
    return this.container;
  }
}

export default WinHeadRow;
