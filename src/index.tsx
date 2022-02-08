import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import App from "./components/App";
import "./lib/input-knobs";
import "./styles/output.css";
import "./styles/input-knob.css";

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById("root")
);
