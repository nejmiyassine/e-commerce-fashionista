import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../app/api/api';

export const getCustomerProfile = createAsyncThunk(
    'fCustomer/getCustomerProfile',
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get('customers/profile', {
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            rejectWithValue(error.res.data);
        }
    }
);

export const patchCustomerData = createAsyncThunk(
    'fCustomer/patchCustomerData',
    async ({ customerId, patchedCustomerData }, { rejectWithValue }) => {
        try {
            const res = await API.patch(
                `customers/${customerId}`,

                patchedCustomerData,
                {
                    withCredentials: true,
                }
            );
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
            // eslint-disable-next-line no-unused-vars
            const res = await API.get('customers/logout');
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
                state.isLoading = true;
            })
            //
            .addCase(getCustomerProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.customerData = action.payload;
            })
            //
            .addCase(getCustomerProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.err = action.error.message;
            })

            //patchCustomerData
            .addCase(patchCustomerData.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(patchCustomerData.fulfilled, (state, action) => {
                state.isLoading = false;
                const {
                    // eslint-disable-next-line no-unused-vars
                    arg: { customerId },
                } = action.meta;

                state.err = '';
            })

            .addCase(patchCustomerData.rejected, (state, action) => {
                state.isLoading = false;
                state.customerData = action.error.message;
            })

            //logout customer
            .addCase(logOutCustomer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logOutCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.customerData = action.data;
            })
            .addCase(logOutCustomer.rejected, (state, action) => {
                state.customerData = action.error.message;
            });
    },
});

export default frontCustomersSlice.reducer;
