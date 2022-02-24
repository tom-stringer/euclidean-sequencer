import { atomFamily } from "recoil";

export enum TrackControlStates {
    CLOSED,
    OPEN,
    ADVANCED,
}

export const trackControlsState = atomFamily<TrackControlStates, string>({
    key: "tracksControls",
    default: TrackControlStates.CLOSED,
});
