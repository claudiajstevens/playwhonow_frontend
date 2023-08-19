import React, { useState } from 'react';
import { useLocalState } from '../../util/useLocalStorage';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [jwt, setJwt] = useLocalState("", "jwt");

    function sendLoginRequest() {
        console.log("I'm sending a request...");

        const  reqBody = {
            "username": username,
            "password": password,
        };

        console.log(JSON.stringify(reqBody));

        fetch("/auth/login", {
            headers: {
            "Content-Type": "application/json"
        },
            method: "post",
            body: JSON.stringify(reqBody)
        })
            .then((response) => {
                console.log(response.status);
                if(response.status === 200){

                    return Promise.all([response.json(), response.headers]);
                }else{
                    return Promise.reject("Invalid login attempt");
                }
                
            })
            .then(([body, headers]) => {
                setJwt(body.jwt);  
                window.location.href = "profile";
            })
            .catch((message) => {
                alert(message);
            });
    }

    return (
        <>
            <div>
                <label htmlFor='username'>Username: </label>
                <input 
                    id="username" 
                    value={username} 
                    onChange={ (e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={ (e) => setPassword(e.target.value)}/>
            </div>
            <div>
                <button id="submit" type="button" onClick={() => sendLoginRequest()}>Login</button>
            </div>        
        </>

    );
};

export default Login;