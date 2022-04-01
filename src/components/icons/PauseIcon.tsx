import { FC } from "react";

interface Props {
    className: string;
}

const PauseIcon: FC<Props> = ({ className }) => {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="4" width="4" height="16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="14" y="4" width="4" height="16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default PauseIcon;
