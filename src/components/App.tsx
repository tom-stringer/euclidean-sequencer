import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isDebuggingState } from "../recoil/debug-state";
import AddTrackPage from "./AddTrackPage";
import RhythmEditor from "./RhythmEditor";
import RecoilDebugger from "./utils/RecoilDebugger";

const App: FC = () => {
    const [isDebugging, setDebugging] = useRecoilState(isDebuggingState);

    return (
        <main className="text-white bg-gray-900 p-4 h-full overflow-y-auto">
            <Routes>
                <Route path="/" element={<RhythmEditor />} />
                <Route path="/add" element={<AddTrackPage />} />
            </Routes>

            <label htmlFor="isDebugging">Debug Mode:</label>
            <input
                type="checkbox"
                id="isDebugging"
                checked={isDebugging}
                onChange={(event) => setDebugging(event.target.checked)}
            />
            {isDebugging && <RecoilDebugger />}
        </main>
    );
};

export default App;
