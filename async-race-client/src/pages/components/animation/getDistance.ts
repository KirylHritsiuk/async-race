const getDistance = () => {
  const bodyWight = document.body.offsetWidth;
  const carStartPos = 100;
  const row = <HTMLDivElement>document.querySelector('.row_container');
  const posCoefficient = 1.25;

  const rowWight = row.offsetWidth;
  const endRoad = rowWight + (bodyWight - rowWight / 2);
  const distance = endRoad - (bodyWight - rowWight / 2) - carStartPos * posCoefficient;

  return distance;
};

export default getDistance;
