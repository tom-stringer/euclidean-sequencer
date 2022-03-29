import { FC } from "react";
import Toast from "./Toast";

const ClipboardToast: FC = () => {
    return (
        <Toast>
            <h1 className="text-lg">Link copied to clipboard</h1>
        </Toast>
    );
};

export default ClipboardToast;
