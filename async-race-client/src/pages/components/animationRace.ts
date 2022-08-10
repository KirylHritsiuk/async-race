
export async function getRace(id: string): Promise<ITimeResponse> {
    try {
      const time = await getTime(id);
      const row = document.getElementById(id);
      const btn = <HTMLButtonElement>row.children[1].lastElementChild;
      btn.disabled = false;
      startAnimation(id, time);
      await engineStatus.drive(id);
      const timeSec =  setTimeToSeconds(time)
        return { id, time }
      } catch {
        cancelAnimationFrame(animId[id]);
        return Promise.reject()
    }
  }
  
  function setTimeToSeconds (time: number) {
      return time/1000;
  }

