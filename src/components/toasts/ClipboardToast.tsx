import { FC } from "react";
import Toast from "./Toast";

const ClipboardToast: FC = () => {
    return (
        <Toast>
            <h1 className="text-lg">Copied to clipboard</h1>
        </Toast>
    );
};

export default ClipboardToast;
