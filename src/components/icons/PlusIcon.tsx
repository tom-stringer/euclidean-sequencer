import { FC } from "react";

interface Props {
    className: string;
}

const PlusIcon: FC<Props> = ({ className }) => {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4V20M4 12H20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default PlusIcon;
