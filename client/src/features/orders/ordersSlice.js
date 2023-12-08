import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../app/api/api';

export const getCustomersOrders = createAsyncThunk(
    'orders/getCustomersOrders',

    async (_, { rejectWithvalue }) => {
        try {
            const res = await API.get('/orders', { withCredentials: true });
            console.log('response', res.data);
            return res.data;
        } catch (error) {
            rejectWithvalue(error.res.data);
        }
    }
);


const initialState = {
    loading: false,
    ordersData: [],
    error: '',
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getCustomersOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCustomersOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.ordersData = action.payload;
                console.log('state' , state.ordersData )
            })
            .addCase(getCustomersOrders.rejected, (state, action) => {
                state.loading = false;
                state.ordersData = action.error.message;
            })

     
    },
});

export default ordersSlice.reducer;
