import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
    const { user } = useAuth();

    if (user === null) {
        return <Navigate to="/login" state="/checkout" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
