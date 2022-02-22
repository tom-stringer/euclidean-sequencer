import { Howl } from "howler";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { v4 } from "uuid";
import { createTrack } from "../factories/track-factory";
import { tracksState } from "../recoil/rhythm-state";
import { Instrument } from "../types/rhythm-types";
import { instruments } from "../utils/rhythm-utils";
import PlusIcon from "./icons/PlusIcon";

const AddTrackPage: FC = () => {
    const navigate = useNavigate();
    const setTracks = useSetRecoilState(tracksState);

    function playInstrument(instrument: Instrument) {
        const howl = new Howl({ src: instrument.src });
        howl.play();
    }

    function addTrack(instrument: Instrument) {
        const id = v4();
        setTracks((value) => ({
            ...value,
            [id]: createTrack(id, instrument.key, 8, 4),
        }));

        navigate("/");
    }

    return (
        <div className="flex flex-col gap-y-4">
            <h1 className="text-2xl">Add Track</h1>

            {Object.values(instruments).map((instrument) => (
                <button
                    className="flex justify-between items-center rounded-lg bg-surface-1 hover:bg-surface-2 p-4"
                    onClick={() => playInstrument(instrument)}>
                    <h1 className="text-lg">{instrument.name}</h1>

                    <button
                        className="group rounded-lg bg-surface-3 hover:bg-surface-4 w-10 h-10 p-1"
                        onClick={() => addTrack(instrument)}>
                        <PlusIcon className="w-full h-full stroke-muted-light group-hover:stroke-white" />
                    </button>
                </button>
            ))}
        </div>
    );
};

export default AddTrackPage;
