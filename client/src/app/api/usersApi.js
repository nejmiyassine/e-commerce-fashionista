import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import NProgress from 'nprogress';

export const usersAPI = createApi({
    reducerPath: 'usersAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_REACT_APP_BASEURL,
    }),
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => 'users',
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
            query: (id) => {
                return {
                    url: `users/${id}`,
                    credentials: 'include',
                };
            },
            providesTags: (result, error, id) => [{ type: 'Users', id }],
        }),
        addUser: builder.mutation({
            query: (userData) => ({
                url: 'users',
                method: 'POST',
                body: userData,
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
            }),
            onQueryStarted() {
                NProgress.start();
            },
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `users/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
            onQueryStarted() {
                NProgress.start();
            },
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetUserByIdQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersAPI;
