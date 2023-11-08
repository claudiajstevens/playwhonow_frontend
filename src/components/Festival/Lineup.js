import React, { useState, useEffect } from 'react';
import Papa, { parse } from "papaparse";
import axios from 'axios';

// Allowed extensions for input file
const allowedExtensions = ["csv"];


const Lineup = ( {lineupId} ) => {
    const [lineup, setLineup] = useState([]);

    // State to hold parsed data
    const [parsedData, setParsedData] = useState([null]);

    // state to store table Column name
    const [tableRows, setTableRows] = useState([]);

    // state to store the values
    const [values, setValues] = useState([]);
    
    // states for uploading csv file
    const [csvFile, setCsvFile] = useState("");

    const [error, setError] = useState("");

    const [dataFetched, setDataFetched] = useState(false);

    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect( () => {
        console.log(lineupId);
        console.log("getting lineup");
        axios.get(`${apiUrl}/lineupArtist/${lineupId}`)
            .then( response => {
                console.log(response.data);
                setLineup(response.data);
            })
            .catch ( error => {
                console.error("Error fetching data:", error);
            })
    }, []);

    const handleParseCSV = () => {
        // if user clicks the parse button without a file we show an error
        if (!csvFile) return setError("Enter a valid file");


        Papa.parse( csvFile, {
            header: true,
            skipEmptyLines: true,
            delimiter: ",",
            complete: function( results ) {
                console.log(results.data);

                if( results.data.length > 0 ){
                    const rowsArray = [];
                    const valuesArray = [];
    
                    // iterating data to get column name and their values
                    results.data.map( (d) => {
                        rowsArray.push(Object.keys(d));
                        valuesArray.push(Object.values(d));
                    });
    
                    // Parsed data response in array format
                    setLineup(results.data);
                    console.log(results.data);
    
                    // Filtered Column Names
                    setTableRows(rowsArray[0]);
    
                    // Filtered Values
                    setValues(valuesArray);
    
                    console.log("parse complete");
                    uploadLineupArtists(results.data);
                }

            },

        });


    }

    const handleChange = event => {
        setError("");

        // Check is user has entered the file
        if (event.target.files.length){
            const inputFile = event.target.files[0];

            // Check the file extensions, if not csv show error
            const fileExtension = inputFile?.type.split("/")[1];
            if(!allowedExtensions.includes(fileExtension)){
                setError("Please input a csv file");
                return;
            }

            // If input type is correct set the state
            setCsvFile(inputFile);
        }

    };


    const uploadLineupArtists = async (lineup) => {
        try{
                const response = await axios.post(`${apiUrl}/lineupArtist/import-lineupArtists/${lineupId}`, JSON.stringify(lineup), {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                console.log("Response from server: " + response.data);

        } catch (error) {
            console.error(error);
        }
    };

    const displayArtists = () => {
        // if( lineup ){
        //     return lineup.map(artist => (
        //         <h5 key={artist.id} className="artists">{artist.artistName}</h5>
        //     ));
        // }
        if( lineup.length > 0 ) {
            return lineup.map(artist => (
                <h5 key={artist.id} className="artists">{artist.artistName}</h5>
            ))
        } else {
            return <p>Loading lineup ... </p>
        }

    }


    return (
        <div className= "festivalInfo lineup">
            {displayArtists()}
            {/* {lineup} */}
            <label htmlFor="csvInput" style={{ display: "block"}}>
                Enter a CSV File Containing Lineups
            </label>
            <input
                id="csvInput"
                name="csvFile"
                type="File" 
                onChange={handleChange}
            />
            <div>
                <button onClick={handleParseCSV}>Parse</button>
            </div>
            <div>
            <table>
                <thead>
                    <tr>
                        {tableRows.map((rows, index) => {
                            return <th key={index}>{rows}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {values.map((value, index) => {
                        return (
                            <tr key={index}>
                                {value.map((val, i) => {
                                    return <td key={i}>{val}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </div>
            {/* <div style={{ marginTop: "3rem"}}>
                {error ? error : tableRows.map( (row, idx) => 
                    <div key={idx}>{row}</div>)}
            </div> */}
        </div>
    );
};

export default Lineup;
