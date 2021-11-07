import { Howl } from "howler";
import { FC } from "react";
import { useRecoilState } from "recoil";
import { isPlayingState } from "../recoil/rhythm-state";
import TrackProvider from "./providers/TrackProvider";
import RecoilDebugger from "./utils/RecoilDebugger";

export const soundSprite = new Howl({
    src: [process.env.PUBLIC_URL + "/sounds/drums.mp3"],
    sprite: {
        cowbell: [0, 300],
        conga_hi: [400, 300],
        conga_mid: [4455, 202],
        conga_low: [4863, 343],
        cymbal: [807, 3640],
        hihat_open: [5268, 706],
        hihat_closed: [7496, 90],
        maracas: [6684, 53],
        tom_hi: [6277, 206],
        tom_mid: [7092, 263],
        tom_low: [7903, 370],
        clave: [8307, 44],
        clap: [8712, 208],
        snare: [9116, 137],
        rim: [9521, 36],
        kick: [9929, 390],
    },
});

const App: FC = () => {
    const [isPlaying, setPlaying] = useRecoilState(isPlayingState);

    return (
        <div>
            <button onClick={() => setPlaying(!isPlaying)}>{isPlaying ? "Stop" : "Play"}</button>
            <TrackProvider />
            <TrackProvider />
            <RecoilDebugger />
        </div>
    );
};

export default App;
