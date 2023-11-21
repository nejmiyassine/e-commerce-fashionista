import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_REACT_APP_BASEURL;

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const api = createApi({
    // reducerPath: 'ecommerce-arkx-api',
    baseQuery: baseQueryWithRetry,
    tagTypes: ['Users', 'Auth', 'Orders'],
    endpoints: () => ({}),
});
