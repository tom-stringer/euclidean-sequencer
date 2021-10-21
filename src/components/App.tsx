import { getPattern } from "euclidean-rhythms";
import { Howl } from "howler";
import { FC, useEffect, useState } from "react";

const soundSprite = new Howl({
    src: [process.env.PUBLIC_URL + "/drums.mp3"],
    sprite: {
        cowbell: [0, 300],
        conga_hi: [400, 300],
        conga_mid: [4455, 202],
        conga_low: [4863, 343],
        cymbal: [807, 3640],
        hihat_open: [5268, 706],
        hihat_closed: [7496, 90],
        maracas: [6684, 53],
        tom_hi: [6277, 206],
        tom_mid: [7092, 263],
        tom_low: [7903, 370],
        clave: [8307, 44],
        clap: [8712, 208],
        snare: [9116, 137],
        rim: [9521, 36],
        kick: [9929, 390],
    },
});

const App: FC = () => {
    const [pulsesInput, setPulsesInput] = useState("3");
    const [stepsInput, setStepsInput] = useState("8");
    const [isPlaying, setPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const pulses = isNaN(Number(pulsesInput)) ? 0 : Number(pulsesInput);
    const steps = isNaN(Number(stepsInput)) ? 0 : Number(stepsInput);

    const rhythm = getPattern(pulses, steps);

    useEffect(() => {
        if (isPlaying) {
            console.log(`Step ${currentStep}: ${rhythm[currentStep]}`);
            if (rhythm[currentStep]) {
                soundSprite.play("kick");
            }
            setTimeout(() => {
                setCurrentStep((currentStep + 1) % steps);
            }, 1000);
        } else {
            setCurrentStep(0);
        }
    }, [isPlaying, currentStep]);

    useEffect(() => {
        setPlaying(false);
        setCurrentStep(0);
    }, [steps]);

    return (
        <div>
            <label htmlFor="pulses">Pulses:</label>
            <input
                type="text"
                id="pulses"
                value={pulsesInput}
                onChange={(event) => setPulsesInput(event.target.value)}
            />

            <label htmlFor="steps">Steps:</label>
            <input type="text" id="steps" value={stepsInput} onChange={(event) => setStepsInput(event.target.value)} />

            <button onClick={() => setPlaying(!isPlaying)}>{isPlaying ? "Stop" : "Play"}</button>

            <p>{rhythm.map((step, i) => (i === currentStep ? <span style={{ color: "red" }}>{step}</span> : step))}</p>
        </div>
    );
};

export default App;
