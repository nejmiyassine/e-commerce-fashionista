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

export const deleteCustomersorders = createAsyncThunk(
    'orders/deleteCustomersOrders',
    async ({ordersId}, { rejectWithvalue }) => {
        try {
            const res = await API.delete(`/orders/${ordersId}`, 
            { withCredentials: true });
            console.log('res' , res.data)
            return res.data
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

            .addCase(deleteCustomersorders.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCustomersorders.fulfilled, (state, action) => {
                state.loading = false;
                console.log('arg')
                const {
                    arg: { ordersId },
                } = action.meta;

                if (ordersId) {
                    state.ordersData = state.ordersData.filter(
                        (order) => (order._id = ordersId)
                    );
                }
            })
            .addCase(deleteCustomersorders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                
            });
    },
});

export default ordersSlice.reducer;
