import { FC, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Loop } from "tone";
import useRhythmControls from "../../hooks/use-rhythm-controls";
import { isPlayingState, metronomeState, trackIdsState } from "../../recoil/rhythm-state";
import AddTrackButton from "../AddTrackButton";
import RhythmControls from "../RhythmControls";
import TrackCircle from "../TrackCircle";
import TrackControls from "../TrackControls";

const EditRhythmPage: FC = () => {
    const isPlaying = useRecoilValue(isPlayingState);
    const trackIds = useRecoilValue(trackIdsState);
    const setMetronome = useSetRecoilState(metronomeState);
    const { startRhythm, stopRhythm } = useRhythmControls();
    const hasTracks = trackIds.length > 0;

    useEffect(() => {
        window.addEventListener("keypress", handlePlayPauseHotkey);

        return () => {
            window.removeEventListener("keypress", handlePlayPauseHotkey);
        };
    }, [isPlaying]);

    useEffect(() => {
        const loop = new Loop(() => {
            setMetronome((value) => !value);
        }, "16n").start(0);

        return () => {
            loop.dispose();
        };
    }, []);

    function handlePlayPauseHotkey(event: KeyboardEvent) {
        if (event.key === "p") {
            event.preventDefault();
            if (isPlaying) {
                stopRhythm();
            } else {
                startRhythm();
            }
        }
    }

    return (
        <>
            {hasTracks ? (
                <>
                    <div className="w-full flex justify-center relative pt-[100%] -mt-4 -mb-2">
                        {trackIds.map((id, i) => (
                            <TrackCircle key={id} id={id} index={i} />
                        ))}
                    </div>
                    <RhythmControls />
                    {trackIds.map((id) => (
                        <TrackControls key={id} id={id} />
                    ))}
                    <div className="flex justify-center">
                        <AddTrackButton />
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center grow">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl">Get started.</h1>
                        <p className="text-muted">Press below to add a track to your rhythm.</p>
                        <div className="flex justify-center mt-4">
                            <AddTrackButton />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditRhythmPage;
