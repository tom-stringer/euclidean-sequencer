import { FC } from "react";
import { useRecoilState } from "recoil";
import { v4 } from "uuid";
import { createTrack } from "../factories/track-factory";
import { isPlayingState, tempoState, tracksState } from "../recoil/rhythm-state";
import Track from "./Track";
import RecoilDebugger from "./utils/RecoilDebugger";

const App: FC = () => {
    const [isPlaying, setPlaying] = useRecoilState(isPlayingState);
    const [tempo, setTempo] = useRecoilState(tempoState);
    const [tracks, setTracks] = useRecoilState(tracksState);

    // ! Move this functionality out of the top-level component.
    function addTrack() {
        const id = v4();
        setTracks((value) => ({ ...value, [id]: createTrack(id, "kick", 8, 3) }));
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
                <Track key={id} id={id} />
            ))}
            <RecoilDebugger />
        </div>
    );
};

export default App;
