export function incrCount(data: number){
    let count = document.querySelector('#count')!;
    count.textContent = (Number(count.textContent) + data).toString();
}
        
