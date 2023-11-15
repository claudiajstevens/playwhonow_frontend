import axios from 'axios';
const BASE_URL = process.env.REACT_APP_API_URL;

// const BASE_URL = "http://localhost:8080";


export default axios.create({
    baseURL: BASE_URL
    
});


export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true
    
});
