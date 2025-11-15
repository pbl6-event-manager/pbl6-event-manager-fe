import { useLocation } from "react-router-dom"

export const useLayoutViewModel = () => {
    const location = useLocation();
    const path = location.pathname.toLocaleLowerCase();

    const scrollablePaths = [
        "/admin/categories", 
        "/admin/permissions",
        "admin/events/details"
    ];
    const isScrollable = scrollablePaths.some((p) => path === p || path.startsWith(p + "/") || path.includes(p));

    return {
        isScrollable
    }
}