import { Howl } from "howler";
import { Instrument, Instruments } from "../types/rhythm-types";

export function rotateNecklace(rhythm: number[], rotation: number): number[] {
    rotation = rotation % rhythm.length;
    return rhythm.slice(rhythm.length - rotation).concat(rhythm.slice(0, rhythm.length - rotation));
}

export function getStepDelay(tempo: number) {
    return 60_000 / (tempo << 1);
}

export const cymbal = new Howl({
    src: process.env.PUBLIC_URL + "/sounds/CYCdh_ElecK01-Cymbal.wav",
});

export const openHat = new Howl({
    src: process.env.PUBLIC_URL + "/sounds/CYCdh_ElecK01-OpHat01.wav",
});

export const tom = new Howl({
    src: process.env.PUBLIC_URL + "/sounds/CYCdh_ElecK01-Tom01.wav",
});

export const instruments: Record<Instruments, Instrument> = {
    kick: {
        name: "Kick",
        src: getSrc("/sounds/CYCdh_ElecK01-Kick01.wav"),
    },
    snare: {
        name: "Snare",
        src: getSrc("/sounds/CYCdh_ElecK01-Snr01.wav"),
    },
    closedHat: {
        name: "Closed Hat",
        src: getSrc("/sounds/CYCdh_ElecK01-ClHat01.wav"),
    },
};

function getSrc(path: string) {
    return process.env.PUBLIC_URL + path;
}
