import axios from 'axios';
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

export default axios.create({
    baseURL: `${BASE_URL}/v1`,
});
