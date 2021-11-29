export enum Instruments {
    KICK = "kick",
    SNARE = "snare",
    CLOSED_HAT = "closedHat",
}

export interface Instrument {
    name: string;
    src: string | string[];
}

export interface Track {
    id: string;
    necklace: number[];
    instrument: Instruments;
    steps: number;
    pulses: number;
    rotation: number;
    currentStep: number;
    volume: number;
}

export interface Rhythm {
    tracks: Record<string, Track>;
}
