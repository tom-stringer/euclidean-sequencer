import { getPattern } from "euclidean-rhythms";
import { Instruments, Track } from "../types/rhythm-types";
import { rotateNecklace } from "../utils/rhythm-utils";

export function createTrack(id: string, instrument: string, steps: number, pulses: number): Track {
    const rotation = 0;
    return {
        id,
        necklace: rotateNecklace(getPattern(pulses, steps), rotation),
        instrument: Instruments.KICK,
        steps,
        pulses,
        rotation,
        currentStep: 0,
    };
}
