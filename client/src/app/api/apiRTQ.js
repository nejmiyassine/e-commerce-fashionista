import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_REACT_APP_BASEURL;

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
});

export const api = createApi({
    // reducerPath: 'ecommerce-arkx-api',
    baseQuery,
    tagTypes: ['Users', 'Auth', 'Orders', 'Customers'],
    endpoints: () => ({}),
});
