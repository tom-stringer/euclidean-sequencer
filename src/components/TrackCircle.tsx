import { FC, useRef } from "react";
import { useRecoilValue } from "recoil";
import { trackState } from "../recoil/rhythm-state";
import Step from "./Step";

interface TrackCircleProps {
    id: string;
    index: number;
}

const TrackCircle: FC<TrackCircleProps> = ({ id, index }) => {
    const track = useRecoilValue(trackState(id));
    const circle = useRef<HTMLDivElement>(null);
    const radius = (circle.current?.offsetWidth || 0) / 2;

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
            {radius !== 0 && track.necklace.map((_, i) => <Step id={id} radius={radius} index={i} />)}
        </div>
    );
};

export default TrackCircle;
