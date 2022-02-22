import { atom, DefaultValue, selectorFamily } from "recoil";
import { createTrack } from "../factories/track-factory";
import { Instruments, Track } from "../types/rhythm-types";

export const rhythmLengthState = atom<number>({
    key: "rhythmLength",
    default: 8, // TODO: change this to 0 after testing
});

export const currentStepState = atom<number>({
    key: "currentStep",
    default: 0,
});

export const tracksState = atom<Record<string, Track>>({
    key: "tracks",
    default: {
        test: createTrack("test", Instruments.KICK, 8, 3), // TODO: change this to empty after testing
    },
});

export const trackState = selectorFamily<Track, string>({
    key: "track",
    get:
        (id) =>
        ({ get }) =>
            get(tracksState)[id],
    set:
        (id) =>
        ({ get, set }, value) => {
            if (value instanceof DefaultValue) {
                const tracks = { ...get(tracksState) };
                delete tracks[id];
                set(tracksState, tracks);
                return;
            }

            set(tracksState, (previous) => ({ ...previous, [id]: value }));
        },
});

export const isPlayingState = atom<boolean>({
    key: "isPlaying",
    default: false,
});

export const tempoState = atom<number>({
    key: "tempo",
    default: 60,
});
