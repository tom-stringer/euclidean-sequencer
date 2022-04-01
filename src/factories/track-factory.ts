import { getPattern } from "euclidean-rhythms";
import { Note } from "tone/build/esm/core/type/NoteUnits";
import { Instrument } from "../types/rhythm-types";
import Track from "../types/track";
import { Colours } from "../utils/colours";
import { rotateNecklace } from "../utils/rhythm-utils";

export function createTrack(id: string, instrument: Instrument, steps: number, pulses: number, colour: Colours): Track {
    const rotation = 0;
    return {
        id,
        necklace: rotateNecklace(getPattern(pulses, steps), rotation),
        instrument,
        steps,
        pulses,
        rotation,
        volume: 1.0,
        colour,
    };
}
