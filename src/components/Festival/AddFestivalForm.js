import React, { useState } from 'react';

const AddFestivalForm = () => {
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [location, setLocation] = useState("");
    const apiUrl = process.env.REACT_APP_API_URL;

    function sendAddFestivalRequest(){

        const reqBody = {
            "name": name,
            // "startDate": startDate,
            // "endDate": endDate,
            "location": location
        };

        fetch(`${apiUrl}/festivals/add`, {
            headers: {
            "Content-Type": "application/json"
        },
            method: "post",
            body: JSON.stringify(reqBody)
        })
            .then((response) => {
                console.log(response.status);
                if(response.status === 200){
                    return Promise.all([response.json(), response.headers]);
                }else{
                    return Promise.reject("Unable to add festival");
                }
                
            })
            .catch((message) => {
                alert(message);
            });
    }
    // Name
    // start date
    // end date
    // location

    return (
        <form>
            <label htmlFor='festivalName'>Festival</label>
            <input 
                id="festivalName"
                value={name}
                onChange={ (e) => setName(e.target.value)} />
            <label htmlFor='startDate' placeholder='mm/dd/yyyy'>Start</label>
            {/* <input 
                id="startDate"
                type="date"
                value={startDate}
                onChange={ (e) => setStartDate(e.target.value)} />
            <label htmlFor='endDate' placeholder='mm/dd/yyyy'>End</label>
            <input 
                id="endDate"
                type='date'
                value={endDate}
                onChange={ (e) => setEndDate(e.target.value)} /> */}
            <label htmlFor='location' placeholder='City, State'>Where</label>
            <input  
                id="location"
                value={location}
                onChange={ (e) => setLocation(e.target.value) } />
            <button type="submit" onClick={() => sendAddFestivalRequest()}>Add</button>
        </form>
    );
};

export default AddFestivalForm;