import { useRecoilValue } from "recoil";
import env from "../env";
import { trackIdsState } from "../recoil/rhythm-state";

export default function useCanAddTrack() {
    const trackIds = useRecoilValue(trackIdsState);

    return trackIds.length < env.TRACKS_MAX;
}
