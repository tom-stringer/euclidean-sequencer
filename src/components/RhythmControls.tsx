import { FC, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Transport } from "tone";
import env from "../env";
import useRhythmControls from "../hooks/use-rhythm-controls";
import { isPlayingState, tempoState } from "../recoil/rhythm-state";
import PauseIcon from "./icons/PauseIcon";
import PlayIcon from "./icons/PlayIcon";
import KnobGroup from "./input/KnobGroup";

const RhythmControls: FC = () => {
    const isPlaying = useRecoilValue(isPlayingState);
    const [tempo, setTempo] = useRecoilState(tempoState);
    const { startRhythm, stopRhythm } = useRhythmControls();

    useEffect(() => {
        Transport.bpm.value = tempo;
    }, [tempo]);

    function handleClickPlay() {
        if (isPlaying) {
            stopRhythm();
        } else {
            startRhythm();
        }
    }

    function handleTempoChange(value: number) {
        setTempo(Math.floor(value));
    }

    function handleTempoIncrement(change: number) {
        setTempo((value) => value + change);
    }

    return (
        <div className="flex justify-center">
            <div className="flex justify-evenly items-center bg-surface-1 rounded-lg gap-x-4 py-3 px-4">
                <button onClick={() => handleClickPlay()} className="group flex justify-center mx-2">
                    {!isPlaying ? (
                        <PlayIcon className="fill-muted group-hover:fill-muted-light w-5 h-5" />
                    ) : (
                        <PauseIcon className="fill-muted group-hover:fill-muted-light w-5 h-5" />
                    )}
                </button>

                <KnobGroup
                    value={tempo}
                    min={env.TEMPO_MIN}
                    max={env.TEMPO_MAX}
                    onChange={(value) => handleTempoChange(value)}
                    onIncrement={(change) => handleTempoIncrement(change)}
                />

                <p className="text-lg text-center min-w-[4rem]">
                    {tempo} <span className="text-muted text-sm">BPM</span>
                </p>
            </div>
        </div>
    );
};

export default RhythmControls;
