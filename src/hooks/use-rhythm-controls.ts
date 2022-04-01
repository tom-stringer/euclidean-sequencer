import { useSetRecoilState } from "recoil";
import { context, Transport } from "tone";
import { isPlayingState } from "../recoil/rhythm-state";

export default function useRhythmControls() {
    const setPlaying = useSetRecoilState(isPlayingState);

    return {
        startRhythm: async () => {
            await context.resume();
            Transport.start("+0.1");
            setPlaying(true);
        },
        stopRhythm: () => {
            Transport.stop();
            setPlaying(false);
        },
    };
}
