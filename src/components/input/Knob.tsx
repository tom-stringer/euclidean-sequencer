import classNames from "classnames";
import React, { FC, useEffect, useRef, useState } from "react";
import { clamp, mapRange } from "../../utils/math-utils";

interface KnobProps {
    min: number;
    max: number;
    step?: number;
    value: number;
    onChange: (value: number) => void;
    colour?: string;
}

interface Touch {
    identifier: number;
    clientX: number;
    clientY: number;
}

const Knob: FC<KnobProps> = ({ min, max, step = 1, value, onChange, colour }) => {
    const knob = useRef<HTMLDivElement>(null);
    const [_, setTouch] = useState<Touch | null>(null);
    const [knobValue, setKnobValue] = useState(value);

    useEffect(() => {
        knob.current?.addEventListener("touchstart", handleTouchStart, { passive: false });

        return () => {
            knob.current?.removeEventListener("touchstart", handleTouchStart);
        };
    }, [min, max]);

    useEffect(() => onChange(knobValue), [knobValue]);

    function calculateChange(movementX: number, movementY: number) {
        return ((movementX - movementY) / 200) * (max - min);
    }

    function handleMovement(movementX: number, movementY: number) {
        setKnobValue((previous) => clamp(previous + calculateChange(movementX, movementY), min, max));
    }

    function handleMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.preventDefault();
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mousemove", handleMouseMove);
    }

    function handleMouseMove(event: MouseEvent) {
        handleMovement(event.movementX, event.movementY);
    }

    function handleMouseUp() {
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("mousemove", handleMouseMove);
    }

    function handleTouchStart(event: TouchEvent) {
        event.preventDefault();

        const touch = event.targetTouches[0];
        setTouch({
            identifier: touch.identifier,
            clientX: touch.clientX,
            clientY: touch.clientY,
        });

        document.addEventListener("touchend", handleTouchEnd);
        document.addEventListener("touchcancel", handleTouchEnd);
        document.addEventListener("touchmove", handleTouchMove, { passive: false });
    }

    function handleTouchMove(event: TouchEvent) {
        event.preventDefault();

        // Call setter to access most recent state, as state doesn't update during event listener.
        setTouch((lastTouch) => {
            if (lastTouch === null) {
                return null;
            }

            for (let i = 0; i < event.changedTouches.length; i++) {
                if (event.changedTouches[i].identifier === lastTouch.identifier) {
                    const touch = event.changedTouches[i];
                    const movementX = touch.clientX - lastTouch.clientX;
                    const movementY = touch.clientY - lastTouch.clientY;

                    handleMovement(movementX, movementY);

                    return {
                        identifier: touch.identifier,
                        clientX: touch.clientX,
                        clientY: touch.clientY,
                    };
                }
            }

            return null;
        });
    }

    function handleTouchEnd() {
        setTouch(null);
        document.removeEventListener("touchend", handleTouchEnd);
        document.removeEventListener("touchcancel", handleTouchEnd);
        document.removeEventListener("touchmove", handleTouchMove);
    }

    const rotation = mapRange(value, min, max, -170, 170);
    const style = {
        transform: `rotate(${rotation}deg)`,
    };

    const pointerClass = classNames("h-5 w-1", { ["bg-" + colour]: colour, "bg-white": !colour });

    return (
        <div
            ref={knob}
            onMouseDown={(event) => handleMouseDown(event)}
            className="w-10 h-10 xs:w-12 xs:h-12 rounded-full bg-surface-2 flex justify-center cursor-grab"
            style={style}>
            <div className={pointerClass}></div>
        </div>
    );
};

export default Knob;
