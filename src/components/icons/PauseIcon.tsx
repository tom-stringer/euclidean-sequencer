import { FC } from "react";

interface Props {
    className: string;
}

const PauseIcon: FC<Props> = ({ className }) => {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="4" width="4" height="16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <rect x="14" y="4" width="4" height="16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
};

export default PauseIcon;