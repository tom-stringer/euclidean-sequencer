import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { isDebuggingState } from "../recoil/debug-state";

export default function useDebugControl() {
    const setDebugging = useSetRecoilState(isDebuggingState);

    function toggleDebug(event: KeyboardEvent) {
        if (event.key === "D" && event.shiftKey) {
            event.preventDefault();
            setDebugging((value) => !value);
        }
    }

    useEffect(() => {
        window.addEventListener("keypress", toggleDebug);

        return () => {
            window.removeEventListener("keypress", toggleDebug);
        };
    });
}
