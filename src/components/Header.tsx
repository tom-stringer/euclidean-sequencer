import { FC } from "react";
import { useRecoilValue } from "recoil";
import { trackIdsState } from "../recoil/rhythm-state";
import ShareRhythmButton from "./ShareRhythmButton";

const Header: FC = () => {
    const trackIds = useRecoilValue(trackIdsState);
    const hasTracks = trackIds.length > 0;

    return (
        <header className="h-6 flex justify-between items-center">
            <h1 className="text-lg -mt-3">
                Sequinse<span className="text-orange-medium text-2xl">.</span>
                <span className="text-purple-medium text-2xl">.</span>
                <span className="text-green-medium text-2xl">.</span>
            </h1>

            {hasTracks && (
                <div className="-mt-2">
                    <ShareRhythmButton />
                </div>
            )}
        </header>
    );
};

export default Header;
