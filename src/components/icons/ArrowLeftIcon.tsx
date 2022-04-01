import { FC } from "react";

interface Props {
    className: string;
}

const ArrowLeftIcon: FC<Props> = ({ className }) => {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12H3M3 12L10 5M3 12L10 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default ArrowLeftIcon;
