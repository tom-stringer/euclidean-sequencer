import { useRecoilCallback } from "recoil";
import { v4 } from "uuid";
import { createTrack } from "../factories/track-factory";
import { trackIdsState, trackState } from "../recoil/rhythm-state";
import { trackControlsState, TrackControlStates } from "../recoil/ui-state";
import { Instrument } from "../types/rhythm-types";
import { Colours } from "../utils/colours";

export default function useAddTrack() {
    const addTrack = useRecoilCallback(
        ({ set, snapshot }) =>
            async (instrument: Instrument) => {
                const trackIds = await snapshot.getPromise(trackIdsState);

                const usedColours: Colours[] = [];
                for (const id of trackIds) {
                    const track = await snapshot.getPromise(trackState(id));
                    if (!usedColours.includes(track.colour)) {
                        usedColours.push(track.colour);
                    }
                }

                const availableColours = Object.values(Colours).filter((colour) => !usedColours.includes(colour));
                let colour = availableColours[Math.floor(Math.random() * availableColours.length)];

                if (!colour) {
                    colour = Object.values(Colours)[Math.floor(Math.random() * Object.values(Colours).length)];
                }

                const id = v4();
                set(trackState(id), createTrack(id, instrument, 8, 4, colour));
                set(trackControlsState(id), TrackControlStates.CLOSED);
                set(trackIdsState, [...trackIds, id]);
            },
        []
    );

    return addTrack;
}
