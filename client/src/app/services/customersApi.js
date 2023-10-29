import { api } from './api';

export const customersApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCustomers: build.query({
            query: () => 'customers',
            providesTags: (result = []) => [
                ...result.map(({ id }) => ({ type: 'Customers', id })),
                { type: 'Customers', id: 'LIST' },
            ],
        }),
        getCustomerById: build.query({
            query: (id) => `customers/${id}`,
            providesTags: (_post, _err, id) => [{ type: 'Customers', id }],
        }),
    }),
});

export const { useGetCustomerByIdQuery, useGetCustomersQuery } = customersApi;
