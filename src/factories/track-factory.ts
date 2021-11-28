import { getPattern } from "euclidean-rhythms";
import { Howl } from "howler";
import { Instrument, PlayableInstrument, Track } from "../types/rhythm-types";
import { rotateNecklace } from "../utils/rhythm-utils";

export function createTrack(id: string, instrument: string, steps: number, pulses: number): Track {
    const rotation = 0;
    return {
        id,
        necklace: rotateNecklace(getPattern(pulses, steps), rotation),
        instrument: createPlayableInstrument(instrument),
        steps,
        pulses,
        rotation,
        currentStep: 0,
    };
}

function createPlayableInstrument(instrument: string): PlayableInstrument {
    return {
        name: instruments[instrument].name,
        howl: new Howl({
            src: instruments[instrument].src,
        }),
    };
}

const instruments: Record<string, Instrument> = {
    kick: { name: "Kick", src: process.env.PUBLIC_URL + "/sounds/CYCdh_ElecK01-Kick01.wav" },
    snare: { name: "Snare", src: "/sounds/CYCdh_ElecK01-Snr01.wav" },
};
