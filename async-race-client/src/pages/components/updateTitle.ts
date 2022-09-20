export function updateTitle(data: number) {
  const count: HTMLSpanElement = document.querySelector('#count');
  count.textContent = (Number(count.textContent) + data).toString();
}
