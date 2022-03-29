import { FC, useEffect, useMemo } from "react";
import { useResizeDetector } from "react-resize-detector";
import { useRecoilValue } from "recoil";
import { Player, Sequence } from "tone";
import { trackState } from "../recoil/rhythm-state";
import { instruments } from "../utils/instruments";
import Step from "./Step";

interface TrackCircleProps {
    id: string;
    index: number;
}

const TrackCircle: FC<TrackCircleProps> = ({ id, index }) => {
    const track = useRecoilValue(trackState(id));
    const { width, ref: circle } = useResizeDetector({ handleHeight: false });
    const radius = (width || 0) / 2;
    const player = useMemo(() => new Player(instruments[track.instrument].src).toDestination(), [track.instrument]);

    useEffect(() => {
        const seq = new Sequence(
            (time, note) => {
                if (note) {
                    player.start(time);
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
