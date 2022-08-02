
const duration = 1000;
const distance = 500;

export function easeInOut(time: number): number {
    return 0.5 * (1 - Math.cos(Math.PI*time));
}

