import { getPattern } from "euclidean-rhythms";
import { Track } from "../recoil/rhythm-state";
import { rotateNecklace } from "../utils/rhythm-utils";

export function createTrack(id: string, steps: number, pulses: number): Track {
    const rotation = 0;
    return {
        id,
        necklace: rotateNecklace(getPattern(pulses, steps), rotation),
        steps,
        pulses,
        rotation,
        currentStep: 0,
    };
}
