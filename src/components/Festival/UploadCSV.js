import React, { useState } from 'react';
import axios from 'axios';

const UploadCSV = () => {
    const [csvFile, setCsvFile] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleUpload = () => {
        if (csvFile) {
            const formData = new FormData();
            formData.append('csvFile', csvFile);

            axios.post(`${apiUrl}/festivals/import-festivals`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => {
                    console.log(response);
                    console.log('Response from server: ' + response.data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    };

    const handleFileChange = event => {
        setCsvFile(event.target.files[0]);
    };

    return (
        <div>
            <input
                type="file"
                accept='.csv'
                onChange={handleFileChange} />
            <button
                onClick={handleUpload}>Import Festivals</button>
        </div>
    );
};

export default UploadCSV;