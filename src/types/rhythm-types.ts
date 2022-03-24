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
    /**
     * Inaccurate indicator of current step used to re-render components.
     * Use useCurrentStep for accurate value.
     */
    currentStep: number;
}

export interface Rhythm {
    tracks: Track[];
    tempo: number;
}
