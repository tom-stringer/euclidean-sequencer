import { useSetRecoilState } from "recoil";
import { Transport } from "tone";
import { isPlayingState } from "../recoil/rhythm-state";
import { getStepDelayMillis } from "../utils/rhythm-utils";

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
