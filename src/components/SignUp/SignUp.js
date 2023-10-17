import React, { useState } from 'react';
import "./SignUp.css";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const apiUrl = process.env.REACT_APP_API_URL;

    function sendSignUpRequest() {
        console.log("I'm sending a request...");

        const  reqBody = {
            "username": username,
            "password": password,
            "email": email,
        };

        console.log(JSON.stringify(reqBody));

        fetch(`${apiUrl}/auth/register`, {
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
                    return Promise.reject("Unable to sign up");
                }
                
            })
            .then(([body, headers]) => {
                window.location.href = "login";
            })
            .catch((message) => {
                alert(message);
            });
    }

    return (
        <div className="container">
            <h1>Sign Up!</h1>
            <form>
                <label htmlFor="email">Email: </label>
                <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={ e => setEmail(e.target.value)} />
                <label htmlFor='username'>Username: </label>
                <input 
                    id="username" 
                    value={username} 
                    onChange={ (e) => setUsername(e.target.value)} />
                <label htmlFor="password">Password: </label>
                <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={ (e) => setPassword(e.target.value)}/>
                <button id="submit" type="button" onClick={() => sendSignUpRequest()}>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;



{/* <div>
<label htmlFor="email">Email: </label>
<input 
    type="email" 
    id="email" 
    value={email} 
    onChange={ e => setEmail(e.target.value)} />
</div>
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
<button id="submit" type="button" onClick={() => sendSignUpRequest()}>Sign Up</button>
</div>  */}