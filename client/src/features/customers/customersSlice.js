import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import API from '../../app/api/api';

//all customers
export const fetchCustomers = createAsyncThunk(
    'customers/fetchCustomers',
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get('/customers');
            console.log('data from axios', res.data);
            return res.data;
        } catch (error) {
            rejectWithValue(error.res.data);
        }
    }
);

//customerById
export const customersById = createAsyncThunk(
    'customers/customersById',
    async (customerId, { rejectWithValue }) => {
        try {
            const res = await API.get(`/customers/${customerId}`);

            console.log('customer details from axios', res.data);
            return res.data;
        } catch (error) {
            rejectWithValue(error.res.data);
        }
    }
);

//UpdateCustomer
export const updateCustomer = createAsyncThunk(
    'customers/updateCustomer',
    async ({ customerId, updatedCustomerData }, { rejectWithValue }) => {
        try {
            const res = await API.put(
                `customers/${customerId}`,
                updatedCustomerData
            );

            console.log('updated customer', res.data);
            return res.data;
        } catch (error) {
            rejectWithValue(error.res.data);
        }
    }
);

//delete Customer
export const deleteCustomer = createAsyncThunk(
    'customers/deleteCustomer',
    async ({ customerId, deletedCustomer }, { rejectWithValue }) => {
        try {
            const res = await API.delete(`customers/${customerId}`, deletedCustomer);

            console.log('delete from slice', res.data);
            return res.data;
        } catch (error) {
            rejectWithValue(error.res.data);
        }
    }
);

const initialState = {
    isLoading: false,
    data: [],
    error: '',
};

const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            //all customers
            .addCase(fetchCustomers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = '';
                console.log('fetch customers', state.data);
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // customers by id
            .addCase(customersById.pending, (state) => {
                state.isLoading = true;
                console.log('pending');
            })
            //
            .addCase(customersById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                console.log('payload', state.data);
                state.error = '';
                console.log('fulfilled');
            })
            //
            .addCase(customersById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                console.log('rejected');
            })

            //update Customer
            .addCase(updateCustomer.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(updateCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
                const {
                    arg: { customerId },
                } = action.meta;
                console.log('action.meta', action.meta);

                if (customerId) {
                    state.data = state.data?.map((customer) =>
                        customer._id === customerId ? action.payload : customer
                    );
                }
                state.error = '';
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                console.log('rejected');
            })

            //delete Customer
            .addCase(deleteCustomer.pending, (state) => {
                state.isLoading = true;
                console.log('pending');
            });

        builder
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.isLoading = false;

                const {
                    arg: { customerId },
                } = action.meta;
                console.log('action.meta', action.meta);

                if (customerId) {
                    state.isLoading = false;
                    state.data = state.data.filter(
                        (customer) => customer._id !== customerId
                    );
                    console.log('state.data', state.data);
                }

                state.error = '';
                console.log('fulfilled');
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                console.log('rejected');
            });
    },
});

export default customersSlice.reducer;
