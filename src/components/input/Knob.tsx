import { FC, useRef, useState } from "react";
import { mapRange } from "../../utils/math-utils";

interface KnobProps {
    min: number;
    max: number;
    step?: number;
    value: number;
    onChange: (value: number) => void;
}

const Knob: FC<KnobProps> = ({ min, max, step = 1, value, onChange }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [b, setValue] = useState(60);

    function handleMouseDown() {
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mousemove", handleMouseMove);
    }

    function handleMouseUp() {
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("mousemove", handleMouseMove);
    }

    function handleMouseMove(event: MouseEvent) {
        const newValue = value + event.movementX;
        onChange(newValue);
        setValue(newValue);
    }

    const rotation = mapRange(value, min, max, -170, 170);
    const style = {
        transform: `rotate(${rotation}deg)`,
    };

    return (
        <div
            ref={ref}
            onMouseDown={() => handleMouseDown()}
            className="w-8 h-8 rounded-full bg-white flex justify-center"
            style={style}>
            <div className="h-4 w-1 bg-black"></div>
        </div>
    );
};

export default Knob;
