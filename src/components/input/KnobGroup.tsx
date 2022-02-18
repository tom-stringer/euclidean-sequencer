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
    title?: string;
    showValue?: boolean;
}

const KnobGroup: FC<KnobGroupProps> = ({ min, max, step = 1, value, title, showValue, onChange }) => {
    return (
        <div className="flex flex-col items-center">
            {/* Title. */}
            {title && <h1 className="text-muted text-sm mb-2">{title}</h1>}

            {/* Buttons and knob. */}
            <div className="flex justify-between items-center mb-2">
                <button onClick={() => onChange(-step)} className="flex justify-center mx-1">
                    <MinusIcon className="stroke-muted w-6 h-6" />
                </button>
                <Knob min={min} max={max} value={value} onChange={onChange} />
                <button onClick={() => onChange(+step)} className="flex justify-center mx-1">
                    <PlusIcon className="stroke-muted w-6 h-6" />
                </button>
            </div>

            {/* Value. */}
            {showValue && <h1 className="text-muted text-lg">{value}</h1>}
        </div>
    );
};

export default KnobGroup;
