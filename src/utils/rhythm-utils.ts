import { Howl } from "howler";

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

export const closedHat = new Howl({
    src: process.env.PUBLIC_URL + "/sounds/CYCdh_ElecK01-ClHat.wav",
});

export const openHat = new Howl({
    src: process.env.PUBLIC_URL + "/sounds/CYCdh_ElecK01-OpHat01.wav",
});

export const snare = new Howl({
    src: process.env.PUBLIC_URL + "/sounds/CYCdh_ElecK01-Snr01.wav",
});

export const tom = new Howl({
    src: process.env.PUBLIC_URL + "/sounds/CYCdh_ElecK01-Tom01.wav",
});

export const howls: Record<string, Howl> = {
    kick: new Howl({ src: process.env.PUBLIC_URL + "/sounds/CYCdh_ElecK01-Kick01.wav" }),
};
