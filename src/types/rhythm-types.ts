import { Howl } from "howler";
import { atom } from "recoil";

export interface Instrument {
    name: string;
    src: string | string[];
}

export interface PlayableInstrument {
    name: string;
    howl: Howl;
}

export interface Track {
    id: string;
    necklace: number[];
    instrument: PlayableInstrument;
    steps: number;
    pulses: number;
    rotation: number;
    currentStep: number;
}

export interface Rhythm {
    tracks: Record<string, Track>;
}
