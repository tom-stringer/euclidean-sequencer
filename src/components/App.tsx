import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import useDebugControl from "../hooks/use-debug-control";
import useSampler from "../hooks/use-sampler";
import { isDebuggingState } from "../recoil/debug-state";
import Header from "./Header";
import AddTrackPage from "./pages/AddTrackPage";
import EditRhythmPage from "./pages/EditRhythmPage";
import NotFoundPage from "./pages/NotFoundPage";
import SharedRhythmPage from "./pages/SharedRhythmPage";
import ToastContainer from "./toasts/ToastContainer";
import RecoilDebugger from "./utils/RecoilDebugger";

const App: FC = () => {
    const [isLoaded, sampler] = useSampler();
    const isDebugging = useRecoilValue(isDebuggingState);
    useDebugControl();

    return (
        <>
            <main className="text-white bg-background p-4 min-h-full flex flex-col gap-y-4">
                <Header />
                {isLoaded ? (
                    <Routes>
                        <Route path="/" element={<EditRhythmPage sampler={sampler} />} />
                        <Route path="/add" element={<AddTrackPage />} />
                        <Route path="/share/:data" element={<SharedRhythmPage sampler={sampler} />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                ) : (
                    <div className="flex justify-center items-center grow">
                        <h1 className="text-2xl text-muted">Loading</h1>
                    </div>
                )}
            </main>
            <ToastContainer />
            {isDebugging && <RecoilDebugger />}
        </>
    );
};

export default App;
