import React, { useEffect, useState } from 'react';


const SpotifyAuth = () => {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;   //'58f1e32db8984bf8a52539fb48a602e1'
    const redirectUri = process.env.REACT_APP_URL; //'http://localhost:3000';
    const scopes = ["user-read-currently-playing", "user-read-playback-state"];
    const [token, setToken] = useState('');

    const generateRandomString = (length) => {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      
        for (let i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    async function generateCodeChallenge(codeVerifier) {
        // const encoder = new TextEncoder();
        // const data = encoder.encode(codeVerifier);
        // const digest = await window.crypto.subtle.digest('SHA-256', data);
        
        // return btoa(String.fromCharCode(...new Uint8Array(digest)))
        //     .replace(/\+/g, '-')
        //     .replace(/\//g, '_')
        //     .replace(/=+$/, '');
        function base64encode(string) {
          return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
        }

        const encoder = new TextEncoder();
        const data = encoder.encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);
      
        return base64encode(digest);
    }

    useEffect( () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const storedCodeVerifier = localStorage.getItem('code_verifier');

        if ( code && storedCodeVerifier ){
            const body = new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri,
                client_id: clientId,
                code_verifier: storedCodeVerifier,
            });
        
            fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: body
            })
                .then( (response) => {
                    if( !response.ok ) {
                        throw new Error('HTTP status ' + response.status);
                    }

                    return response.json();
                })
                .then( (data) => {
                    localStorage.setItem('access_token', data.access_token);
                    setToken(data.access_token);
                })
                .catch( (error) => {
                    console.error('Error:', error);
                });
        }
    }, []);

    const handleLogin = () => {
        const codeVerifier = generateRandomString(128);

        generateCodeChallenge(codeVerifier).then((codeChallenge) => {
            const state = generateRandomString(16);
            const scope = 'user-read-private user-read-email';

            localStorage.setItem('code_verifier', codeVerifier);

            const args = new URLSearchParams({
                response_type: 'code',
                client_id: clientId,
                scope: scope,
                redirect_uri: redirectUri,
                state: state,
                code_challenge_method: 'S256',
                code_challenge: codeChallenge
              });

            window.location = `https://accounts.spotify.com/authorize?` + args;
            //   window.location = `https://accounts.spotify.com/authorize?${args.toString()}`;
        });
    };

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("access_token")
      }


    return (
        <div>
            {
                !token ? 
                    <button onClick={handleLogin}>Login with Spotify</button>
                    : <button onClick={logout}>Logout</button>

            }
            {/* <button onClick={handleLogin}>Login with Spotify</button> */}
        </div>
    );
};

export default SpotifyAuth;


            {/* {!token ?
                <a className='btn btn-success' href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                to Spotify</a>
                : <button onClick={logout}>Logout</button>} */}