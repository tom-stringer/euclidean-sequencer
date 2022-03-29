import { useRecoilCallback } from "recoil";
import { tempoState, trackIdsState, trackState } from "../recoil/rhythm-state";
import RhythmDTO from "../types/dto/rhythm-dto";

export default function useLoadRhythm() {
    const loadRhythm = useRecoilCallback(
        ({ set }) =>
            async (rhythmDTO: RhythmDTO) => {
                set(tempoState, rhythmDTO.tempo);

                for (const track of rhythmDTO.tracks) {
                    set(trackIdsState, (value) => [...value, track.id]);
                    set(trackState(track.id), track);
                }
            },
        []
    );

    return loadRhythm;
}
