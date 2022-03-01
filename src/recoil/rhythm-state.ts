import { atom, atomFamily } from "recoil";
import { createTrack } from "../factories/track-factory";
import { Instruments, Track } from "../types/rhythm-types";

export const trackIdsState = atom<string[]>({
    key: "trackIds",
    default: ["test"], // TODO: change this after testing
});

export const trackState = atomFamily<Track, string>({
    key: "track",
    default: createTrack("test", Instruments.KICK, 8, 3), // TODO: change this after testing
});

export const isPlayingState = atom<boolean>({
    key: "isPlaying",
    default: false,
});

export const tempoState = atom<number>({
    key: "tempo",
    default: 60,
});
