import React, { useState, useRef, useEffect, useContext } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import useToggle from '../../hooks/useToggle';
import "./Login.css"

import axios from '../../api/axios';
const LOGIN_URL = '/auth/login'

// import AuthService from '../../services/authService';


const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [username, resetUser, userAttribs] = useInput('username', '');
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const [check, toggleCheck] = useToggle('persit', false);

    // sets the focus to the username input field
    useEffect( () => {
        userRef.current.focus();
    }, []);

    // clears out error message when user changes input
    useEffect( () => {
        setErrMsg('');
    }, [username, password]);

    // const onChangeUsername = (e) => {
    //     const username = e.target.value;
    //     setUsername(username);
    // };

    // const onChangePassword = (e) => {
    //     const password = e.target.value;
    //     setPassword(password);
    // }


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
            setAuth({username, password, roles, accessToken});
            // let roles = JSON.stringify(response?.data?.user?.authorities);
            // let roles = response?.data?.user?.authorities;
            // roles = roles.map(role => role.roleId);
            // console.log("Roles: " + JSON.stringify(roles));
            // console.log("Access token: " + accessToken);
            // localStorage.setItem("access_token", accessToken);
            // localStorage.setItem("refresh_token", response?.data?.refreshToken);
            //setUsername('');
            resetUser();
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

    // const togglePersist = () => {
    //     setPersist(prev => !prev);
    // }

    // useEffect( () => {
    //     localStorage.setItem("persist", persist);
    // }, [persist]);

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
                    {...userAttribs}
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
                <div className="persistCheck">
                    <input 
                        type="checkbox"
                        id="persist"
                        onChange={toggleCheck}
                        checked={check}
                    />
                    <label htmlFor='persist'>Trust This Device</label>
                </div>
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
