import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useStopRhythm } from "../hooks/rhythm-hooks";
import PlusIcon from "./icons/PlusIcon";

const AddTrackButton: FC = () => {
    const navigate = useNavigate();
    const stopRhythm = useStopRhythm();

    function handleClickAdd() {
        stopRhythm();
        navigate("/add");
    }

    return (
        <button onClick={handleClickAdd} className="group bg-surface-1 hover:bg-surface-2 rounded-full w-10 h-10 p-1">
            <PlusIcon className="w-full h-full stroke-muted group-hover:stroke-muted-light" />
        </button>
    );
};

export default AddTrackButton;
