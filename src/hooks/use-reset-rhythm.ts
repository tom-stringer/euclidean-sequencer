import { useRecoilCallback } from "recoil";
import { tempoState, isPlayingState, metronomeState, trackIdsState, trackState } from "../recoil/rhythm-state";
import { trackControlsState } from "../recoil/ui-state";

export default function useResetRhythm() {
    const resetRhythm = useRecoilCallback(
        ({ snapshot, reset }) =>
            async () => {
                reset(tempoState);
                reset(isPlayingState);
                reset(metronomeState);

                const trackIds = await snapshot.getPromise(trackIdsState);
                for (const id of trackIds) {
                    reset(trackState(id));
                    reset(trackControlsState(id));
                }

                reset(trackIdsState);
            },
        []
    );

    return resetRhythm;
}
