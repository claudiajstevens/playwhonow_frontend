import axios from 'axios';
import React, {useEffect, useState} from 'react';

const PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/me/playlists`;

const SpotifyGetPlaylists = () => {
    const [token, setToken] = useState("");
    const [data, setData] = useState({});
    const [error, setError] = useState(null);

    useEffect( () => {
        if(localStorage.getItem('access_token')){
            setToken(localStorage.getItem("access_token"));
            console.log("Access token: " + token);
        }

    }, []);

    const handleGetPlaylists = () => {
        console.log(token);
        axios
        .get(PLAYLIST_ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => {
            setData(response.data);
            console.log(response.data);
        })
        .catch( error => {
            setError(error.message);
            console.error('Error fetching playlists:', error);
        });
    };

    return(
        <>
            {error && <p>Error: {error}</p>}
            <button onClick={handleGetPlaylists}>Get Playlists</button>
            {data?.items ? data.items.map((item) => <p>{item.name}</p>) : null }
        </>
    );
}

export default SpotifyGetPlaylists;