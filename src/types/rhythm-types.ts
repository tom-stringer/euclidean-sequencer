import { Colours } from "../utils/colours";

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
}

export interface Track {
    id: string;
    necklace: number[];
    instrument: Instruments;
    steps: number;
    pulses: number;
    rotation: number;
    volume: number;
    colour: Colours;
    currentStep: number;
}

export interface Rhythm {
    tracks: Record<string, Track>;
    length: number;
    currentStep: number;
}
