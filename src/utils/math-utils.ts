/**
 * Map value from input "from" range to output "to" range.
 *
 * Adapted from https://forum.unity.com/threads/re-map-a-number-from-one-range-to-another.119437/
 */
export function mapRange(value: number, fromMin: number, fromMax: number, toMin: number, toMax: number) {
    return ((value - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin;
}
