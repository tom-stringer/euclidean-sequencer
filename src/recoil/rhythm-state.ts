import { atom, atomFamily } from "recoil";
import { createTrack } from "../factories/track-factory";
import Track from "../types/track";
import { Colours } from "../utils/colours";

export const trackIdsState = atom<string[]>({
    key: "trackIds",
    default: [],
});

export const trackState = atomFamily<Track, string>({
    key: "track",
    default: createTrack("default", { name: "Default", note: "C1", url: "default" }, 8, 4, Colours.GREEN),
});

export const isPlayingState = atom<boolean>({
    key: "isPlaying",
    default: false,
});

export const tempoState = atom<number>({
    key: "tempo",
    default: 60,
});

export const metronomeState = atom({
    key: "metronome",
    default: false,
});
