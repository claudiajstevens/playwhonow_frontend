import React, { useState, useEffect } from 'react';
import AddFestivalForm from '../components/Festival/AddFestivalForm';
import UploadCSV from '../components/Festival/UploadCSV';
import axios from 'axios';

const Festivals = () => {
    const [festivals, setFestivals] = useState([]);

    useEffect( () => {
        axios.get("/festivals")
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
            <h2 key={festival.id}>{festival.name}</h2>
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