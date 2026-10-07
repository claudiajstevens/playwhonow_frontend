import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {jwtDecode} from "jwt-decode";

const RequireAuth = ( {allowedRoles} ) => {
    const { auth } = useAuth();
    const location = useLocation();
    
    const decoded = auth?.accessToken 
        ? jwtDecode(auth.accessToken)
        : undefined;

    console.log("decoded: " + JSON.stringify(decoded));
    console.log("Auth State: " + JSON.stringify(auth));
    
    let roles = [];
    console.log("decoded roles: " + decoded.roles);
    roles.push(decoded.roles);
    //roles = decoded?.roles?.map( role => role);
    
    console.log("Roles " + roles);
    console.log("Allowed roles: " + allowedRoles);

    

    // if( !auth || !auth.username || !auth.roles ){
    //     console.error("Authentication data is missing.");
    // }

    return (
        // this will check the roles that are stored in our state
        // then pass in each role to see if the allowed roles includes the role that is being passed
        // if the roles are not one of the allowed roles then user will be navigated away
        // auth?.roles?.find(role => allowedRoles?.includes(role.roleId))
        roles.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.accessToken 
                ? <Navigate to="/unauthorized " state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;
