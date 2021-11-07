import { getPattern } from "euclidean-rhythms";
import { FC, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { isPlayingState, rhythmState } from "../recoil/rhythm-state";
import { rotateNecklace } from "../utils/rhythm-utils";
import { soundSprite } from "./App";

const Rhythm: FC = () => {
    const [isPlaying, setPlaying] = useRecoilState(isPlayingState);
    const [rhythm, setRhythm] = useRecoilState(rhythmState);
    const [pulsesInput, setPulsesInput] = useState("3");
    const [stepsInput, setStepsInput] = useState("8");
    const [rotationInput, setRotationInput] = useState("0");

    function setPulses(pulses: string) {
        setPulsesInput(pulses);
        if (!isNaN(Number(pulses))) {
            setRhythm((value) => ({
                ...value,
                tracks: [{ ...value.tracks[0], pulses: Number(pulses) }],
            }));
        }
    }

    function setSteps(steps: string) {
        setStepsInput(steps);
        if (!isNaN(Number(steps))) {
            setRhythm((value) => ({
                ...value,
                tracks: [{ ...value.tracks[0], steps: Number(steps) }],
            }));
        }
    }

    function setRotation(rotation: string) {
        setRotationInput(rotation);
        if (!isNaN(Number(rotation))) {
            setRhythm((value) => ({
                ...value,
                tracks: [{ ...value.tracks[0], rotation: Number(rotation) }],
            }));
        }
    }

    useEffect(() => {
        setRhythm((value) => {
            const necklace = rotateNecklace(
                getPattern(rhythm.tracks[0].pulses, rhythm.tracks[0].steps),
                rhythm.tracks[0].rotation
            );
            return {
                ...value,
                tracks: [{ ...value.tracks[0], necklace }],
            };
        });
    }, []);

    useEffect(() => {
        setRhythm((value) => {
            const necklace = rotateNecklace(
                getPattern(rhythm.tracks[0].pulses, rhythm.tracks[0].steps),
                rhythm.tracks[0].rotation
            );
            return {
                ...value,
                tracks: [{ ...value.tracks[0], necklace }],
            };
        });
    }, [rhythm.tracks[0].pulses, rhythm.tracks[0].steps, rhythm.tracks[0].rotation]);

    useEffect(() => {
        if (isPlaying) {
            if (rhythm.tracks[0].necklace[rhythm.tracks[0].currentStep]) {
                soundSprite.play("kick");
            }
            setTimeout(() => {
                setRhythm((value) => ({
                    ...value,
                    tracks: [
                        { ...value.tracks[0], currentStep: (value.tracks[0].currentStep + 1) % rhythm.tracks[0].steps },
                    ],
                }));
            }, 100);
        } else {
            setRhythm((value) => ({
                ...value,
                tracks: [{ ...value.tracks[0], currentStep: 0 }],
            }));
        }
    }, [isPlaying, rhythm.tracks[0].currentStep]);

    useEffect(() => {
        setPlaying(false);
        setRhythm((value) => ({
            ...value,
            tracks: [{ ...value.tracks[0], currentStep: 0 }],
        }));
    }, [rhythm.tracks[0].steps]);

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

            <button onClick={() => setPlaying(!isPlaying)}>{isPlaying ? "Stop" : "Play"}</button>

            <p>
                {rhythm.tracks[0].necklace.map((step, i) =>
                    i === rhythm.tracks[0].currentStep ? <span style={{ color: "red" }}>{step}</span> : step
                )}
            </p>
        </div>
    );
};

export default Rhythm;
