import { FC } from "react";
import { useSetRecoilState } from "recoil";
import { v4 } from "uuid";
import { createTrack } from "../factories/track-factory";
import { tracksState } from "../recoil/rhythm-state";
import { Instruments } from "../types/rhythm-types";
import PlusIcon from "./icons/PlusIcon";

const AddTrackButton: FC = () => {
    const setTracks = useSetRecoilState(tracksState);

    function addTrack() {
        const id = v4();
        setTracks((value) => ({
            ...value,
            [id]: createTrack(id, Instruments.KICK, 8, 3),
        }));
    }

    return (
        <button onClick={addTrack} className="bg-surface-1 rounded-full w-10 h-10 p-1">
            <PlusIcon className="w-full h-full stroke-muted" />
        </button>
    );
};

export default AddTrackButton;
