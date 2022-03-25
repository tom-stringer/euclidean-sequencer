import { Colours } from "../utils/colours";
import { Instruments } from "./rhythm-types";

export default interface Track {
    id: string;
    necklace: number[];
    instrument: Instruments;
    steps: number;
    pulses: number;
    rotation: number;
    volume: number;
    colour: Colours;
}
