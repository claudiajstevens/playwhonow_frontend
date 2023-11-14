import axios from "axios";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";

const apiUrl = process.env.REACT_APP_API_URL;

const register = (username, email, password) => {
    return axios.post(apiUrl + "/auth/register", {
        username,
        email,
        password
    });
};

const login = (username, password) => {
    return axios.post(apiUrl + "/auth/login", {
        username,
        password,
    })
    .then( (response) => {
        if(response.data.username) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem("user");
    return axios.post(apiUrl + "signout").then( (response) => {
        return response.data;
    });
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
}

export default AuthService;
