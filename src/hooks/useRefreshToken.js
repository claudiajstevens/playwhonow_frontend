import axios from "../api/axios";
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const { auth } = useAuth();

    //const refreshBody = {
    //   refreshToken: localStorage.getItem("access_token")
    //}

    //const accessToken = localStorage.getItem("access_token");
    const accessToken = auth?.accessToken;

    // TODO: set up refresh token in http only cookie
    const refresh = async () => {
        console.log(accessToken);
        const response = await axios.post('/auth/refresh', accessToken, {
            withCredentials: true
        });

        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data);
            return { ...prev, accessToken: response.data }
        });

        return response.data.accessToken;
    }

    return refresh;
};

export default useRefreshToken;
