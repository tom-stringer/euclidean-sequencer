import { getPattern } from "euclidean-rhythms";
import { FC, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { trackState } from "../recoil/rhythm-state";
import { clamp } from "../utils/math-utils";
import { instruments, rotateNecklace } from "../utils/rhythm-utils";
import ChevronDownIcon from "./icons/ChevronDownIcon";
import ChevronUpIcon from "./icons/ChevronUpIcon";
import KnobGroup from "./input/KnobGroup";

interface TrackControlsProps {
    id: string;
}

enum DisplayState {
    CLOSED,
    OPEN,
    ADVANCED,
}

const TrackControls: FC<TrackControlsProps> = ({ id }) => {
    const [track, setTrack] = useRecoilState(trackState(id));
    const [displayState, setDisplayState] = useState(DisplayState.CLOSED);
    const instrumentName = instruments[track.instrument].name;

    useEffect(() => {
        setTrack((value) => {
            const necklace = rotateNecklace(getPattern(value.pulses, value.steps), value.rotation);
            return {
                ...value,
                necklace,
            };
        });
    }, [track.pulses, track.steps, track.rotation]);

    function handleClickChevron() {
        setDisplayState((previousState) => {
            switch (previousState) {
                case DisplayState.CLOSED: {
                    return DisplayState.OPEN;
                }
                case DisplayState.OPEN: {
                    return DisplayState.CLOSED;
                }
                default:
                    return DisplayState.CLOSED;
            }
        });
    }

    function handleStepsChange(change: number) {
        setTrack((previous) => ({
            ...previous,
            steps: clamp(previous.steps + change, 1, 16),
        }));
    }

    function handlePulsesChange(change: number) {
        setTrack((previous) => ({
            ...previous,
            pulses: clamp(previous.pulses + change, 1, 16),
        }));
    }

    function handleRotationChange(change: number) {
        setTrack((previous) => ({
            ...previous,
            rotation: clamp(previous.rotation + change, 0, 16),
        }));
    }

    return (
        <div className="rounded-lg w-full px-4 py-2 bg-surface-1 border-t-2 border-orange-light">
            {/* Top bar: name and chevron. */}
            <div className="flex justify-between items-center">
                {/* Instrument name and indicator. */}
                <div className="flex items-center">
                    <div className="rounded-full bg-surface-2 w-3 h-3" />
                    <h1 className="ml-4 text-lg">{instrumentName}</h1>
                </div>

                {/* Chevron button. */}
                <button onClick={() => handleClickChevron()} className="flex justify-center">
                    {displayState === DisplayState.CLOSED && (
                        <ChevronDownIcon className="stroke-muted w-5 h-5 float-right" />
                    )}
                    {displayState === DisplayState.OPEN && (
                        <ChevronUpIcon className="stroke-muted w-5 h-5 float-right" />
                    )}
                </button>
            </div>
            {/* Knob controls for steps, pulses, rotation. */}
            {displayState === DisplayState.OPEN && (
                <div className="flex justify-between items-center my-4">
                    <KnobGroup
                        value={track.steps}
                        min={1}
                        max={16}
                        onChange={(change) => handleStepsChange(change)}
                        title="Steps"
                        showValue
                    />
                    <KnobGroup
                        value={track.pulses}
                        min={1}
                        max={16}
                        onChange={(change) => handlePulsesChange(change)}
                        title="Pulses"
                        showValue
                    />
                    <KnobGroup
                        value={track.rotation}
                        min={0}
                        max={16}
                        onChange={(change) => handleRotationChange(change)}
                        title="Rotation"
                        showValue
                    />
                </div>
            )}
        </div>
    );
};

export default TrackControls;
