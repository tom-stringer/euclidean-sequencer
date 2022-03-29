import { useRecoilCallback } from "recoil";
import { tempoState, trackIdsState, trackState } from "../recoil/rhythm-state";
import RhythmDTO from "../types/dto/rhythm-dto";

export default function useGetRhythmDTO() {
    const getRhythmDTO: () => Promise<RhythmDTO> = useRecoilCallback(
        ({ snapshot }) =>
            async () => {
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
            },
        []
    );

    return getRhythmDTO;
}
