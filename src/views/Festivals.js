import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddFestivalForm from '../components/Festival/AddFestivalForm';
import UploadCSV from '../components/Festival/UploadCSV';
import axios from 'axios';

const Festivals = () => {
    const [festivals, setFestivals] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    console.log(apiUrl);

    useEffect( () => {
        axios.get(`${apiUrl}/festivals`)
            .then( response => {
                console.log(response.data);
                setFestivals(response.data);
            })
            .catch( error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const displayFestivals = () => {
        return festivals.map(festival => (
            <h2 key={festival.id} className="festivals"><Link to={`/festivals/${festival.id}`}>{festival.name}, {festival.city}</Link></h2>
        ));
    }

    return (
        <div>
            <h1>Festivals</h1>
            <UploadCSV />
            <AddFestivalForm />
            {displayFestivals()}
        </div>
    );
};

export default Festivals;