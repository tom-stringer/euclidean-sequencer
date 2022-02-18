import { getPattern } from "euclidean-rhythms";
import { FC, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import env from "../env";
import { trackState } from "../recoil/rhythm-state";
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

type TrackControl = "steps" | "pulses" | "rotation";

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

    useEffect(() => {
        if (track.pulses > track.steps) {
            handleChange(track.steps, "pulses");
        }
        if (track.rotation > track.steps) {
            handleChange(track.steps, "rotation");
        }
    }, [track.steps]);

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
                        min={env.STEPS_MIN}
                        max={env.STEPS_MAX}
                        onChange={(value) => handleChange(value, "steps")}
                        onIncrement={(change) => handleIncrement(change, "steps")}
                        title="Steps"
                        showValue
                        colour="orange-light"
                    />
                    <KnobGroup
                        value={track.pulses}
                        min={0}
                        max={track.steps}
                        onChange={(value) => handleChange(value, "pulses")}
                        onIncrement={(change) => handleIncrement(change, "pulses")}
                        title="Pulses"
                        showValue
                        colour="orange-light"
                    />
                    <KnobGroup
                        value={track.rotation}
                        min={0}
                        max={track.steps}
                        onChange={(value) => handleChange(value, "rotation")}
                        onIncrement={(change) => handleIncrement(change, "rotation")}
                        title="Rotation"
                        showValue
                        colour="orange-light"
                    />
                </div>
            )}
        </div>
    );
};

export default TrackControls;
