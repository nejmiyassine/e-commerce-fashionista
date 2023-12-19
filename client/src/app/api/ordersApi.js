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
        createOrders: builder.mutation({
            query: (data) => ({
                url: 'orders',
                credentials: 'include',
                body: data,
                method: 'POST',
            }),
            invalidatesTags: () => [{ type: 'Orders', id: 'LIST' }],
        }),
        getOrderById: builder.query({
            query: (id) => ({
                url: `orders/${id}`,
                credentials: 'include',
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Oders', id }],
        }),
        getCustomersOrders: builder.query({
            query: () => ({
                url: '/orders/customer/order',
                credentials: 'include',
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Oders', id }],
        }),
    }),
});

export const {
    useGetAllOrdersQuery,
    useCreateOrdersMutation,
    useGetOrderByIdQuery,
    useGetCustomersOrdersQuery,
} = ordersAPI;
