/**
 * Map value from input "from" range to output "to" range.
 *
 * Adapted from https://forum.unity.com/threads/re-map-a-number-from-one-range-to-another.119437/
 */
export function mapRange(value: number, fromMin: number, fromMax: number, toMin: number, toMax: number) {
    if (value < fromMin) {
        return toMin;
    }
    if (value > fromMax) {
        return toMax;
    }
    return ((value - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin;
}

/**
 * Clamp value between range defined by min and max.
 */
export function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}
