import React, { useState, useEffect } from "react";
import axios from 'axios';

import Hero from "../components/Hero/Hero";
// import SpotifyLogin from "../components/SpotifyLogin";
// import Searcher from "../components/Searcher";
// import SpotifyGetPlaylists from "../components/SpotifyGetPlaylists/SpotifyGetPlaylists";
// import SpotifyAuth from "../util/SpotifyAuth";
import UpcomingFestivals from "../components/Festival/UpcomingFestivals/UpcomingFestivals";
// import background from "../assets/background.png";

const Home = () => {
    // const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;  //"58f1e32db8984bf8a52539fb48a602e1"
    // const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    // const RESPONSE_TYPE = "token"
  
    const [token, setToken] = useState("")
    const [upcomingFestivals, setUpcomingFestivals] = useState([])

    // const SCOPES = ["user-read-currently-playing", "user-read-playback-state"];

    const apiUrl = process.env.REACT_APP_API_URL;

      // for fetching data
      const [searchKey, setSearchKey] = useState("")
      const [artists, setArtists] = useState([])
      //const [songs, setSongs] = useState([])
  
    useEffect( () => {
      const storedAuthToken = localStorage.getItem('access_token');

      if (storedAuthToken) {
        // console.log("setting access token: " + storedAuthToken);
        setToken(storedAuthToken);
      }
    }, []);

    // useEffect( () => {
    //   const hash = window.location.hash
    //   let token = window.localStorage.getItem("token")
  
    //   if (!token && hash) {
    //     token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
  
    //     window.location.hash = ""
    //     window.localStorage.setItem("token", token)
    //   }
  
    //   setToken(token)
  
    // }, [])
  
    // const logout = () => {
    //   setToken("")
    //   window.localStorage.removeItem("token")
    // }
  
  
    const searchArtists = async (e) => {
      e.preventDefault()
      const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          q: searchKey,
          type: "artist"
        }
      })
  
      setArtists(data.artists.items)
  
    }
  
    const renderArtists = () => {
      return artists.map(artist => (
        <div key={artist.id}>
          {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
          {artist.name}
          {artist.id}
        </div>
      ))
    }
  
    
    useEffect( () => {
      axios.get(`${apiUrl}/festivals`)
          .then( response => {
              console.log(response.data);
              setUpcomingFestivals(response.data);
          })
          .catch( error => {
              console.error("Error fetching data:", error);
          });
    }, []);
  
    // const getTopSongs = async (e) => {
    //   e.preventDefault()
    //   const {data} = await axios.get(`https://api.spotify.com/v1/artists/3dz0NnIZhtKKeXZxLOxCam/top-tracks`, {
    //       headers: {
    //           Authorization: `Bearer ${token}`
    //       }
    //   })
  
    //   setSongs(data.songs.items)
  
    //   return songs.map(song => (
    //     <div key={artist.id}>
    //       {song}
    //     </div>
    //   ))
    // }


    return (
        <div className="home-page">
            <Hero />
            {/* <SpotifyLogin /> */}
            
            {/* <h1>Festival Playlist Generator</h1>
            <SpotifyAuth /> */}

            {/* {!token ?
                <a className='btn btn-success' href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                to Spotify</a>
                : <button onClick={logout}>Logout</button>} */}
{/* 
            <SpotifyGetPlaylists /> 

            {token ?
                <form onSubmit={searchArtists}>
                    <input type="text" onChange={e => setSearchKey(e.target.value)}/>
                    <button type={"submit"}>Search</button>
                  </form>

                : <h2>Please login</h2>
            } */}

            {/* {renderArtists()}

            <Searcher token={token} /> */}

            <div className="upcomingFests">
              <h1>Upcoming Festivals</h1>
              <UpcomingFestivals />
            </div>

        </div>
    )
}

export default Home;
