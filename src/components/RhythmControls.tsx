import { ChangeEvent, FC, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { isPlayingState, tempoState } from "../recoil/rhythm-state";
import MinusIcon from "./icons/MinusIcon";
import PauseIcon from "./icons/PauseIcon";
import PlayIcon from "./icons/PlayIcon";
import PlusIcon from "./icons/PlusIcon";
import Knob from "./input/Knob";

const RhythmControls: FC = () => {
    const [isPlaying, setPlaying] = useRecoilState(isPlayingState);
    const [tempo, setTempo] = useRecoilState(tempoState);
    const knobRef = useRef<HTMLInputElement>(null);

    function handleClickPlay() {
        setPlaying((value) => !value);
    }

    function incrementTempo(amount: number) {
        setTempo((value) => value + amount);
    }

    function handleTempoChange(event: ChangeEvent<HTMLInputElement>) {
        const value = Number(event.target.value);
        console.log("here");

        if (!isNaN(value)) {
            setTempo(value);
        }
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
                <Knob min={1} max={200} value={tempo} onChange={(value) => setTempo(value)} />
                <button onClick={() => incrementTempo(-1)} className="flex justify-center">
                    <MinusIcon className="stroke-gray-400 w-5 h-5" />
                </button>
                <input
                    type="range"
                    min={1}
                    max={120}
                    step={1}
                    ref={knobRef}
                    // value={tempo}
                    onChange={(event) => handleTempoChange(event)}
                    className="input-knob"
                    data-fgcolor="#fff"
                    data-bgcolor="#374151"
                    data-diameter="40"
                />
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
