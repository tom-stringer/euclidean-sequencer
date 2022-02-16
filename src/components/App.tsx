import { FC, useState } from "react";
import RhythmEditor from "./RhythmEditor";
import RecoilDebugger from "./utils/RecoilDebugger";

const App: FC = () => {
    const [isDebugging, setDebugging] = useState(false);

    return (
        <div className="bg-gray-900 text-white">
            <div className="flex justify-center p-5">
                <div className="rounded-full bg-transparent w-[200px] h-[200px] relative border-2 border-orange-dark">
                    {new Array(4).fill(0).map((_, i) => {
                        const offsetAngle = 360 / 4;
                        const rotateAngle = offsetAngle * i;

                        /*
                            Rotate each item to face it's position, move it there by translation by radius,
                            then rotate back
                            https://stackoverflow.com/questions/12813573/position-icons-into-circle
                        */
                        const style = {
                            transform: `rotate(${rotateAngle}deg) translate(0, -100px) rotate(-${rotateAngle}deg)`,
                            margin: "-10px",
                        };

                        return (
                            <div
                                className="rounded-full bg-orange-light w-[20px] h-[20px] absolute top-[50%] left-[50%]"
                                style={style}></div>
                        );
                    })}
                </div>
            </div>
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
