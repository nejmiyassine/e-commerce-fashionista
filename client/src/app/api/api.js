import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_BASEURL,
    headers: { 'Content-Type': 'application/json' },
});

export default API;
