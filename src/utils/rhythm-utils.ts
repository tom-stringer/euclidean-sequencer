export function rotateNecklace(rhythm: number[], rotation: number): number[] {
    rotation = rotation % rhythm.length;
    return rhythm.slice(rhythm.length - rotation).concat(rhythm.slice(0, rhythm.length - rotation));
}

export function getStepDelay(tempo: number) {
    return 60_000 / (tempo << 2);
}
