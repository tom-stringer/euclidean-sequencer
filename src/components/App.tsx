import { FC } from "react";
import RhythmEditor from "./RhythmEditor";
import RecoilDebugger from "./utils/RecoilDebugger";

const App: FC = () => {
    return (
        <div>
            <RhythmEditor />
            <RecoilDebugger />
        </div>
    );
};

export default App;
