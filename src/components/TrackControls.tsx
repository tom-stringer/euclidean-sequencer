import { getPattern } from "euclidean-rhythms";
import { Howl } from "howler";
import { FC, useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import env from "../env";
import { currentStepState, isPlayingState, trackState } from "../recoil/rhythm-state";
import { trackControlsState, TrackControlStates } from "../recoil/ui-state";
import { instruments } from "../utils/instruments";
import { rotateNecklace } from "../utils/rhythm-utils";
import ChevronDownIcon from "./icons/ChevronDownIcon";
import ChevronUpIcon from "./icons/ChevronUpIcon";
import CloseIcon from "./icons/CloseIcon";
import KnobGroup from "./input/KnobGroup";

interface TrackControlsProps {
    id: string;
}

type TrackControl = "steps" | "pulses" | "rotation";

const TrackControls: FC<TrackControlsProps> = ({ id }) => {
    const [track, setTrack] = useRecoilState(trackState(id));
    const removeTrack = useResetRecoilState(trackState(id));
    const [uiState, setUiState] = useRecoilState(trackControlsState(id));
    const removeUiState = useResetRecoilState(trackControlsState(id));
    const [howl, setHowl] = useState(new Howl({ src: instruments[track.instrument].src }));
    const instrumentName = instruments[track.instrument].name;
    const [isPlaying, setPlaying] = useRecoilState(isPlayingState);
    const [currentStep, setCurrentStep] = useRecoilState(currentStepState);

    useEffect(() => {
        setTrack((value) => {
            const necklace = rotateNecklace(getPattern(value.pulses, value.steps), value.rotation);
            return {
                ...value,
                necklace,
            };
        });
    }, [track.pulses, track.steps, track.rotation]);

    useEffect(() => {
        if (track.pulses > track.steps) {
            handleChange(track.steps, "pulses");
        }
        if (track.rotation > track.steps) {
            handleChange(track.steps, "rotation");
        }
    }, [track.steps]);

    useEffect(() => {
        if (isPlaying && track.necklace[currentStep % track.steps]) {
            howl.play();
        }
    }, [isPlaying, currentStep]);

    useEffect(() => {
        setPlaying(false);
        setCurrentStep(0);
    }, [track.steps]);

    useEffect(() => {
        setHowl(new Howl({ src: instruments[track.instrument].src }));
    }, [track.instrument]);

    function handleClickChevron() {
        setUiState((previousState) => {
            switch (previousState) {
                case TrackControlStates.CLOSED: {
                    return TrackControlStates.OPEN;
                }
                case TrackControlStates.OPEN: {
                    return TrackControlStates.CLOSED;
                }
                default:
                    return TrackControlStates.CLOSED;
            }
        });
    }

    function handleClickClose() {
        removeTrack();
        removeUiState();
    }

    function handleChange(value: number, control: TrackControl) {
        setTrack((current) => ({
            ...current,
            [control]: Math.floor(value),
        }));
    }

    function handleIncrement(change: number, control: TrackControl) {
        setTrack((current) => ({
            ...current,
            [control]: Math.floor(current[control] + change),
        }));
    }

    const controlsClass = `rounded-lg w-full px-4 py-2 my-4 bg-surface-1 border-t-2 border-${track.colour}-medium`;
    const chevronClass = "stroke-muted w-5 h-5 hover:stroke-muted-light";
    const knobColour = `${track.colour}-medium`;

    return (
        <div className={controlsClass}>
            {/* Top bar: name, chevron, close. */}
            <div className="flex justify-between items-center">
                {/* Instrument name and indicator. */}
                <div className="flex items-center">
                    <div className="rounded-full bg-surface-2 w-3 h-3" />
                    <h1 className="ml-4 text-lg">{instrumentName}</h1>
                </div>

                {/* Chevron and close. */}
                <div className="flex items-center">
                    <button onClick={() => handleClickChevron()} className="flex justify-center">
                        {uiState === TrackControlStates.CLOSED && <ChevronDownIcon className={chevronClass} />}
                        {uiState === TrackControlStates.OPEN && <ChevronUpIcon className={chevronClass} />}
                    </button>
                    <button onClick={() => handleClickClose()} className="flex justify-center ml-2">
                        <CloseIcon className="stroke-muted w-5 h-5 hover:stroke-red-light" />
                    </button>
                </div>
            </div>
            {/* Knob controls for steps, pulses, rotation. */}
            {uiState === TrackControlStates.OPEN && (
                <div className="flex justify-between items-center my-4">
                    <KnobGroup
                        value={track.steps}
                        min={env.STEPS_MIN}
                        max={env.STEPS_MAX}
                        onChange={(value) => handleChange(value, "steps")}
                        onIncrement={(change) => handleIncrement(change, "steps")}
                        title="Steps"
                        showValue
                        colour={knobColour}
                    />
                    <KnobGroup
                        value={track.pulses}
                        min={0}
                        max={track.steps}
                        onChange={(value) => handleChange(value, "pulses")}
                        onIncrement={(change) => handleIncrement(change, "pulses")}
                        title="Pulses"
                        showValue
                        colour={knobColour}
                    />
                    <KnobGroup
                        value={track.rotation}
                        min={0}
                        max={track.steps}
                        onChange={(value) => handleChange(value, "rotation")}
                        onIncrement={(change) => handleIncrement(change, "rotation")}
                        title="Rotation"
                        showValue
                        colour={knobColour}
                    />
                </div>
            )}
        </div>
    );
};

export default TrackControls;
