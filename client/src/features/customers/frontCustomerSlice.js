import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../app/api/api';

export const getCustomerProfile = createAsyncThunk(
    'customers/getCustomerProfile',
    async (customerId, { rejectWithValue }) => {
        try {
            const res = await API.get(`customers/profile/${customerId}`, {
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            rejectWithValue(error.res.data);
        }
    }
);

const initialState = {
    isLoading: false,
    customer: [],
    error: '',
};

const frontCustomersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            //customer Profile
            .addCase(getCustomerProfile.pending, (state) => {
                state.isLoading = true;
                console.log('pending');
            })
            //
            .addCase(getCustomerProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                console.log('payload', state.data);
                state.error = '';
                console.log('fulfilled');
            })
            //
            .addCase(getCustomerProfile.rejected, (state, action) => {
                state.isLoading = false;
                console.log('rejected');
                state.error = action.error.message;
            });
    },
});

export default frontCustomersSlice.reducer;
