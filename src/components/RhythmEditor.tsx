import { FC, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useStepDelay } from "../hooks/rhythm-hooks";
import useWindowDimensions from "../hooks/use-window-dimensions";
import { isDebuggingState } from "../recoil/debug-state";
import { currentStepState, isPlayingState, rhythmLengthState, trackIdsState } from "../recoil/rhythm-state";
import AddTrackButton from "./AddTrackButton";
import RhythmControls from "./RhythmControls";
import TrackCircle from "./TrackCircle";
import TrackControls from "./TrackControls";

const RhythmEditor: FC = () => {
    const [rhythmLength, setRhythmLength] = useRecoilState(rhythmLengthState);
    const [currentStep, setCurrentStep] = useRecoilState(currentStepState);
    const [isPlaying] = useRecoilState(isPlayingState);
    const trackIds = useRecoilValue(trackIdsState);
    const stepDelay = useStepDelay();
    const circlesContainer = useRef<HTMLDivElement>(null);
    const [circlesContainerHeight, setCirclesContainerHeight] = useState<number | undefined>(
        circlesContainer.current?.offsetWidth
    );
    const isDebugging = useRecoilValue(isDebuggingState);
    const setPlaying = useSetRecoilState(isPlayingState);
    const { width } = useWindowDimensions();

    useEffect(() => {
        window.addEventListener("keypress", handleSpacebar);

        return () => {
            window.removeEventListener("keypress", handleSpacebar);
        };
    }, []);

    useEffect(() => {
        if (isPlaying) {
            setTimeout(() => {
                setCurrentStep((current) => (current + 1) % rhythmLength);
            }, stepDelay);
        } else {
            setCurrentStep(0);
        }
    }, [isPlaying, currentStep]);

    useEffect(() => {
        setCirclesContainerHeight(circlesContainer.current?.offsetWidth);
    }, [circlesContainer.current?.offsetWidth, width]);

    function handleSpacebar(event: KeyboardEvent) {
        if (event.key === " ") {
            event.preventDefault();
            setPlaying((current) => !current);
        }
    }

    return (
        <>
            <RhythmControls />
            {isDebugging && (
                <p>
                    {currentStep}/{rhythmLength}
                </p>
            )}
            <div
                className="w-full flex justify-center relative my-4"
                ref={circlesContainer}
                style={{ height: circlesContainerHeight }}>
                {trackIds.map((id, i) => (
                    <TrackCircle key={id} id={id} index={i} />
                ))}
            </div>
            {trackIds.map((id) => (
                <TrackControls key={id} id={id} />
            ))}
            <div className="flex justify-center">
                <AddTrackButton />
            </div>
        </>
    );
};

export default RhythmEditor;
