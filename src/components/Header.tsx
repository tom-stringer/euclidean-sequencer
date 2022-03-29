import { FC } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import useIsEditing from "../hooks/use-is-editing";
import { trackIdsState } from "../recoil/rhythm-state";
import ShareRhythmButton from "./ShareRhythmButton";

const Header: FC = () => {
    const isEditing = useIsEditing();
    const trackIds = useRecoilValue(trackIdsState);
    const hasTracks = trackIds.length > 0;

    return (
        <header className="h-6 flex justify-between items-center">
            <Link to="/" className="text-lg -mt-3">
                Sequinse<span className="text-orange-medium text-2xl">.</span>
                <span className="text-purple-medium text-2xl">.</span>
                <span className="text-green-medium text-2xl">.</span>
            </Link>

            {isEditing && hasTracks && (
                <div className="-mt-2">
                    <ShareRhythmButton />
                </div>
            )}
        </header>
    );
};

export default Header;
