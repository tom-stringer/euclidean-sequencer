import { getPattern } from "euclidean-rhythms";
import { Instruments, Track } from "../types/rhythm-types";
import { rotateNecklace } from "../utils/rhythm-utils";

export function createTrack(id: string, instrument: Instruments, steps: number, pulses: number): Track {
    const rotation = 0;
    return {
        id,
        necklace: rotateNecklace(getPattern(pulses, steps), rotation),
        instrument,
        steps,
        pulses,
        rotation,
        currentStep: 0,
        volume: 1.0,
    };
}
