import { atom, selector } from "recoil";

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

export const selectTrack = selector({
    key: "track",
    get: ({ get }) => get(rhythmState).tracks[0],
});

export const isPlayingState = atom({
    key: "isPlaying",
    default: false,
});
