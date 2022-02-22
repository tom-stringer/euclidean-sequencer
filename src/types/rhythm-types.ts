export enum Instruments {
    KICK = "kick",
    SNARE = "snare",
    CLOSED_HAT = "closedHat",
}

export interface Instrument {
    key: Instruments;
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
    volume: number;
}

export interface Rhythm {
    tracks: Record<string, Track>;
    length: number;
    currentStep: number;
}
