import { Track } from "../recoil/rhythm-state";

export function createTrack(id: string): Track {
    return {
        id,
        necklace: [],
        steps: 0,
        pulses: 0,
        rotation: 0,
        currentStep: 0,
    };
}
