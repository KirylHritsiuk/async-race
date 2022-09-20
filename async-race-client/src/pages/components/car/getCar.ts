export const getCar = (elem: HTMLElement | string) => {
  let row: HTMLElement;
  if (typeof elem === 'string') {
    row = document.getElementById(`${elem}`);
  } else {
    row = <HTMLElement>elem.closest('.row_container');
  }
  const car = <HTMLDivElement>row.childNodes[4];
  return car;
};
