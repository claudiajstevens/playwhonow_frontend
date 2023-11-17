import React, { useState, useEffect } from "react";
import axiosPrivate from '../../api/axios';

const UploadLineupPoster = () => {
    const [lineupId, setLineupId] = useState('');
    const [festivalYear, setFestivalYear] = useState('');
    const [festivalYears, setFestivalYears] = useState([]);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);


    useEffect( () => {
        console.log(query);
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get(`/festivals/search?q=${query}`);
                console.log(response.data);
                setSuggestions(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (query.trim() !== '' ){
            fetchData();
        } else {
            setSuggestions([]);
        }

    }, [query]);


    const handleSelection = () => {
        
    }

    return (
        <div>
            <input 
                type='text'
                value={query}
                placeholder='Enter a festival ...'
                onChange={ (e) => {
                    setQuery(e.target.value)
                }} />
            
            <ul>
                {suggestions.map((festival) => (
                    <li key={festival.id} onClick={() => handleSelection(festival)}>
                        {festival.name }
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UploadLineupPoster;
