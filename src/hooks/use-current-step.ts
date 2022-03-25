import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Transport } from "tone";
import { metronomeState, tempoState, trackState } from "../recoil/rhythm-state";
import { getStepDelaySeconds } from "../utils/rhythm-utils";

export default function useCurrentStep(trackId: string) {
    const tempo = useRecoilValue(tempoState);
    const track = useRecoilValue(trackState(trackId));
    const metronome = useRecoilValue(metronomeState);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        setCurrentStep(Math.floor(Transport.seconds / getStepDelaySeconds()) % track.steps);
    }, [tempo, track.steps, metronome]);

    return currentStep;
}
