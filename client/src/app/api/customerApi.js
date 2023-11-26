import NProgress from 'nprogress';

import { api } from './apiRTQ';
import { setCustomer } from '../../features/customers/customersSlice';

export const customerAPI = api.injectEndpoints({
    tagTypes: ['Customers'],
    endpoints: (builder) => ({
        getAllCustomers: builder.query({
            query: () => ({
                url: 'customers',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'Customers',
                              id,
                          })),
                          { type: 'Customers', id: 'LIST' },
                      ]
                    : [{ type: 'Customers', id: 'LIST' }],
            onQueryStarted() {
                NProgress.start();
            },
        }),
        getCustomerProfileData: builder.query({
            query() {
                return {
                    url: 'customers/profile',
                    credentials: 'include',
                };
            },
            transformResponse: (result) => result.data.user,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data: user } = await queryFulfilled;
                    const { data } = await args;

                    dispatch(
                        setCustomer({
                            customer: user,
                            access_token: data.access_token,
                        })
                    );
                } catch (error) {
                    /* Empty */
                }
            },
        }),
    }),
});

export const { useGetCustomerProfileDataQuery, useGetAllCustomersQuery } =
    customerAPI;
