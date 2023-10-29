import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/v1',
});
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const api = createApi({
    baseQuery: baseQueryWithRetry,
    tagTypes: ['Users'],
    endpoints: () => ({}),
});

export const enhancedApi = api.enhanceEndpoints({
    endpoints: () => ({
        getPost: () => 'test',
    }),
});
