import { FC } from "react";
import { useRecoilState } from "recoil";
import { isPlayingState, tempoState } from "../recoil/rhythm-state";
import MinusIcon from "./icons/MinusIcon";
import PauseIcon from "./icons/PauseIcon";
import PlayIcon from "./icons/PlayIcon";
import PlusIcon from "./icons/PlusIcon";

const RhythmControls: FC = () => {
    const [isPlaying, setPlaying] = useRecoilState(isPlayingState);
    const [tempo, setTempo] = useRecoilState(tempoState);

    function handleClickPlay() {
        setPlaying((value) => !value);
    }

    function changeTempo(amount: number) {
        setTempo((value) => value + amount);
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
                <button onClick={() => changeTempo(-1)} className="flex justify-center">
                    <MinusIcon className="stroke-gray-400 w-5 h-5" />
                </button>
                <p className="text-lg">
                    {tempo} <span className="text-gray-400 text-sm">BPM</span>
                </p>
                <button onClick={() => changeTempo(1)} className="flex justify-center">
                    <PlusIcon className="stroke-gray-400 w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default RhythmControls;
