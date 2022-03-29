import { FC } from "react";
import { useNavigate } from "react-router-dom";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";

const NotFoundPage: FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <header className="flex items-center">
                <button className="group w-10 h-10 p-2" onClick={() => navigate("/")}>
                    <ArrowLeftIcon className="w-full h-full stroke-muted-light group-hover:stroke-white" />
                </button>

                <h1 className="text-2xl ml-2">Back</h1>
            </header>
            <div className="flex justify-center items-center grow">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl">Oops! Page not found.</h1>
                    <p className="text-muted">Press the back button above to return to your rhythm.</p>{" "}
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;
