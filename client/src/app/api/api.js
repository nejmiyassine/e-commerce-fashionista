import axios from 'axios';
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const API = axios.create({
    baseURL: `${BASE_URL}/v1`,
    headers: { 'Content-Type': 'application/json' },
});

export default API;
