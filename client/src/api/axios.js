import axios from 'axios';
const BASE_URL = import.meta.env.VITE_REACT_APP_BASEURL;

export default axios.create({
    baseURL: `${BASE_URL}/v1`,
});
