import { FC } from "react";
import { useRecoilState } from "recoil";
import { v4 } from "uuid";
import { createTrack } from "../factories/track-factory";
import { useStepDelay } from "../hooks/rhythm-hooks";
import { isPlayingState, tempoState, tracksState } from "../recoil/rhythm-state";
import { Track } from "../types/rhythm-types";
import TrackEditor from "./TrackEditor";
import RecoilDebugger from "./utils/RecoilDebugger";

const RhythmEditor: FC = () => {
    const [isPlaying, setPlaying] = useRecoilState(isPlayingState);
    const [tempo, setTempo] = useRecoilState(tempoState);
    const [tracks, setTracks] = useRecoilState(tracksState);
    const stepDelay = useStepDelay();

    function nextStep() {
        setTracks((value) => {
            let updatedTracks = {
                ...value,
            };

            for (const [id, track] of Object.entries(value)) {
                const updatedTrack: Track = {
                    ...track,
                    currentStep: (track.currentStep + 1) % track.steps,
                };

                updatedTracks = {
                    ...updatedTracks,
                    [id]: updatedTrack,
                };
            }

            return updatedTracks;
        });
    }

    function queueNextStep() {
        nextStep();
        window.setTimeout(() => {
            queueNextStep();
        }, stepDelay);
    }
    function addTrack() {
        const id = v4();
        setTracks((value) => ({ ...value, [id]: createTrack(id, "kick", 8, 3) }));
    }

    // useEffect(() => {
    //     if (isPlaying) {
    //         queueNextStep();
    //     }
    // }, [isPlaying]);

    return (
        <div>
            <button onClick={() => setPlaying(!isPlaying)}>{isPlaying ? "Stop" : "Play"}</button>
            <input
                type="text"
                value={String(tempo)}
                onChange={(event) => !Number.isNaN(Number(event.target.value)) && setTempo(Number(event.target.value))}
            />
            <button onClick={() => addTrack()}>Add Track</button>
            {Object.keys(tracks).map((id) => (
                <TrackEditor key={id} id={id} />
            ))}
            <RecoilDebugger />
        </div>
    );
};

export default RhythmEditor;
