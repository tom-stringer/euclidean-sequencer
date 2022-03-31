import { FC, useEffect } from "react";
import { useResizeDetector } from "react-resize-detector";
import { useRecoilValue } from "recoil";
import { Sampler, Sequence } from "tone";
import { trackState } from "../recoil/rhythm-state";
import { instruments } from "../utils/instruments";
import Step from "./Step";

interface TrackCircleProps {
    id: string;
    index: number;
    sampler: Sampler | null;
}

const TrackCircle: FC<TrackCircleProps> = ({ id, index, sampler }) => {
    const track = useRecoilValue(trackState(id));
    const { width, ref: circle } = useResizeDetector({ handleHeight: false });
    const radius = (width || 0) / 2;

    useEffect(() => {
        const seq = new Sequence(
            (time, note) => {
                if (note) {
                    sampler?.triggerAttack(instruments[track.instrument].note, time);
                }
            },
            track.necklace,
            "16n"
        ).start(0);

        return () => {
            seq.dispose();
        };
    }, [track.necklace]);

    const circleStyle = {
        width: `${90 - index * 15}%`,
        height: `${90 - index * 15}%`,
        margin: -radius + "px",
    };

    const circleClass =
        radius !== 0
            ? `rounded-full bg-transparent absolute border-2 border-${track.colour}-dark top-1/2 left-1/2`
            : "";

    return (
        <div className={circleClass} style={circleStyle} ref={circle}>
            {radius !== 0 && track.necklace.map((_, i) => <Step id={id} key={i} radius={radius} index={i} />)}
        </div>
    );
};

export default TrackCircle;
