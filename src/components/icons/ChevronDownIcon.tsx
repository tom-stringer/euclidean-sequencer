import { FC } from "react";

interface Props {
    className: string;
}

const ChevronDownIcon: FC<Props> = ({ className }) => {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 8L12 16L20 8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
};

export default ChevronDownIcon;
