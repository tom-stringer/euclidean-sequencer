import { isEqual } from "lodash";
import { FC, useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useStepDelay } from "../hooks/rhythm-hooks";
import { isDebuggingState } from "../recoil/debug-state";
import { currentStepState, isPlayingState, rhythmLengthState, tracksState } from "../recoil/rhythm-state";
import AddTrackButton from "./AddTrackButton";
import RhythmControls from "./RhythmControls";
import TrackCircle from "./TrackCircle";
import TrackControls from "./TrackControls";

const RhythmEditor: FC = () => {
    const [rhythmLength, setRhythmLength] = useRecoilState(rhythmLengthState);
    const [currentStep, setCurrentStep] = useRecoilState(currentStepState);
    const [isPlaying] = useRecoilState(isPlayingState);
    const [tracks, setTracks] = useRecoilState(tracksState);
    const [trackStepsCache, setTrackStepCache] = useState(Object.values(tracks).map((track) => track.steps));
    const stepDelay = useStepDelay();
    const circlesContainer = useRef<HTMLDivElement>(null);
    const [circlesContainerHeight, setCirclesContainerHeight] = useState<number | undefined>(
        circlesContainer.current?.offsetWidth
    );
    const isDebugging = useRecoilValue(isDebuggingState);
    const setPlaying = useSetRecoilState(isPlayingState);

    useEffect(() => {
        window.addEventListener("keypress", handleSpacebar);

        return () => {
            window.removeEventListener("keypress", handleSpacebar);
        };
    }, []);

    // TODO: devise a more efficient method of listening for track step count changes.
    useEffect(() => {
        const trackSteps = Object.values(tracks).map((track) => track.steps);

        if (!isEqual(trackSteps, trackStepsCache)) {
            const length = Object.values(tracks).reduce(
                (value, track) => (track.steps ? value * track.steps : value),
                1
            );

            setRhythmLength(length);
            setTrackStepCache(trackSteps);
        }
    }, [tracks]);

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
    }, [circlesContainer.current?.offsetWidth]);

    function handleSpacebar(event: KeyboardEvent) {
        event.preventDefault();
        setPlaying((current) => !current);
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
                {Object.keys(tracks).map((id, i) => (
                    <TrackCircle key={id} id={id} index={i} />
                ))}
            </div>
            {Object.keys(tracks).map((id) => (
                <TrackControls key={id} id={id} />
            ))}
            <div className="flex justify-center">
                <AddTrackButton />
            </div>
        </>
    );
};

export default RhythmEditor;
