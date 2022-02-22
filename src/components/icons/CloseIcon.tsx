import { FC } from "react";

interface Props {
    className: string;
}

const CloseIcon: FC<Props> = ({ className }) => {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 5L19 19M5 19L19 5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
};

export default CloseIcon;