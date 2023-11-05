import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../app/api/api';
// import axios from 'axios';

export const getAllUsers = createAsyncThunk(
    'users/getAllUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get('/users');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const addUser = createAsyncThunk(
    'users/addUser',
    async (userData, { rejectWithValue }) => {
        console.log('userData: ', userData);

        try {
            const response = await API.post('/users', userData);
            // toast.success('User Added Successfully');
            console.log('response: ', response);
            return response.data;
        } catch (error) {
            console.error(error.response.data);
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async ({ userId, updatedUser }, { rejectWithValue }) => {
        try {
            const response = await API.put(`/users/${userId}`, updatedUser);
            // toast.success('User Added Successfully');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await API.delete(`/users/${userId}`);
            // toast.success('User Added Successfully');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    isLoading: true,
    users: [],
    error: null,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
                state.users = [];
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
                state.error = null;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.users = [];
                state.error = action.payload;
            })
            // Add User
            .addCase(addUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
                state.error = null;
            })
            .addCase(addUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Update User
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false;
                const {
                    arg: { userId },
                } = action.meta;
                if (userId) {
                    state.users = state.users.map((user) =>
                        user._id === userId ? action.payload : user
                    );
                }
                state.error = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Delete User
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                const {
                    arg: { userId },
                } = action.meta;
                console.log('action.meta', action.meta);
                if (userId) {
                    state.users = state.users.filter(
                        (user) => user._id !== userId
                    );
                }
                state.error = null;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default usersSlice.reducer;
