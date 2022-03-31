import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Loop, Sampler, Transport } from "tone";
import useLoadRhythm from "../../hooks/use-load-rhythm";
import useResetRhythm from "../../hooks/use-reset-rhythm";
import useRhythmControls from "../../hooks/use-rhythm-controls";
import { isPlayingState, metronomeState, tempoState, trackIdsState } from "../../recoil/rhythm-state";
import RhythmDTO from "../../types/dto/rhythm-dto";
import PauseIcon from "../icons/PauseIcon";
import PlayIcon from "../icons/PlayIcon";
import TrackCircle from "../TrackCircle";

interface Props {
    sampler: Sampler | null;
}

const SharedRhythmPage: FC<Props> = ({ sampler }) => {
    const setMetronome = useSetRecoilState(metronomeState);
    const trackIds = useRecoilValue(trackIdsState);
    const isPlaying = useRecoilValue(isPlayingState);
    const { startRhythm, stopRhythm } = useRhythmControls();
    const { data } = useParams();
    const tempo = useRecoilValue(tempoState);
    const resetRhythm = useResetRhythm();
    const loadRhythm = useLoadRhythm();

    useEffect(() => {
        Transport.bpm.value = tempo;
    }, [tempo]);

    useEffect(() => {
        const loop = new Loop(() => {
            setMetronome((value) => !value);
        }, "16n").start(0);

        return () => {
            loop.dispose();
        };
    }, []);

    useEffect(() => {
        async function resetAndLoad(data: RhythmDTO) {
            await resetRhythm();
            await loadRhythm(data);
        }

        if (data) {
            const rhythmDTO = JSON.parse(atob(data)) as RhythmDTO;
            resetAndLoad(rhythmDTO);
        }
    }, [data]);

    useEffect(() => {
        return () => {
            stopRhythm();
            resetRhythm();
        };
    }, []);

    function handleClickPlay() {
        if (isPlaying) {
            stopRhythm();
        } else {
            startRhythm();
        }
    }

    return (
        <>
            <div className="my-auto flex flex-col gap-y-4 xs:mx-auto xs:w-4/5 sm:w-3/5 md:w-2/5">
                <div className="w-full flex justify-center relative pt-[100%] -mt-4 -mb-2">
                    {trackIds.map((id, i) => (
                        <TrackCircle key={id} id={id} index={i} sampler={sampler} />
                    ))}
                </div>
                <div className="flex justify-center items-center grow">
                    <button
                        onClick={handleClickPlay}
                        className="group bg-surface-1 hover:bg-surface-2 disabled:hover:bg-surface-1 rounded-full p-4 flex justify-center items-center">
                        {!isPlaying ? (
                            <PlayIcon className="fill-muted group-hover:fill-muted-light w-8 h-8" />
                        ) : (
                            <PauseIcon className="fill-muted group-hover:fill-muted-light w-8 h-8" />
                        )}
                    </button>
                </div>
            </div>
        </>
    );
};

export default SharedRhythmPage;
