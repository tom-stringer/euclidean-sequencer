import { Track } from "../rhythm-types";

export default interface RhythmDTO {
    tracks: Track[];
    tempo: number;
}
