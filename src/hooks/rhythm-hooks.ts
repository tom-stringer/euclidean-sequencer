import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentStepState, isPlayingState, tempoState } from "../recoil/rhythm-state";
import { getStepDelay } from "../utils/rhythm-utils";

export function useStepDelay(): number {
    const tempo = useRecoilValue(tempoState);
    return getStepDelay(tempo);
}

export function useStopRhythm() {
    const setPlaying = useSetRecoilState(isPlayingState);
    const setCurrentStep = useSetRecoilState(currentStepState);

    return function () {
        setPlaying(false);
        setCurrentStep(0);
    };
}
