import classNames from "classnames";
import { motion } from "framer-motion";
import { FC, useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { Transport } from "tone";
import { isPlayingState, trackState } from "../recoil/rhythm-state";
import { getCurrentStep } from "../utils/rhythm-utils";

interface StepProps {
    id: string;
    radius: number;
    index: number;
}

const Step: FC<StepProps> = ({ id, radius, index }) => {
    const track = useRecoilValue(trackState(id));
    const offsetAngle = 360 / track.steps;
    const rotateAngle = offsetAngle * index;
    const active = useMemo(() => track.necklace[index], [track.necklace]);
    const isPlaying = useRecoilValue(isPlayingState);
    const diameter = active ? 20 : 10;
    const diameterLarger = diameter + diameter * 0.15;
    const isCurrent = getCurrentStep(track.steps) % track.steps === index;

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

    const animate = isPlaying && isCurrent ? "current" : "normal";

    const colours = {
        light: `bg-${track.colour}-light`,
        medium: `bg-${track.colour}-medium`,
        dark: `bg-${track.colour}-dark`,
    };

    const className = classNames("rounded-full absolute top top-1/2 left-1/2 transition-colors", {
        [colours.medium]: active && !(isPlaying && isCurrent),
        [colours.dark]: !active,
        [colours.light]: isPlaying && isCurrent,
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
