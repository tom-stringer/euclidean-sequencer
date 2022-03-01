import { useState, useEffect } from "react";

function getWindowDimensions() {
    return {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        clientWidth: document.documentElement?.clientWidth,
        clientHeight: document.documentElement?.clientHeight,
    };
}

function isPageScrolling() {
    return document.body.scrollHeight > document.body.clientHeight;
}

/**
 * Hook returning current window dimensions.
 * From https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
 * @returns window dimensions object
 */
export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}
