import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface ProtectedRouteProps {
  element: React.ReactElement;
}
export default function ProtectedRoute({element} : ProtectedRouteProps){
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    return isAuthenticated ? element : <Navigate to="/login" state={{ from: location }} replace />;
}