import axios from 'axios';
import React, {useEffect, useState} from 'react';

const PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/me/playlists`;

const SpotifyGetPlaylists = () => {
    const [token, setToken] = useState("");
    const [data, setData] = useState({});

    useEffect( () => {
        if(localStorage.getItem('access_token')){
            setToken(localStorage.getItem("access_token"));
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
            console.log(error);
        });
    };

    return(
        <>
            <button onClick={handleGetPlaylists}>Get Playlists</button>
            {data?.items ? data.items.map((item) => <p>{item.name}</p>) : null }
        </>
    );
}

export default SpotifyGetPlaylists;