import { useRecoilCallback } from "recoil";
import { tempoState, trackIdsState, trackState } from "../recoil/rhythm-state";
import { Rhythm } from "../types/rhythm-types";

export default function useGetRhythm() {
    const getRhythm: () => Promise<Rhythm> = useRecoilCallback(({ snapshot }) => async () => {
        const trackIds = await snapshot.getPromise(trackIdsState);
        const tracks = [];

        for (const id of trackIds) {
            tracks.push(await snapshot.getPromise(trackState(id)));
        }

        const tempo = await snapshot.getPromise(tempoState);

        return {
            tracks,
            tempo,
        };
    });

    return getRhythm;
}
