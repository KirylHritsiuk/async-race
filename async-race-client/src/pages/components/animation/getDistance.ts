export function getDistance() {
    const [bodyWight, carStartPos, row, ] = [
        document.body.offsetWidth,
        100,
        <HTMLDivElement>document.querySelector(".row_container")]
    const rowWight = row.offsetWidth;
    const endRoad = rowWight + (bodyWight - rowWight / 2),
          distance = endRoad - (bodyWight - rowWight / 2) - carStartPos * 1.25;
    return distance;
  }