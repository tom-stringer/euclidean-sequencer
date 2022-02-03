import { useRecoilValue, useSetRecoilState } from "recoil";
import { rhythmState, tempoState, tracksState } from "../recoil/rhythm-state";
import { getStepDelay } from "../utils/rhythm-utils";

export function useStepDelay(): number {
    const tempo = useRecoilValue(tempoState);
    return getStepDelay(tempo);
}

export function useUpdateRhythmLength() {
    const tracks = useRecoilValue(tracksState);
    const setRhythm = useSetRecoilState(rhythmState);

    return function () {
        const length = Object.values(tracks).reduce((value, track) => (track.steps ? value * track.steps : value), 1);

        setRhythm((rhythm) => ({
            ...rhythm,
            length,
        }));
    };
}
