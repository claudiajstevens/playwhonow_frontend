import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone'
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const FileUpload = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadedFile, setUploadedFile] = useState();
    const axiosPrivate = useAxiosPrivate();

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: async (acceptedFiles) => {
            setUploadedFiles(acceptedFiles);

            try {

                // Create FormData object
                const formData = new FormData();

                // Append each file to the FormData object
                acceptedFiles.forEach( (file) => {
                    formData.append('file', file);
                });

                const response = await axiosPrivate.post('/api/upload-image/s3', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log(response);
                console.log('Response from server: ' + response.data);
            } catch (error) {
                console.error("Error:", error);
            }
            
        },
    });

    // const { getRootProps, getInputProps } = useDropzone({
    //     onDrop: (acceptedFiles) => {
    //         // setUploadedFiles(acceptedFiles);
    //         setUploadedFiles(acceptedFiles);

    //         // call your backend
    //         axiosPrivate.post('/api/upload-image/s3', uploadedFiles, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         })
    //             .then((response) => {
    //                 console.log(response);
    //                 console.log('Response from server: ' + response.data);
    //             })
    //             .catch((error) => {
    //                 console.error("Error:", error);
    //             });
            
    //     },
    // });

    //TO DO : Customize and Style this drag and drop to upload box as you want
    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop files here or click to browse.</p>
            <ul>
                {uploadedFiles.map((file) => (
                    <li key={file.name}>{file.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default FileUpload;
