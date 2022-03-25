import { FC } from "react";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";

const NotFoundPage: FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="pointer-events-none absolute top-0 left-0 w-full h-full flex justify-center items-center">
                <div className="flex flex-col gap-y-2 p-4">
                    <h1 className="text-2xl">Oops! Page not found.</h1>
                    <p className="text-muted">Press the back button above to return to your rhythm.</p>
                </div>
            </div>
            <header className="flex items-center">
                <button className="group w-10 h-10 p-2" onClick={() => navigate("/")}>
                    <ArrowLeftIcon className="w-full h-full stroke-muted-light group-hover:stroke-white" />
                </button>

                <h1 className="text-2xl ml-2">Back</h1>
            </header>
        </>
    );
};

export default NotFoundPage;
