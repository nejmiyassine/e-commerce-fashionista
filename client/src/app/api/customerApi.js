import { api } from './apiRTQ';

export const customerAPI = api.injectEndpoints({
    tagTypes: ['Customers'],
    endpoints: (builder) => ({
        getCustomerProfileData: builder.query({
            query() {
                return {
                    url: 'customers/profile',
                    credentials: 'include',
                };
            },
            transformResponse: (result) => result.data.user,
            invalidatesTags: ['Customers'],
        }),
    }),
});

export const { useGetCustomerProfileDataQuery } = customerAPI;
