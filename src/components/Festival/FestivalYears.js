import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import FestivalYearInfo from './FestivalYearInfo';


const FestivalYears = ( {festivalId} ) => {

    const [years, setYears] = useState([]);

    // fetching all lineup years
    useEffect( () => {
        console.log(festivalId);
        axios.get(`/lineup/${festivalId}`)
            .then( response => {
                console.log(response.data);
                setYears(response.data);
            }).catch( error => {
                console.error("Error fetching data:", error);
            });

    }, []);



    const displayFestivalsYears = () => {
        return years.map( year => (
            <FestivalYearInfo festivalYear = {year}/>
        ));
    }

    return (
        <div>
            <h2>Years Held</h2>
            {displayFestivalsYears()}
        </div>
    );
};

export default FestivalYears;