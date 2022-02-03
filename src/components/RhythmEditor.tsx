import { FC, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { v4 } from "uuid";
import { createTrack } from "../factories/track-factory";
import { isPlayingState, rhythmState, tempoState, tracksState } from "../recoil/rhythm-state";
import { Instruments } from "../types/rhythm-types";
import TrackEditor from "./TrackEditor";
import { isEqual } from "lodash";
import { useStepDelay } from "../hooks/rhythm-hooks";

const RhythmEditor: FC = () => {
    const [rhythm, setRhythm] = useRecoilState(rhythmState);
    const [isPlaying, setPlaying] = useRecoilState(isPlayingState);
    const [tempo, setTempo] = useRecoilState(tempoState);
    const [tracks, setTracks] = useRecoilState(tracksState);
    const [trackStepsCache, setTrackStepCache] = useState(Object.values(tracks).map((track) => track.steps));
    const stepDelay = useStepDelay();

    // TODO: devise a more efficient method of listening for track step count changes.
    useEffect(() => {
        const trackSteps = Object.values(tracks).map((track) => track.steps);

        if (!isEqual(trackSteps, trackStepsCache)) {
            const length = Object.values(tracks).reduce(
                (value, track) => (track.steps ? value * track.steps : value),
                1
            );

            setRhythm((rhythm) => ({
                ...rhythm,
                length,
            }));

            setTrackStepCache(trackSteps);
        }
    }, [tracks]);

    useEffect(() => {
        if (isPlaying) {
            setTimeout(() => {
                setRhythm((value) => ({
                    ...value,
                    currentStep: (value.currentStep + 1) % value.length,
                }));
            }, stepDelay);
        } else {
            setRhythm((value) => ({
                ...value,
                currentStep: 0,
            }));
        }
    }, [isPlaying, rhythm.currentStep]);

    function addTrack() {
        const id = v4();
        setTracks((value) => ({ ...value, [id]: createTrack(id, Instruments.KICK, 8, 3) }));
    }

    return (
        <div>
            <button onClick={() => setPlaying(!isPlaying)}>{isPlaying ? "Stop" : "Play"}</button>
            <input
                type="text"
                value={String(tempo)}
                onChange={(event) => !Number.isNaN(Number(event.target.value)) && setTempo(Number(event.target.value))}
            />
            <button onClick={() => addTrack()}>Add Track</button>
            <p>
                {rhythm.currentStep}/{rhythm.length}
            </p>
            {Object.keys(tracks).map((id) => (
                <TrackEditor key={id} id={id} />
            ))}
        </div>
    );
};

export default RhythmEditor;
