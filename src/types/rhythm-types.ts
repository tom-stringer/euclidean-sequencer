import { Note } from "tone/build/esm/core/type/NoteUnits";

export enum Instruments {
    KICK = "kick",
    SNARE = "snare",
    CLOSED_HAT = "closedHat",
    OPEN_HAT = "openHat",
    CYMBAL = "cymbal",
}

export interface Instrument {
    key: Instruments;
    name: string;
    src: string;
    note: Note;
}
