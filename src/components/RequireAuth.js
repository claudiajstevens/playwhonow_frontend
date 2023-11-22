import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ( {allowedRoles} ) => {
    const { auth } = useAuth();
    const location = useLocation();
    
    console.log("Auth State: " + JSON.stringify(auth));

    // if( !auth || !auth.username || !auth.roles ){
    //     console.error("Authentication data is missing.");
    // }

    return (
        // this will check the roles that are stored in our state
        // then pass in each role to see if the allowed roles includes the role that is being passed
        // if the roles are not one of the allowed roles then user will be navigated away
        // auth?.roles?.find(role => allowedRoles?.includes(role.roleId))
        auth?.roles?.find(role => allowedRoles?.includes(role.roleId))
            ? <Outlet />
            : auth?.accessToken 
                ? <Navigate to="/unauthorized " state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;
