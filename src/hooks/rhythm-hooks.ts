import { useRecoilValue } from "recoil";
import { tempoState } from "../recoil/rhythm-state";
import { getStepDelay } from "../utils/rhythm-utils";

export function useStepDelay(): number {
    const tempo = useRecoilValue(tempoState);
    return getStepDelay(tempo);
}
