import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import FestivalYears from './FestivalYears';
import UploadCSV from './UploadLineupCSV';

const Festival = () => {
    const { id } = useParams();

    const [festival, setFestival] = useState([]);

    const apiUrl = process.env.REACT_APP_API_URL;

    // useEffect(() => {
    //     // Fetch the festival details from your Spring Boot backend using the festival ID
    //     fetch(`/api/festivals/${id}`)
    //       .then((response) => response.json())
    //       .then((data) => setFestival(data))
    //       .catch((error) => console.error('Error fetching festival:', error));
    //   }, [id]);



    useEffect( () => {
        axios.get(`${apiUrl}/festivals/${id}`)
            .then( response => {
                console.log("Axios call went through");
                console.log(response.data);
                setFestival(response.data);
            })
            .catch( error => {
                console.error("Error fetching data:", error);
            });
    }, [id]);

    // Extract the month and year from the festival date
    // const festivalMonth = festival.month;

    // Define an array of months for the timeline
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


        return (
            <div>
                <h1>{festival.name}</h1>
                <h2>{festival.city}</h2>
                <div className="timeline">
                    {months.map((month) => (
                    <div
                        key={month}
                        className={`timeline-month ${month === festival.monthHeld ? 'highlighted' : ''}`}
                    >
                        {month}
                    </div>
                    ))}
                </div>
                <UploadCSV />
                <FestivalYears festivalId={id}/>

            </div>
        );
};

export default Festival;