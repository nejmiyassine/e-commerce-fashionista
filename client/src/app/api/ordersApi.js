import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import NProgress from 'nprogress';

export const ordersAPI = createApi({
    reducerPath: 'ordersAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_REACT_APP_BASEURL,
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => 'orders',
            onQueryStarted() {
                NProgress.start();
            },
        }),
    }),
});

export const { useGetAllOrdersQuery } = ordersAPI;
