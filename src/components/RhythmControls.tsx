import { FC } from "react";
import { useRecoilState } from "recoil";
import env from "../env";
import { isPlayingState, tempoState } from "../recoil/rhythm-state";
import PauseIcon from "./icons/PauseIcon";
import PlayIcon from "./icons/PlayIcon";
import KnobGroup from "./input/KnobGroup";

const RhythmControls: FC = () => {
    const [isPlaying, setPlaying] = useRecoilState(isPlayingState);
    const [tempo, setTempo] = useRecoilState(tempoState);

    function handleClickPlay() {
        setPlaying((value) => !value);
    }

    function handleTempoChange(value: number) {
        setTempo(Math.floor(value));
    }

    function handleTempoIncrement(change: number) {
        setTempo((value) => value + change);
    }

    return (
        <div className="flex justify-evenly items-center bg-gray-800 rounded-lg px-5 py-3">
            <button onClick={() => handleClickPlay()} className="flex justify-center">
                {!isPlaying ? (
                    <PlayIcon className="fill-white w-5 h-5" />
                ) : (
                    <PauseIcon className="fill-white w-5 h-5" />
                )}
            </button>

            <KnobGroup
                value={tempo}
                min={env.TEMPO_MIN}
                max={env.TEMPO_MAX}
                onChange={(value) => handleTempoChange(value)}
                onIncrement={(change) => handleTempoIncrement(change)}
            />

            <p className="text-lg">
                {tempo} <span className="text-muted text-sm">BPM</span>
            </p>
        </div>
    );
};

export default RhythmControls;
