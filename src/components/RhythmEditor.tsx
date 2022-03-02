import { FC, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useStartRhythm, useStopRhythm } from "../hooks/rhythm-hooks";
import { isPlayingState, trackIdsState } from "../recoil/rhythm-state";
import AddTrackButton from "./AddTrackButton";
import RhythmControls from "./RhythmControls";
import TrackCircle from "./TrackCircle";
import TrackControls from "./TrackControls";

const RhythmEditor: FC = () => {
    const [isPlaying] = useRecoilState(isPlayingState);
    const trackIds = useRecoilValue(trackIdsState);
    const startRhythm = useStartRhythm();
    const stopRhythm = useStopRhythm();

    useEffect(() => {
        window.addEventListener("keypress", handleSpacebar);

        return () => {
            window.removeEventListener("keypress", handleSpacebar);
        };
    }, [isPlaying]);

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
            <RhythmControls />
            <div className="w-full flex justify-center relative my-4 pt-[100%]">
                {trackIds.map((id, i) => (
                    <TrackCircle key={id} id={id} index={i} />
                ))}
            </div>
            {trackIds.map((id) => (
                <TrackControls key={id} id={id} />
            ))}
            <div className="flex justify-center">
                <AddTrackButton />
            </div>
        </>
    );
};

export default RhythmEditor;
