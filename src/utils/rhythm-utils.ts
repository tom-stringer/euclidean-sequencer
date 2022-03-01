import { Transport } from "tone";

export function rotateNecklace(rhythm: number[], rotation: number): number[] {
    rotation = rotation % rhythm.length;
    return rhythm.slice(rhythm.length - rotation).concat(rhythm.slice(0, rhythm.length - rotation));
}

/**
 * Get delay between each step in milliseconds.
 */
export function getStepDelayMillis() {
    return 60_000 / (Transport.bpm.value << 2);
}

/**
 * Get delay between each step in seconds.
 */
export function getStepDelaySeconds() {
    return 60 / (Transport.bpm.value << 2);
}

export function getCurrentStep(length: number) {
    return Math.floor(Transport.seconds / getStepDelaySeconds()) % length;
}
