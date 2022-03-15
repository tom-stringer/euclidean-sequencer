import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Transport } from "tone";
import { tempoState, trackState } from "../recoil/rhythm-state";
import { getStepDelaySeconds } from "../utils/rhythm-utils";

export default function useCurrentStep(trackId: string) {
    const tempo = useRecoilValue(tempoState);
    const track = useRecoilValue(trackState(trackId));
    const [currentStep, setCurrentStep] = useState(track.currentStep);

    useEffect(() => {
        setCurrentStep(Math.floor(Transport.seconds / getStepDelaySeconds()) % track.steps);
    }, [track.steps, tempo, track.currentStep]);

    return currentStep;
}
