import React, {useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Table from './Table';
import "./App.css";

function Searcher(props) {
    const [searchKey, setSearchKey] = useState("")
    const [tracks, setTracks] = useState([])
    const [artist, setArtist] = useState("")
    const [genres, setGenres] = useState([])
    const artists = ["Porter Robinson", "Madeon", "Jai Wolf"]
    const [topSongs, setTopSongs] = useState([])
    const [tS, setTS] = useState([]);
    const artist_info = {name: "", tracks: []}
    const topTracks = []

    const access_token = props.token
    
    const searchArtist = async () => {
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                'Content-Type' : "application/json",
                'Authorization': `Bearer ${access_token}`
            },
            params: {
                q: searchKey,
                type: "artist"
            }
        })

        var artistID = data.artists.items[0].id
        setArtist(data.artists.items[0].name)
        setGenres(data.artists.items[0].genres)

        var artistTracks = await axios.get(`https://api.spotify.com/v1/artists/${artistID}/top-tracks`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            },
            params: {
                limit: 10,
                market: 'US'
            }
        })

        setTracks(artistTracks.data.tracks);
    }

    const renderGenres = () => {
        return genres.map(genre => (
          <div key={genre}>
            {genre}
          </div>
        ))
    }

    const displayTopSongs = async () => {
        for( let i = 0; i < artists.length; i++){
            const {data} = await axios.get("https://api.spotify.com/v1/search", {
                headers: {
                    'Content-Type' : "application/json",
                    'Authorization': `Bearer ${access_token}`
                },
                params: {
                    q: artists[i],
                    type: "artist"
                }
            })

            var artistID = data.artists.items[0].id;
            var artist = data.artists.items[0].name;
            console.log(artistID);
            console.log(artist);
    
            var artistTracks = await axios.get(`https://api.spotify.com/v1/artists/${artistID}/top-tracks`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                params: {
                    limit: 10,
                    market: 'US'
                }
            })
            
            console.log(artistTracks.data.tracks);
            setTopSongs( topSongs => [...topSongs, artistTracks.data.tracks]);
            console.log(topSongs);

            const tracks = artistTracks.data.tracks.map(track => track.name);
            console.log(tracks);

            //setTS( tS => (...tS, {artist: artist, tracks: [artistTracks.data.tracks]}));
            const updatedTS = {artist: artist, tracks: tracks};
            console.log(updatedTS);

            //handleAddNewArtist(artist, tracks);
            // setTS( tS => ([
            //     ...tS,
            //     updatedTS
            // ]));




            // topTracks.push({
            //     name: artist,
            //     tracks: tracks
            // })

            // console.log(topTracks);
            // console.log(topTracks[0].name);

            // console.log(tS);
            console.log(topSongs);

            //topSongs.forEach( artist => artist.forEach( track => console.log(track.name)));



        }

    }

    function handleAddNewArtist(artist, tracks){
        const updateArtist = [
            // copy the current users state
            ...tS,

            // not you can add a new object to add to the array
            {
                artist: artist,
                tracks: tracks
            }
        ];

        setTS(updateArtist);

        console.log(tS);
    }

    const renderSongs = () => {
        return(
            topSongs.map( artist => (
                <div key={artist}>
                    {   
                        artist.map( track => (
                            <h2>{track.name}</h2>
                        ))
                    }
                </div>
            ))

        )
    
    }

    const renderSongsLine = () => {

        return(
            topSongs.map( artist => (
                <div>
                    {
                        artist.map( track => (
                            <div>
                                <img src={track.album.images[0].url} height="50px" />
                                {track.name}
                                {
                                    track.artists.map( artist => <div>{artist.name}</div>)
                                }
                            </div>
                        ))
                    }
                </div>
            ))
        )
    }

    const renderSongsInTable = () => {
        return(
            <table>
                <tr>
                    <th>Album</th>
                    <th>Track</th>
                    <th>Artist(s)</th>
                </tr>
                {
                    topSongs.map( artist => (
                        <tr>
                            {
                            artist.map( track => (
                                <tr>                                    
                                    <td><img src={track.album.images[0].url} height="50px" /></td>
                                    <td>{track.name}</td>
                                    <td>{listArtists(track.artists)}</td>
                                </tr>

                            ))
                            }
                        </tr>
                    ))
                }
            </table>
        )
    }

    const listArtists = (artistList) => {
        const artists = artistList.map( artist => (artist.name)).join(", ");
        return artists;
    }

    const renderArtistSongs = () => {
        console.log(topTracks);
        return(
            topTracks.map( artist => (
                <h1>{artist.name}</h1>
            ))
            // topTracks.map( artist => (
            //     <div key={artist.name}>
            //         <h1>{artist.name}</h1>
            //         {/* {
            //             artist.tracks.map( track => (
            //                 <h2>{track}</h2>
            //             ))
            //         } */}
            //     </div>
            // ))
        )  
    }

    const test = () => {
        return(
            <h2>Test</h2>
        )
    }

    const createPlaylist = async (name) => {
        const {data} = await axios.get()

        axios.post('https://api.spotify.com/v1/users/{user_id}/playlists', {
            name: 'Fred'
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }


    const columns = useMemo(
        () => [
            {
                Header: "Album",

                columns: [
                    {
                        Header: "Album",
                        accessor: "track.album",
                    },
                    {
                        Header: "Track",
                        accessor: "track.name",
                    },
                    {
                        Header: "Artist(s)",
                        accessor: "track.artists",
                    },
                ],
            },
        ],
        []
    );

    const insertTableData = () => {
        const data = {}

        // album art
        // track name
        // artist(s)

        for(let i = 0; i < topSongs.length; i++){
            const asArray = Object.entries(topSongs[i]);
            console.log(asArray);
            const tracks = asArray.filter(([key, value]) => key === 'name');
            console.log(topSongs[i]);
            console.log(tracks);

        }

        return(
            <tr></tr>
        )
    }


    return (
        <>
            <div className="SearchForm">
                <input
                    className ="Name"
                    type="text"
                    placeholder="Search By Artist Name ..."
                    onChange={(e) => {setSearchKey(e.target.value)}}

                />
                <button onClick={searchArtist}>Search</button>
            </div>
            <div>
                <h1>{artist}</h1>
                {genres}
            </div>
            <table>
                <tr>
                    <th>Artist</th>
                    <th>Track</th>
                </tr>
                {                
                    tracks.slice(0, 5).map(track => (
                        <tr>
                            <td>{artist}</td>
                            <td>{track.name}</td>
                        </tr>
                    ))
                }
            </table>
            <h1>Top Tracks</h1>
            {
                
                tracks.slice(0, 5).map(track => (
                    <div key={track.id} >
                        <ul>
                            <li > {track.name} </li>
                        </ul>
                    </div>
                ))
            }
            {
                artists.map(artist => (
                    <h2>{artist}</h2>
                ))
            }
            <button onClick={displayTopSongs}>Top Songs</button>
            {/* <h3>{topSongs}</h3> */}
            {/* {renderSongs()} */}
            {/* {renderSongsLine()} */}
            {renderSongsInTable()}

            {/* <Table columns={columns} data={topSongs} /> */}
            {/* {renderArtistSongs()} */}
            {/* {createPlaylist('Life Is Beautiful 2023')} */}

            <div class="songContent">
                <table>
                    <thead>
                        <tr>
                            <th>Album</th>
                            <th>Track</th>
                            <th>Artist(s)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {insertTableData()}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Searcher