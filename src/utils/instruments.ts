import { Instrument, Instruments } from "../types/rhythm-types";

export const instruments: Record<Instruments, Instrument> = {
    kick: {
        key: Instruments.KICK,
        name: "Kick",
        src: getSrc("/sounds/CYCdh_ElecK01-Kick01.wav"),
        note: "C1",
    },
    snare: {
        key: Instruments.SNARE,
        name: "Snare",
        src: getSrc("/sounds/CYCdh_ElecK01-Snr01.wav"),
        note: "D1",
    },
    closedHat: {
        key: Instruments.CLOSED_HAT,
        name: "Closed Hi-hat",
        src: getSrc("/sounds/CYCdh_ElecK01-ClHat01-2.wav"),
        note: "E1",
    },
    openHat: {
        key: Instruments.OPEN_HAT,
        name: "Open Hi-hat",
        src: getSrc("/sounds/CYCdh_ElecK01-OpHat01.wav"),
        note: "F1",
    },
    cymbal: {
        key: Instruments.CYMBAL,
        name: "Cymbal",
        src: getSrc("/sounds/CYCdh_ElecK01-Cymbal.wav"),
        note: "G1",
    },
};

function getSrc(path: string) {
    return process.env.PUBLIC_URL + path;
}
