import { FC } from "react";
import { useNavigate } from "react-router-dom";
import useCanAddTrack from "../hooks/use-can-add-track";
import useRhythmControls from "../hooks/use-rhythm-controls";
import PlusIcon from "./icons/PlusIcon";

const AddTrackButton: FC = () => {
    const navigate = useNavigate();
    const { stopRhythm } = useRhythmControls();
    const canAddTrack = useCanAddTrack();

    function handleClickAdd() {
        stopRhythm();
        navigate("/add");
    }

    return (
        <button
            onClick={handleClickAdd}
            disabled={!canAddTrack}
            className="group bg-surface-1 hover:bg-surface-2 disabled:hover:bg-surface-1 rounded-full p-2 flex justify-center items-center">
            <PlusIcon className="w-10 h-10 stroke-muted group-hover:stroke-muted-light group-disabled:stroke-muted-dark" />
            <h1 className="text-muted group-hover:text-muted-light group-disabled:text-muted-dark text-sm mx-1">
                {canAddTrack ? "Add track" : "Tracks full"}
            </h1>
        </button>
    );
};

export default AddTrackButton;
