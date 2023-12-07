import NProgress from 'nprogress';

import { api } from './apiRTQ';
import { setUser } from '../../features/users/usersSlice';

export const usersAPI = api.injectEndpoints({
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getMyProfileData: builder.query({
            query() {
                return {
                    url: 'users/profile',
                    credentials: 'include',
                };
            },
            transformResponse: (result) => result.data.user,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data: user } = await queryFulfilled;
                    const { data } = await args;
                    console.log(user);
                    console.log(data);

                    dispatch(
                        setUser({ user: user, access_token: data.access_token })
                    );
                } catch (error) {
                    /* Empty */
                }
            },
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: 'users',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'Users',
                              id,
                          })),
                          { type: 'Users', id: 'LIST' },
                      ]
                    : [{ type: 'Users', id: 'LIST' }],
            onQueryStarted() {
                NProgress.start();
            },
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `users/${id}`,
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: (result, error, id) => [{ type: 'Users', id }],
        }),
        addUser: builder.mutation({
            query: (userData) => ({
                url: 'users',
                method: 'POST',
                body: userData,
                credentials: 'include',
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
            onQueryStarted() {
                NProgress.start();
            },
        }),
        updateUser: builder.mutation({
            query: ({ userId, updatedUser }) => ({
                url: `users/${userId}`,
                method: 'PUT',
                body: updatedUser,
                credentials: 'include',
            }),
            invalidatesTags: (result, error, { id }) =>
                result
                    ? [
                          { type: 'Users', id },
                          { type: 'Users', id: 'LIST' },
                      ]
                    : [{ type: 'Users', id: 'LIST' }],
            onQueryStarted() {
                NProgress.start();
            },
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `users/${userId}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
            onQueryStarted() {
                NProgress.start();
            },
        }),
    }),
});

export const {
    useGetMyProfileDataQuery,
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersAPI;
