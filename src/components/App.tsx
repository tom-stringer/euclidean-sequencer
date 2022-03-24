import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import useDebugControl from "../hooks/use-debug-control";
import { isDebuggingState } from "../recoil/debug-state";
import AddTrackPage from "./AddTrackPage";
import RhythmEditor from "./RhythmEditor";
import ToastContainer from "./ToastContainer";
import RecoilDebugger from "./utils/RecoilDebugger";

const App: FC = () => {
    const isDebugging = useRecoilValue(isDebuggingState);
    useDebugControl();

    return (
        <>
            <main className="text-white bg-gray-900 p-4 h-full overflow-y-auto">
                <Routes>
                    <Route path="/" element={<RhythmEditor />} />
                    <Route path="/add" element={<AddTrackPage />} />
                </Routes>
                {isDebugging && <RecoilDebugger />}
            </main>
            <ToastContainer />
        </>
    );
};

export default App;
