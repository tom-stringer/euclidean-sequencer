import { FC, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Loop } from "tone";
import useRhythmControls from "../../hooks/use-rhythm-controls";
import { isPlayingState, metronomeState, trackIdsState } from "../../recoil/rhythm-state";
import AddTrackButton from "../AddTrackButton";
import RhythmControls from "../RhythmControls";
import ShareRhythmButton from "../ShareRhythmButton";
import TrackCircle from "../TrackCircle";
import TrackControls from "../TrackControls";

const EditRhythmPage: FC = () => {
    const isPlaying = useRecoilValue(isPlayingState);
    const trackIds = useRecoilValue(trackIdsState);
    const setMetronome = useSetRecoilState(metronomeState);
    const { startRhythm, stopRhythm } = useRhythmControls();

    useEffect(() => {
        window.addEventListener("keypress", handleSpacebar);

        return () => {
            window.removeEventListener("keypress", handleSpacebar);
        };
    }, []);

    useEffect(() => {
        const loop = new Loop(() => {
            setMetronome((value) => !value);
        }, "16n").start(0);

        return () => {
            loop.dispose();
        };
    }, []);

    function handleSpacebar(event: KeyboardEvent) {
        if (event.key === " ") {
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
            <ShareRhythmButton />
            <RhythmControls />
            {trackIds.length > 0 ? (
                <div className="w-full flex justify-center relative my-4 pt-[100%]">
                    {trackIds.map((id, i) => (
                        <TrackCircle key={id} id={id} index={i} />
                    ))}
                </div>
            ) : (
                <div>
                    <h1>No tracks</h1>
                    <p>Press the button below to add a track to your rhythm.</p>
                </div>
            )}

            {trackIds.map((id) => (
                <TrackControls key={id} id={id} />
            ))}
            <div className="flex justify-center">
                <AddTrackButton />
            </div>
        </>
    );
};

export default EditRhythmPage;
