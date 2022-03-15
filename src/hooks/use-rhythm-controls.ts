import { useSetRecoilState } from "recoil";
import { Transport } from "tone";
import { isPlayingState } from "../recoil/rhythm-state";

export default function useRhythmControls() {
    const setPlaying = useSetRecoilState(isPlayingState);

    return {
        startRhythm: () => {
            Transport.start();
            setPlaying(true);
        },
        stopRhythm: () => {
            Transport.stop();
            setPlaying(false);
        },
    };
}
