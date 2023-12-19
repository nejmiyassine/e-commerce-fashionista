import { api } from './apiRTQ';

export const paymentsAPI = api.injectEndpoints({
    tagTypes: ['Payments'],
    endpoints: (builder) => ({
        getAllPayments: builder.query({
            query: () => ({
                url: 'stripe',
                credentials: 'include',
                method: 'GET',
            }),
            invalidatesTags: [{ type: 'Payments', id: 'LIST' }],
        }),
        getPaymentDetailsById: builder.query({
            query: (id) => ({
                url: `stripe/${id}`,
                credentials: 'include',
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Payments', id }],
        }),
        savePayment: builder.mutation({
            query: (data) => ({
                url: 'stripe/create',
                credentials: 'include',
                body: data,
                method: 'POST',
            }),
            invalidatesTags: [{ type: 'Payments', id: 'LIST' }],
        }),
    }),
});

export const {
    useSavePaymentMutation,
    useGetPaymentDetailsByIdQuery,
    useGetAllPaymentsQuery,
} = paymentsAPI;
