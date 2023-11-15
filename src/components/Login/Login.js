import React, { useState, useRef, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useLocalState } from '../../util/useLocalStorage';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../../api/axios';

// import AuthService from '../../services/authService';

const LOGIN_URL = '/auth/login'

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    // sets the focus to the username input field
    useEffect( () => {
        userRef.current.focus();
    }, []);

    // clears out error message when user changes input
    useEffect( () => {
        setErrMsg('');
    }, [username, password]);

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({username, password}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            
            console.log(JSON.stringify(response?.data));
            // console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.user?.authorities;
            // let roles = JSON.stringify(response?.data?.user?.authorities);
            // let roles = response?.data?.user?.authorities;
            // roles = roles.map(role => role.roleId);
            console.log("Roles: " + JSON.stringify(roles));
            setAuth({username, password, roles, accessToken});
            console.log("Access token: " + accessToken);
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", response?.data?.refreshToken);
            setUsername('');
            setPassword('');

            // this will send user back to page they were trying to access before they had to log on
            // or sends back to home page otherwise
            navigate(from, { replace: true });

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400){
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401){
                // setErrMsg('Unauthorized');
                setErrMsg('Invalid Username or Password');
            } else {
                setErrMsg('Login Failed');
            }

            errRef.current.focus();
        }
    }

    return (
        <section className='register'>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Log In!</h1>
            
            <form onSubmit={handleLogin} className='registerForm'>
                {/* username */}
                <label htmlFor="username">Username: </label>
                <input 
                    type="text" 
                    id="username"
                    ref={userRef}
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                />

                {/* password */}
                <label htmlFor='password'>Password: </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />

                <button className='register-btn'>Sign In</button>
            </form>

            <p>
                Don't have an account?<br />
                <span className='line'>
                    <Link to="/signup" className='login'>Sign Up</Link>
                </span>
            </p>
        </section>
    );
};

export default Login;
