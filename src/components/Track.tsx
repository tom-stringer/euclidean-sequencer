import { getPattern } from "euclidean-rhythms";
import { FC, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useStepDelay } from "../hooks/rhythm-hooks";
import { isPlayingState, tracksState, trackState } from "../recoil/rhythm-state";
import { howls, rotateNecklace } from "../utils/rhythm-utils";

interface TrackProps {
    id: string;
}

const Track: FC<TrackProps> = ({ id }) => {
    const [track, setTrack] = useRecoilState(trackState(id));
    const setTracks = useSetRecoilState(tracksState);
    const [isPlaying, setPlaying] = useRecoilState(isPlayingState);
    const stepDelay = useStepDelay();
    const [pulsesInput, setPulsesInput] = useState("3");
    const [stepsInput, setStepsInput] = useState("8");
    const [rotationInput, setRotationInput] = useState("0");

    function setPulses(pulses: string) {
        setPulsesInput(pulses);
        if (!isNaN(Number(pulses))) {
            setTrack((value) => ({
                ...value,
                pulses: Number(pulses),
            }));
        }
    }

    function setSteps(steps: string) {
        setStepsInput(steps);
        if (!isNaN(Number(steps))) {
            setTrack((value) => ({
                ...value,
                steps: Number(steps),
            }));
        }
    }

    function setRotation(rotation: string) {
        setRotationInput(rotation);
        if (!isNaN(Number(rotation))) {
            setTrack((value) => ({
                ...value,
                rotation: Number(rotation),
            }));
        }
    }

    function removeTrack() {
        setTracks((value) => {
            const newTracks = {
                ...value,
            };
            delete newTracks[id];
            return newTracks;
        });
    }

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
        if (isPlaying) {
            if (track.necklace[track.currentStep]) {
                track.instrument.howl.play();
            }
            setTimeout(() => {
                setTrack((value) => ({
                    ...value,
                    currentStep: (value.currentStep + 1) % value.steps,
                }));
            }, stepDelay);
        } else {
            setTrack((value) => ({
                ...value,
                currentStep: 0,
            }));
        }
    }, [isPlaying, track.currentStep]);

    useEffect(() => {
        setPlaying(false);
        setTrack((value) => ({
            ...value,
            currentStep: 0,
        }));
    }, [track.steps]);

    return (
        <div>
            <label htmlFor="pulses">Pulses:</label>
            <input type="text" id="pulses" value={pulsesInput} onChange={(event) => setPulses(event.target.value)} />

            <label htmlFor="steps">Steps:</label>
            <input type="text" id="steps" value={stepsInput} onChange={(event) => setSteps(event.target.value)} />

            <label htmlFor="rotation">Rotation:</label>
            <input
                type="text"
                id="rotation"
                value={rotationInput}
                onChange={(event) => setRotation(event.target.value)}
            />

            <button onClick={() => removeTrack()}>&times;</button>

            <p>
                {track.necklace.map((step, i) =>
                    i === track.currentStep ? (
                        <span key={i} style={{ color: "red" }}>
                            {step}
                        </span>
                    ) : (
                        step
                    )
                )}
            </p>
        </div>
    );
};

export default Track;
