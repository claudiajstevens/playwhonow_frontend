import React, { useState, useEffect } from 'react';
import axios from 'axios';

import csvFile from './assets/LIB2023.csv';

const FestivalYear = () => {
    const [years, setYears] = useState([]);
    //const [yearsUploaded, setYearsUploaded] = useState(false);

    // Assuming csvData is a string containing the CSV data
    // const formData = new FormData();
    // formData.append('csvFile', {csvFile});

    // axios.post('/lineup/import-lineups', formData, {
    //     headers: {
    //         'Content-Type': 'multipart/form-data',
    //     },
    // })
    // .then(response => {
    //     console.log('CSV data uploaded successfully');
    // })
    // .catch(error => {
    //     console.error('Error uploading CSV data', error);
    // });

    // fetching all lineup years
    useEffect( () => {
        
        axios.get("/lineup/all")
            .then( response => {
                console.log(response.data);
                setYears(response.data);
            }).catch( error => {
                console.error("Error fetching data:", error);
            });

    }, []);


    const displayFestivalsYears = () => {
        return years.map( year => (
            <h3 key={year.id}>{year.startDate} - {year.endDate}</h3>
        ));
    }

    return (
        <div>
            <h2>Years Held</h2>
            {displayFestivalsYears()}
        </div>
    );
};

export default FestivalYear;