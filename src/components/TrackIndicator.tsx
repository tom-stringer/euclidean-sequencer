import classNames from "classnames";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import useCurrentStep from "../hooks/use-current-step";
import { isPlayingState, trackState } from "../recoil/rhythm-state";

interface Props {
    id: string;
}

const TrackIndicator: FC<Props> = ({ id }) => {
    const track = useRecoilValue(trackState(id));
    const isPlaying = useRecoilValue(isPlayingState);
    const currentStep = useCurrentStep(id);
    const isActive = track.necklace[currentStep] === 1;

    const indicatorClass = classNames("rounded-full w-3 h-3 transition-colors", {
        "bg-surface-2": !isPlaying || !isActive,
        [`bg-${track.colour}-medium`]: isActive && isPlaying,
    });
    return (
        <div className="flex items-center">
            <div className={indicatorClass} />
            <h1 className="ml-4 text-lg">{track.instrument.name}</h1>
        </div>
    );
};

export default TrackIndicator;
