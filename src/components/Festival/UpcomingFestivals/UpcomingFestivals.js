import axios from 'axios';
import React, {useState, useEffect } from 'react';
import "./UpcomingFestivals.css";

import countdown2023lineup from "../../../assets/lineups/countdown2023lineup.png";
import decadencelineup2023 from "../../../assets/lineups/decadencelineup2023.jpg";
import properNYE2023lineup from "../../../assets/lineups/properNYE2023lineup.jpg";

const UpcomingFestivals = () => {
    const [upcomingFestivals, setUpcomingFestivals] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect( () => {
        axios.get(`${apiUrl}/lineup/upcoming-lineups`)
            .then( response => {
                console.log(response.data);
                setUpcomingFestivals(response.data);
            })
            .catch( error => {
                console.error("Error fetching upcoming lineups:", error);
            });
    }, []);

    const displayUpcomingFestivals = () => {
        return upcomingFestivals.map(festival => (
            <div key={festival.lineupId} className="upcomingFestivals">
                <div className='name'>{festival.festival}</div>
                <div className='date'>{festival.startDate} to {festival.endDate}</div>
                <div className='days-remaining'>{countdown(festival.startDate)} Days</div>
            </div>
        ))
    }

    //{formatDate(festival.startDate)} to {formatDate(festival.endDate)}


    const formatDate = (date) => {
        const options = { month: 'long', day: 'numeric', year: 'numeric'};
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString(undefined, options);
    }
    
    const countdown = (date) => {
        let today = new Date();
        let festDate = new Date(date);
        let dayMilliseconds = 1000 * 60 * 60 * 24;

        let remainingDays = Math.ceil(
            (festDate.getTime() - today.getTime()) / (dayMilliseconds)
        );

        return remainingDays;
    }

    return (
        <div>
            <div className='lineup-poster'>
                <div className='lineup-pic-card'>
                    <img src={countdown2023lineup} className='lineup-img'/>
                </div>
                <div className='lineup-pic-card'>
                    <img src={properNYE2023lineup} className='lineup-img'/>
                </div>
                <div className='lineup-pic-card'>
                <img src={decadencelineup2023} className='lineup-img'/>
                </div>
            </div>
            <div className='festival-bar'>
                {displayUpcomingFestivals()}
            </div>
        </div>
    );
};

export default UpcomingFestivals;
