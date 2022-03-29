import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import useDebugControl from "../hooks/use-debug-control";
import { isDebuggingState } from "../recoil/debug-state";
import EditRhythmPage from "./pages/EditRhythmPage";
import NotFoundPage from "./pages/NotFoundPage";
import AddTrackPage from "./pages/AddTrackPage";
import ToastContainer from "./toasts/ToastContainer";
import RecoilDebugger from "./utils/RecoilDebugger";
import Header from "./Header";

const App: FC = () => {
    const isDebugging = useRecoilValue(isDebuggingState);
    useDebugControl();

    return (
        <>
            <main className="text-white bg-background p-4 min-h-full flex flex-col gap-y-4">
                <Header />
                <Routes>
                    <Route path="/" element={<EditRhythmPage />} />
                    <Route path="/add" element={<AddTrackPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                {isDebugging && <RecoilDebugger />}
            </main>
            <ToastContainer />
        </>
    );
};

export default App;
