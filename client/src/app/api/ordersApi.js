import NProgress from 'nprogress';

import { api } from './apiRTQ';

export const ordersAPI = api.injectEndpoints({
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => ({
                url: 'orders',
                credentials: 'include',
                method: 'GET',
            }),
            onQueryStarted() {
                NProgress.start();
            },
        }),
    }),
});

export const { useGetAllOrdersQuery } = ordersAPI;
