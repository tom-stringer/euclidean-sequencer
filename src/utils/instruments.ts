import { Instrument, Instruments } from "../types/rhythm-types";

export const instruments: Record<Instruments, Instrument> = {
    kick: {
        key: Instruments.KICK,
        name: "Kick",
        src: getSrc("/sounds/CYCdh_ElecK01-Kick01.wav"),
    },
    snare: {
        key: Instruments.SNARE,
        name: "Snare",
        src: getSrc("/sounds/CYCdh_ElecK01-Snr01.wav"),
    },
    closedHat: {
        key: Instruments.CLOSED_HAT,
        name: "Closed Hi-hat",
        src: getSrc("/sounds/CYCdh_ElecK01-ClHat01-2.wav"),
    },
    openHat: {
        key: Instruments.OPEN_HAT,
        name: "Open Hi-hat",
        src: getSrc("/sounds/CYCdh_ElecK01-OpHat01.wav"),
    },
    cymbal: {
        key: Instruments.CYMBAL,
        name: "Cymbal",
        src: getSrc("/sounds/CYCdh_ElecK01-Cymbal.wav"),
    },
};

function getSrc(path: string) {
    return process.env.PUBLIC_URL + path;
}
