import classNames from "classnames";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { currentStepState, isPlayingState } from "../recoil/rhythm-state";
import { Track } from "../types/rhythm-types";
import { motion } from "framer-motion";

interface StepProps {
    track: Track;
    radius: number;
    index: number;
}

const Step: FC<StepProps> = ({ track, radius, index }) => {
    const currentStep = useRecoilValue(currentStepState);
    const isPlaying = useRecoilValue(isPlayingState);
    const active = track.necklace[index];
    const current = currentStep % track.steps === index;
    const offsetAngle = 360 / track.steps;
    const rotateAngle = offsetAngle * index;
    const diameter = active ? 20 : 10;
    const diameterLarger = diameter + diameter * 0.15;

    /*
        Rotate step to face its position, based on its index. Then move it forward, and rotate back.
        https://stackoverflow.com/questions/12813573/position-icons-into-circle
    */
    const style = {
        transform: active
            ? `rotate(${rotateAngle}deg) translate(0, -${radius}px) rotate(-${rotateAngle}deg)`
            : `rotate(${rotateAngle}deg) translate(0, -${radius}px)`,
        margin: `-${diameter / 2}px`,
    };

    const variants = {
        hidden: {
            width: 0,
            height: 0,
        },
        normal: {
            width: `${diameter}px`,
            height: `${diameter}px`,
        },
        current: {
            width: `${diameterLarger}px`,
            height: `${diameterLarger}px`,
        },
    };

    const animate = isPlaying && current ? "current" : "normal";

    const className = classNames("rounded-full absolute top top-1/2 left-1/2 transition-colors", {
        "bg-orange-light": active && !(isPlaying && current),
        "bg-orange-dark": !active,
        "bg-orange-white": isPlaying && current,
    });

    return (
        <motion.div
            variants={variants}
            animate={animate}
            initial={"hidden"}
            key={index}
            className={className}
            style={style}
        />
    );
};

export default Step;
