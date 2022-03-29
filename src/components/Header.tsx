import { FC } from "react";
import ShareRhythmButton from "./ShareRhythmButton";

const Header: FC = () => {
    return (
        <header className="h-6 flex justify-between items-center">
            <h1 className="text-lg -mt-3">
                Sequinse<span className="text-orange-medium text-2xl">.</span>
                <span className="text-purple-medium text-2xl">.</span>
                <span className="text-green-medium text-2xl">.</span>
            </h1>
            <div className="-mt-2">
                <ShareRhythmButton />
            </div>
        </header>
    );
};

export default Header;
