import { Colours } from "../utils/colours";
import { Instrument } from "./rhythm-types";

export default interface Track {
    id: string;
    necklace: number[];
    instrument: Instrument;
    steps: number;
    pulses: number;
    rotation: number;
    volume: number;
    colour: Colours;
}
