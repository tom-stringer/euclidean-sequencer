import { atom, DefaultValue, selector } from "recoil";

interface Track {
    necklace: number[];
    steps: number;
    pulses: number;
    rotation: number;
    currentStep: number;
}

interface Rhythm {
    tracks: Track[];
}

export const rhythmState = atom<Rhythm>({
    key: "rhythm",
    default: { tracks: [{ necklace: [], steps: 8, pulses: 3, rotation: 0, currentStep: 0 }] },
});

export const trackState = selector<Track>({
    key: "track",
    get: ({ get }) => get(rhythmState).tracks[0],
    set: ({ get, set }, value) => {
        const rhythm = get(rhythmState);
        set(rhythmState, value instanceof DefaultValue ? value : { ...rhythm, tracks: [value] });
    },
});

export const isPlayingState = atom<boolean>({
    key: "isPlaying",
    default: false,
});
