import { useLocation } from "react-router-dom";

export default function useIsEditing() {
    const location = useLocation();

    return location.pathname === "/";
}
