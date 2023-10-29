import { api } from './api';

export const usersApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => 'users',
            providesTags: (result = []) => [
                ...result.map(({ id }) => ({ type: 'Users', id })),
                { type: 'Users', id: 'LIST' },
            ],
        }),
        getUserById: build.query({
            query: (id) => `users/${id}`,
            providesTags: (_post, _err, id) => [{ type: 'Users', id }],
        }),
    }),
});

export const { useGetUserByIdQuery, useGetUsersQuery } = usersApi;
