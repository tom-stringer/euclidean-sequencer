import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import useDebugControl from "../hooks/use-debug-control";
import { isDebuggingState } from "../recoil/debug-state";
import Header from "./Header";
import AddTrackPage from "./pages/AddTrackPage";
import EditRhythmPage from "./pages/EditRhythmPage";
import NotFoundPage from "./pages/NotFoundPage";
import SharedRhythmPage from "./pages/SharedRhythmPage";
import ToastContainer from "./toasts/ToastContainer";
import RecoilDebugger from "./utils/RecoilDebugger";

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
                    <Route path="/share/:data" element={<SharedRhythmPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
            <ToastContainer />
            {isDebugging && <RecoilDebugger />}
        </>
    );
};

export default App;
