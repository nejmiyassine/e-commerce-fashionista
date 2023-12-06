import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../app/api/api';

export const getCustomerProfile = createAsyncThunk(
    'fCustomer/getCustomerProfile',
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get('customers/profile', {
                withCredentials: true,
            });
            console.log('res', res);
            return res.data;
        } catch (error) {
            rejectWithValue(error.res.data);
        }
    }
);

export const patchCustomerData = createAsyncThunk(
    'fCustomer/patchCustomerData',
    async ({customerId , patchedCustomerData }, { rejectWithValue }) => {
        try {
            console.log('id from fron customerSlice'  ,customerId)
            const res = await API.patch(
                `customers/${customerId}`,
                
                patchedCustomerData,
                {
                    withCredentials: true,
                }
            );
            console.log('res' , res.data);
            return res.data;
        } catch (error) {
            rejectWithValue(error.res.data);
        }
    }
);

export const logOutCustomer = createAsyncThunk(
    'fCustomer/logOutCustomer',
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get('customers/logout');
            console.log('data of logout', res);
        } catch (error) {
            rejectWithValue(error.res.data);
        }
    }
);

const initialState = {
    isLoading: false,
    customerData: [],
    err: '',
};

const frontCustomersSlice = createSlice({
    name: 'fCustomer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            //customer Profile
            .addCase(getCustomerProfile.pending, (state) => {
                console.log('sfdfaf');
                state.isLoading = true;
                console.log('pending');
            })
            //
            .addCase(getCustomerProfile.fulfilled, (state, action) => {
                console.log('stats');
                state.isLoading = false;
                state.customerData = action.payload;
                console.log('payload', state.customerData);
                console.log('fulfilled');
            })
            //
            .addCase(getCustomerProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.err = action.error.message;
                console.log('rejected');
            })

            //patchCustomerData
            .addCase(patchCustomerData.pending, (state) => {
                state.isLoading = true;
                console.log('pending');
            })

            .addCase(patchCustomerData.fulfilled, (state, action) => {
                state.isLoading = false;
                const {
                    arg: { customerId },
                } = action.meta;
                console.log('action.meta', action.meta);

             
                state.err = '';
            })

            .addCase(patchCustomerData.rejected, (state, action) => {
                state.isLoading = false;
                state.customerData = action.error.message;
                console.log('rejected');
            })

            //logout customer
            .addCase(logOutCustomer.pending, (state) => {
                state.isLoading = true;
                console.log('pending');
            })
            .addCase(logOutCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.customerData = action.data;
                console.log('fulfillled');
            })
            .addCase(logOutCustomer.rejected, (state, action) => {
                state.customerData = action.error.message;
                console.log('rejected');
            });
    },
});

export default frontCustomersSlice.reducer;
