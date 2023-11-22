import axios from "../api/axios";
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    // const { auth } = useAuth();

    //const refreshBody = {
    //   refreshToken: localStorage.getItem("access_token")
    //}

    //const accessToken = localStorage.getItem("access_token");
    // const accessToken = auth?.accessToken;

    // TODO: set up refresh token in http only cookie
    const refresh = async () => {
        // console.log(accessToken);
        const response = await axios.get('/auth/refresh', {
            withCredentials: true
        });

        setAuth(prev => {
            console.log("Previous: " + JSON.stringify(prev));
            console.log("New: " + JSON.stringify(response.data.user));
            console.log("Authorities: " + JSON.stringify(response.data.user.authorities));
            console.log("Access Token: " + JSON.stringify(response.data.accessToken));
            return { 
                ...prev, 
                roles: response.data.user.authorities,
                accessToken: response.data.accessToken }
        });

        return response.data.accessToken;
        // return response.data.user.accessToken;
    }

    return refresh;
};

export default useRefreshToken;
