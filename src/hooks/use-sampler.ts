import { useEffect, useRef, useState } from "react";
import { Sampler } from "tone";
import instruments from "../utils/instruments";

/**
 * Create and return sampler. Only call once.
 * @returns sampler containing all instruments as separate notes
 */
export default function useSampler(): [boolean, Sampler | null] {
    const [isLoaded, setLoaded] = useState(false);
    const sampler = useRef<Sampler | null>(null);

    useEffect(() => {
        const sampleMap: Record<string, string> = {};

        for (const instrumentType of Object.values(instruments)) {
            for (const instrument of Object.values(instrumentType)) {
                sampleMap[instrument.note] = instrument.url;
            }
        }

        sampler.current = new Sampler(sampleMap, () => {
            setLoaded(true);
        }).toDestination();
    }, []);

    return [isLoaded, sampler.current];
}
