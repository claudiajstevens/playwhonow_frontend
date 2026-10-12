import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {jwtDecode, JwtPayload} from "jwt-decode";

interface TokenPayload extends JwtPayload {
  roles?: string;   // matches what TokenService sends: one space-joined string
}

interface RequireAuthProps {
  allowedRoles: (string | number)[];
}


const RequireAuth = ( {allowedRoles}: RequireAuthProps) => {
    const { auth } = useAuth();
    const location = useLocation();
    
    const decoded = auth?.accessToken 
        ? jwtDecode<TokenPayload>(auth.accessToken)
        : undefined;
    
    const roles = decoded?.roles?.split(" ") ?? [];
    const isAllowed = roles.some(role => allowedRoles.includes(role));
    
    console.log("Roles " + roles);
    console.log("Allowed roles: " + allowedRoles);

    return isAllowed 
        ? <Outlet /> 
        : auth?.accessToken
            ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequireAuth;
