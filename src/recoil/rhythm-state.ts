import { atom, DefaultValue, selector, selectorFamily } from "recoil";
import { Rhythm, Track } from "../types/rhythm-types";

export const rhythmState = atom<Rhythm>({
    key: "rhythm",
    default: {
        tracks: {},
    },
});

export const tracksState = selector<Record<string, Track>>({
    key: "tracks",
    get: ({ get }) => get(rhythmState).tracks,
    set: ({ get, set }, value) => {
        if (value instanceof DefaultValue) {
            return;
        }

        const rhythm = get(rhythmState);
        set(rhythmState, { ...rhythm, tracks: value });
    },
});

export const trackState = selectorFamily<Track, string>({
    key: "track",
    get:
        (id) =>
        ({ get }) =>
            get(rhythmState).tracks[id],
    set:
        (id) =>
        ({ get, set }, value) => {
            if (value instanceof DefaultValue) {
                return;
            }
            const rhythm = get(rhythmState);
            set(rhythmState, { ...rhythm, tracks: { ...rhythm.tracks, [id]: value } });
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
