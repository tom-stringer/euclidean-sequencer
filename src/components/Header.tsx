import { FC } from "react";

const Header: FC = () => {
    return (
        <header className="fixed top-0 left-0 w-full h-10 flex items-center p-4 z-10 bg-background shadow-md shadow-background">
            <h1 className="text-xl mb-2">
                Sequinse<span className="text-orange-medium text-3xl">.</span>
                <span className="text-purple-medium text-3xl">.</span>
                <span className="text-green-medium text-3xl">.</span>
            </h1>
        </header>
    );
};

export default Header;
