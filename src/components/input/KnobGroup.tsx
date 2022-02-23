import classNames from "classnames";
import { FC } from "react";
import MinusIcon from "../icons/MinusIcon";
import PlusIcon from "../icons/PlusIcon";
import Knob from "./Knob";

interface KnobGroupProps {
    min: number;
    max: number;
    step?: number;
    value: number;
    onChange: (value: number) => void;
    onIncrement: (change: number) => void;
    title?: string;
    showValue?: boolean;
    colour?: string;
    className?: string;
}

const KnobGroup: FC<KnobGroupProps> = ({
    min,
    max,
    step = 1,
    value,
    title,
    showValue,
    onChange,
    onIncrement,
    colour,
    className,
}) => {
    function handleIncrement(change: number) {
        const computed = value + change;

        if (computed > max) {
            onChange(max);
        } else if (computed < min) {
            onChange(min);
        } else {
            onIncrement(change);
        }
    }

    return (
        <div className={classNames("flex flex-col items-center", className)}>
            {/* Title. */}
            {title && <h1 className="text-muted text-sm mb-2">{title}</h1>}

            {/* Buttons and knob. */}
            <div className="flex justify-between items-center mb-2">
                <button onClick={() => handleIncrement(-step)} className="group flex justify-center mx-1">
                    <MinusIcon className="stroke-muted group-hover:stroke-muted-light w-6 h-6" />
                </button>
                <Knob min={min} max={max} value={value} onChange={onChange} colour={colour} />
                <button onClick={() => handleIncrement(step)} className="group flex justify-center mx-1">
                    <PlusIcon className="stroke-muted group-hover:stroke-muted-light w-6 h-6" />
                </button>
            </div>

            {/* Value. */}
            {showValue && <h1 className="text-muted text-lg">{value}</h1>}
        </div>
    );
};

export default KnobGroup;
