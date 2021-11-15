import { getPattern } from "euclidean-rhythms";
import { FC, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useStepDelay } from "../hooks/rhythm-hooks";
import { isPlayingState, trackState } from "../recoil/rhythm-state";
import { rotateNecklace } from "../utils/rhythm-utils";
import { soundSprite } from "./App";

interface TrackProps {
    id: string;
}

const Track: FC<TrackProps> = ({ id }) => {
    const [track, setTrack] = useRecoilState(trackState(id));
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

    // ! Change where the track is initialised.
    useEffect(() => {
        setTrack((value) => {
            const necklace = rotateNecklace(getPattern(3, 8), 0);
            return {
                ...value,
                steps: 8,
                pulses: 3,
                rotation: 0,
                necklace,
            };
        });
    }, []);

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
                soundSprite.play("kick");
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

            <p>
                {track.necklace.map((step, i) =>
                    i === track.currentStep ? <span style={{ color: "red" }}>{step}</span> : step
                )}
            </p>
        </div>
    );
};

export default Track;
