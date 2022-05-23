import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useIsEmpty from "../hooks/useIsEmpty";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const user = useIsEmpty(auth);

    // console.log(auth, auth.roles ,auth.user)

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : user
                ? <Navigate to="/login" state={{ from: location }} replace />
                : <Navigate to="/unauthorized" state={{ from: location }} replace />
    );
}

export default RequireAuth;