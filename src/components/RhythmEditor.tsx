import { FC } from "react";
import { useRecoilState } from "recoil";
import { v4 } from "uuid";
import { createTrack } from "../factories/track-factory";
import { isPlayingState, tempoState, tracksState } from "../recoil/rhythm-state";
import { Instruments } from "../types/rhythm-types";
import TrackEditor from "./TrackEditor";

const RhythmEditor: FC = () => {
    const [isPlaying, setPlaying] = useRecoilState(isPlayingState);
    const [tempo, setTempo] = useRecoilState(tempoState);
    const [tracks, setTracks] = useRecoilState(tracksState);

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
            {Object.keys(tracks).map((id) => (
                <TrackEditor key={id} id={id} />
            ))}
        </div>
    );
};

export default RhythmEditor;
