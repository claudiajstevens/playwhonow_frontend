import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    let isMounted = true;

    useEffect( () => {
        const verifyRefreshToken = async () => {
            try {
                // this will send cookie with refresh token to refresh endpoint and returns a new access token
                await refresh();
            } catch (err){
                console.error(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        } 

        // only want to run verify refresh if we do not already have an access token
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;

    }, []);

    useEffect(() => {
      console.log(`isLoading: ${isLoading}`)
      console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
    }, [isLoading]);

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin;
