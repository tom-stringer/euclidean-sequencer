import { FC } from "react";
import { useRecoilState } from "recoil";
import env from "../env";
import { isPlayingState, tempoState } from "../recoil/rhythm-state";
import { clamp } from "../utils/math-utils";
import MinusIcon from "./icons/MinusIcon";
import PauseIcon from "./icons/PauseIcon";
import PlayIcon from "./icons/PlayIcon";
import PlusIcon from "./icons/PlusIcon";
import Knob from "./input/Knob";

const RhythmControls: FC = () => {
    const [isPlaying, setPlaying] = useRecoilState(isPlayingState);
    const [tempo, setTempo] = useRecoilState(tempoState);

    function handleClickPlay() {
        setPlaying((value) => !value);
    }

    function incrementTempo(amount: number) {
        setTempo((value) => value + amount);
    }

    function handleTempoChange(changeAmount: number) {
        setTempo((value) => clamp(value + changeAmount, env.TEMPO_MIN, env.TEMPO_MAX));
    }

    return (
        <div className="flex justify-center items-center bg-gray-800 rounded-lg px-5 py-3">
            <button onClick={() => handleClickPlay()} className="flex justify-center">
                {!isPlaying ? (
                    <PlayIcon className="fill-white w-5 h-5" />
                ) : (
                    <PauseIcon className="fill-white w-5 h-5" />
                )}
            </button>

            <div className="flex justify-between items-center">
                <button onClick={() => incrementTempo(-1)} className="flex justify-center">
                    <MinusIcon className="stroke-gray-400 w-5 h-5" />
                </button>
                <Knob min={1} max={200} value={tempo} onChange={(changeAmount) => handleTempoChange(changeAmount)} />
                <button onClick={() => incrementTempo(1)} className="flex justify-center">
                    <PlusIcon className="stroke-gray-400 w-5 h-5" />
                </button>
                <p className="text-lg">
                    {tempo} <span className="text-gray-400 text-sm">BPM</span>
                </p>
            </div>
        </div>
    );
};

export default RhythmControls;
