import { FC, useRef } from "react";
import { KnobInput } from "precision-inputs/dist/precision-inputs";

const Knob: FC = () => {
    const knobRef = useRef<HTMLDivElement>(null);
    const knobVisualRef = useRef<HTMLDivElement>(null);
    const knob = new KnobInput(knobRef.current);

    // function rotateKnob(norm: number, value: number) {
    //     if (knobRef.current && knobVisualRef.current) {
    //         knobVisualRef.current.style[knobRef.current.transformProperty] = `rotate(${-180 + 360 * norm}deg)`;
    //     }
    // }

    return (
        <div ref={knobRef}>
            <div ref={knobVisualRef}></div>
        </div>
    );
};

export default Knob;
