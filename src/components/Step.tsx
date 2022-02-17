import classNames from "classnames";
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
    const diameter = active ? 20 : 10;

    /*
        Rotate step to face its position, based on its index. Then move it forward, and rotate back.
        https://stackoverflow.com/questions/12813573/position-icons-into-circle
    */
    const style = {
        transform: active
            ? `rotate(${rotateAngle}deg) translate(0, -${radius}px) rotate(-${rotateAngle}deg)`
            : `rotate(${rotateAngle}deg) translate(0, -${radius}px)`,
        margin: `-${diameter / 2}px`,
        width: `${diameter}px`,
        height: `${diameter}px`,
    };

    const className = classNames("rounded-full absolute top top-1/2 left-1/2", {
        "bg-orange-light": active,
        "bg-orange-dark": !active,
    });

    return <div key={index} className={className} style={style} />;
};

export default Step;
