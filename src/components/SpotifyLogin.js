import React from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=58f1e32db8984bf8a52539fb48a602e1&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";
//%20playlist-modify-public%20user-follow-modify%20user-top-read";


const CLIENT_ID = "58f1e32db8984bf8a52539fb48a602e1";
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

const SpotifyLogin = () => {


    return (
        <Container 
            className="d-flex justify-content-center align-items-center" 
            style={{ minHeight: "100vh" }}
        >
            <a className='btn btn-success btn-lg' href={AUTH_URL}>Login With Spotify</a>
        </Container>
    );
};

export default SpotifyLogin;