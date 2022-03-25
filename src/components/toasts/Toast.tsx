import { FC } from "react";

const Toast: FC = ({ children }) => {
    return (
        <div className="flex justify-center items-center px-6 py-2 bg-surface-2 rounded-lg drop-shadow-lg">
            {children}
        </div>
    );
};

export default Toast;
