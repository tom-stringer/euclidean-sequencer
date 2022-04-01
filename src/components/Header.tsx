import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import useIsEditing from "../hooks/use-is-editing";
import { trackIdsState } from "../recoil/rhythm-state";
import ShareRhythmButton from "./ShareRhythmButton";

const Header: FC = () => {
    const isEditing = useIsEditing();
    const trackIds = useRecoilValue(trackIdsState);
    const hasTracks = trackIds.length > 0;
    const navigate = useNavigate();

    return (
        <header className="h-6 flex justify-between items-center">
            <div onClick={() => navigate("/")} className="flex items-center gap-x-2 cursor-pointer">
                <img src="/images/logo.png" className="max-h-[1.125rem] max-w-[1.125rem]" />
                <h1 className="text-lg">Sequinse</h1>
            </div>

            {isEditing && hasTracks && (
                <div className="-mt-2">
                    <ShareRhythmButton />
                </div>
            )}
        </header>
    );
};

export default Header;
