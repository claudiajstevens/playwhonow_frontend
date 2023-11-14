import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./SignUp.css";


// regex to validate the username and password
// user name: must start with a letter, then can be followed by 3-23 charatcters that are either (letter, number, dash, or underscore)
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

// password: at least one lowercase letter, uppercase letter, one digit, and one special character. 
//           and must be at least 8 characters long
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const REGISTER_URL = '/auth/register';


const SignUp = () => {
    // have ref for user input to have focus on user input when it loads
    const userRef = useRef();

    // want focus on error if there is one so that it can be announded by a screen reader for accessability 
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState("");

    // this will set the user focus to the username element on page load
    useEffect( () => { 
        userRef.current.focus();
    }, []);

    // this is going to deal with user validation as user enters a username
    // every time a user changes the username then it will check if it is valid
    useEffect( () => {
        const result = USER_REGEX.test(user);
        // console.log(result);
        // console.log(user);
        setValidName(result);
    }, [user]);

    // this will make sure that the email entered is valid
    useEffect( () => {
        const result = EMAIL_REGEX.test(email);
        // console.log(result);
        // console.log(email);
        setValidEmail(result);
    }, [email]);

    // this will handle validation for the password
    // checks if the password entered passes the regex as well as makes sure that 
    // when user enters the password again that both passwords are the same
    useEffect( () => {
        const result = PWD_REGEX.test(password);
        // console.log(result);
        // console.log(password);
        setValidPassword(result);
        const match = password === matchPwd;
        setValidMatch(match);
    }, [password, matchPwd]);

    // this will clear out error message when user changes username or passwords
    // so that as user updates info then will update accordingly
    useEffect( () => {
        setErrMsg('');
    }, [user, email, password, matchPwd]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(password);
        const v3 = EMAIL_REGEX.test(email);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }

        const reqBody = {
            "username": user,
            "password": password,
            "email": email,
        };

        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify(reqBody),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            console.log(response.data);
            console.log(response.token);
            console.log(JSON.stringify(response));

            setSuccess(true);

        } catch (err) {
           if (!err?.response){
                setErrMsg('No server Response');
           } else if (err.response?.status === 409) {
                console.error(err.response.data);
                setErrMsg(err.response.data);
           } else {
                setErrMsg('Registration Failed');
           }

           errRef.current.focus();
        }

    }

    return (
        <>
        {success ? (
                <section className="register">
                    <h1>Account Created!</h1>
                    <p>
                        <Link to="/login" className='login'>Sign In</Link>
                    </p>
                </section>
        ) : (
            <section className="register">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign Up!</h1>
                <form onSubmit={handleSubmit} className='registerForm'>

                    {/* username field */}
                    <label htmlFor="username">
                        Username: 
                        <span className={validName ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validName ? "valid" : "hide"}></span>
                        <span className={validName || !user ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>                
                    </label>
                    <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={ (e) => setUser(e.target.value)}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                    />
                    <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters. <br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>

                    {/* email field */}
                    <label htmlFor="email">
                        Email: 
                        <span className={validEmail ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validEmail ? "valid" : "hide"}></span>
                        <span className={validEmail || !email ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span> 
                    </label>
                    <input
                        type="email"
                        id="email"
                        onChange={ (e) => setEmail(e.target.value)}
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby='emailnote'
                        onFocus={ () => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    <p id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Please enter a valid email.
                    </p>

                    {/* password field */}
                    <label htmlFor='password'>
                        Password: 
                        <span className={validPassword && password ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validPassword || !password ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input 
                            type="password"
                            id="password"
                            onChange={ (e) => setPassword(e.target.value)}
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby='pwdnote'
                            onFocus={ () => setPwdFocus(true)}
                            onBlur={ () => setPwdFocus(false)}
                    />
                    <p id="pwdnote" className={pwdFocus && !validPassword ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number, and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>

                    {/* password match field */}

                    {/* password field */}
                    <label htmlFor='confirm_password'>
                        Confirm Password: 
                        <span className={validMatch && matchPwd ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input 
                            type="password"
                            id="confirm_pwd"
                            onChange={ (e) => setMatchPwd(e.target.value)}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby='confirmnote'
                            onFocus={ () => setMatchFocus(true)}
                            onBlur={ () => setMatchFocus(false)}
                    />
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Passwords do not match.
                    </p>

                    <button className="register-btn" disabled={!validName || !validEmail || !validPassword || !validMatch ? true : false}>Register</button>
                </form>

                <p>
                    Already registered?<br />
                    <span className='line'>
                        <Link to="/login" className='login'>Log In</Link>
                    </span>
                </p>
            </section>
        )}
        </>    
        
    );
};

export default SignUp;
