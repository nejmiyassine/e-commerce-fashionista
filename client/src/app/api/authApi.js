import { api } from './apiRTQ';
import { usersAPI } from './usersApi';

import { logout } from '../../features/users/usersSlice';

export const authApi = api.injectEndpoints({
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query(data) {
                return {
                    url: 'users/login',
                    method: 'POST',
                    body: data,
                    credentials: 'include',
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    await dispatch(
                        usersAPI.endpoints.getMyProfileData.initiate({ data })
                    );
                } catch (error) {
                    /* Empty */
                }
            },
        }),
        logoutUser: builder.mutation({
            query() {
                return {
                    url: 'users/logout',
                    credentials: 'include',
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(logout());
                } catch (error) {
                    /* Empty */
                }
            },
        }),
    }),
});

export const { useLoginUserMutation, useLogoutUserMutation } = authApi;
