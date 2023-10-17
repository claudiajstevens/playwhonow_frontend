import React, { useState, useEffect } from 'react';
import Papa, { parse } from "papaparse";
import axios from 'axios';

// Allowed extensions for input file
const allowedExtensions = ["csv"];

const UploadCSV = () => {
    // State to hold parsed data
    const [parsedData, setParsedData] = useState([null]);

    // state to store table Column name
    const [tableRows, setTableRows] = useState([]);

    // state to store the values
    const [values, setValues] = useState([]);
    
    // states for uploading csv file
    const [csvFile, setCsvFile] = useState("");
    const [error, setError] = useState("");
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect ( () => {
        if ( parsedData ) {
            console.log("In upload csv");
            console.log(parsedData);
            console.log(JSON.stringify(parsedData));
    
            axios.post(`${apiUrl}/lineup/import-lineups`, parsedData, {
                headers: {
                  'Content-Type': 'application/json', // Set the content type to JSON
                },
                })
                .then((response) => {
                    console.log(response);
                    console.log('Response from server: ' + response.data);
                    //console.log('Festival Lineups uploaded successfully');
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }

    }, [parsedData]);

    const uploadCSV = () => {
        console.log("In upload csv");
        console.log(parsedData);
        console.log(JSON.stringify(parsedData));

        axios.post(`${apiUrl}/lineup/import-lineups`, JSON.stringify(parsedData), {
            headers: {
                'Content-Type': 'application/json',
              },
        })
            .then((response) => {
                console.log(response);
                console.log('Response from server: ' + response.data);
                console.log('Festival Lineups uploaded successfully');
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleParseCSV = () => {
        // if user clicks the parse button without a file we show an error
        if (!csvFile) return setError("Enter a valid file");

        // // Initialize a reader which allows user to read any file or blob
        // const reader = new FileReader();

        // // Event listener on reader when the file loads,
        // // we parse it and set the data
        // reader.onload = async ({ target }) => {
        //     const csv = Papa.parse(target.result, { header: true });
        //     const csvParsedData = csv?.data;
        //     setParsedData(csvParsedData);
        //     const columns = Object.keys(csvParsedData[0]);
        //     console.log(csv);
        //     setTableRows(columns);
        //     console.log(columns);
        //     console.log(parsedData);
        //     console.log(tableRows);
        // };
        // reader.readAsText(csvFile);

        // console.log(reader);

        Papa.parse( csvFile, {
            header: true,
            skipEmptyLines: true,
            complete: function( results ) {
                const rowsArray = [];
                const valuesArray = [];

                // iterating data to get column name and their values
                results.data.map( (d) => {
                    rowsArray.push(Object.keys(d));
                    valuesArray.push(Object.values(d));
                });

                // Parsed data response in array format
                setParsedData(results.data);
                console.log(results.data);
                console.log(parsedData);

                // Filtered Column Names
                setTableRows(rowsArray[0]);

                // Filtered Values
                setValues(valuesArray);
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

    return (
        <div>
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

export default UploadCSV;