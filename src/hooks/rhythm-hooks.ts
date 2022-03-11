import { useRecoilValue, useSetRecoilState } from "recoil";
import { Transport } from "tone";
import { isPlayingState, trackState } from "../recoil/rhythm-state";
import { getStepDelayMillis, getStepDelaySeconds } from "../utils/rhythm-utils";

export function useStepDelay(): number {
    return getStepDelayMillis();
}

export function useStartRhythm() {
    const setPlaying = useSetRecoilState(isPlayingState);

    return () => {
        Transport.start();
        setPlaying(true);
    };
}

export function useStopRhythm() {
    const setPlaying = useSetRecoilState(isPlayingState);

    return () => {
        Transport.stop();
        setPlaying(false);
    };
}

export function useCurrentStep(trackId: string) {
    const track = useRecoilValue(trackState(trackId));

    return Math.floor(Transport.seconds / getStepDelaySeconds()) % track.steps;
}
