import React, { FC, useEffect, useRef, useState } from "react";
import { mapRange } from "../../utils/math-utils";

interface KnobProps {
    min: number;
    max: number;
    step?: number;
    value: number;
    onChange: (changeAmount: number) => void;
}

interface Touch {
    identifier: number;
    clientX: number;
    clientY: number;
}

const Knob: FC<KnobProps> = ({ min, max, step = 1, value, onChange }) => {
    const knob = useRef<HTMLDivElement>(null);
    const [touch, setTouch] = useState<Touch | null>(null);

    useEffect(() => {
        knob.current?.addEventListener("touchstart", handleTouchStart, { passive: false });

        return () => {
            knob.current?.removeEventListener("touchstart", handleTouchStart);
        };
    }, []);

    function handleMouseDown() {
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mousemove", handleMouseMove);
    }

    function handleMouseMove(event: MouseEvent) {
        onChange(event.movementX - event.movementY);
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

                    onChange(movementX - movementY);

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

    return (
        <div
            ref={knob}
            onMouseDown={() => handleMouseDown()}
            className="w-8 h-8 rounded-full bg-gray-700 flex justify-center cursor-grab"
            style={style}>
            <div className="h-4 w-1 bg-white"></div>
        </div>
    );
};

export default Knob;
