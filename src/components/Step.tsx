import { FC } from "react";
import { Track } from "../types/rhythm-types";

interface StepProps {
    track: Track;
    radius: number;
    index: number;
}

const Step: FC<StepProps> = ({ track, radius, index }) => {
    const active = track.necklace[index];
    const offsetAngle = 360 / track.steps;
    const rotateAngle = offsetAngle * index;
    const width = active ? 20 : 5;
    const height = active ? width : 10;

    /*
        Rotate step to face its position, based on its index. Then move it forward, and rotate back.
        https://stackoverflow.com/questions/12813573/position-icons-into-circle
    */
    const style = {
        transform: active
            ? `rotate(${rotateAngle}deg) translate(0, -${radius}px) rotate(-${rotateAngle}deg)`
            : `rotate(${rotateAngle}deg) translate(0, -${radius}px)`,
        margin: active ? `-${width / 2}px` : "",
        width: `${width}px`,
        height: `${height}px`,
    };

    let className = `absolute top-1/2 left-1/2 `;

    if (active) {
        className += "bg-orange-light rounded-full";
    } else {
        className += "stroke-orange-dark";
    }

    if (active) {
        return <div key={index} className={className} style={style} />;
    } else {
        return (
            <svg className={className} style={style} viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1={4} y1={0} x2={4} y2={16} stroke-width="4" />
            </svg>
        );
    }
};

export default Step;
