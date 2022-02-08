import { FC, useState } from "react";
import RhythmEditor from "./RhythmEditor";
import RecoilDebugger from "./utils/RecoilDebugger";

const App: FC = () => {
    const [isDebugging, setDebugging] = useState(false);

    return (
        <div className="bg-gray-900 text-white">
            <RhythmEditor />
            <label htmlFor="isDebugging" className="">
                Debug Mode:
            </label>
            <input
                type="checkbox"
                id="isDebugging"
                checked={isDebugging}
                onChange={(event) => setDebugging(event.target.checked)}
            />
            {isDebugging && <RecoilDebugger />}
        </div>
    );
};

export default App;
