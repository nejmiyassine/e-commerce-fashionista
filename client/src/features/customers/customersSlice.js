import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const initialState = {
    loading: false,
    data: [],
    // details: [],
    error: '',
};

//all customers
export const fetchCustomers = createAsyncThunk(
    'customers/fetchCustomers',
    async () => {
        const res = await axios.get('http://localhost:8000/v1/customers');
        console.log('data from axios', res.data);
        return res.data;
    }
);

console.log('log', initialState.data);

//const ID =req.params.id

//customerById
export const customersById = createAsyncThunk(
    'customers/customersById',
    async (id) => {
        try {
          
            const res = await axios.get(
                `http://localhost:8000/v1/customers/${id}`
            );
            console.log('customer details from axios', res.data);
            return res.data;
        } catch (error) {
            console.log('error', error.message);
        }
    }
);

//UpdateCustomer
export const updateCustomer = createAsyncThunk(
    'customers/updateCustomer',
    async (id) => {
        try {
            const res = await axios.put(
                `http://localhost:8000/v1/customers/${id}`
            );
            console.log('update customer', res.data);
            return res.data;
        } catch (error) {
            console.log('error', error.message);
        }
    }
);

//delete Customer
export const deleteCustomer = createAsyncThunk(
    'customers/deleteCustomer',
    async (id) => {
        try {
            const res = await axios.delete(
                `http://localhost:8000/v1/customers/${id}`
            );
            console.log('delete from slice', res.data);
            return res.data;
        } catch (error) {
            console.log('error', error.message);
        }
    }
);

const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            //all customers
            .addCase(fetchCustomers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.error = '';
                console.log('f customers', state.data);
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // customers by id
            .addCase(customersById.pending, (state) => {
                state.loading = true;
                console.log('pending');
            })
            //
            .addCase(customersById.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                console.log('payload', state.data);
                state.error = '';
                console.log('fulfilled');
            })
            //
            .addCase(customersById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                console.log('rejected');
            })

            //update Customer
            .addCase(updateCustomer.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                state.loading = false;
                // state.data = action.payload
                if (id) {
                    state.customers = state.customers.map((customer) =>
                        customer._id === id ? action.payload : customer
                    );
                }
                state.error = null;
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                console.log('rejected');
            })

            //delete Customer
            .addCase(deleteCustomer.pending, (state) => {
                state.loading = true;
                console.log('pending');
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.loading = false;
                 state.action = action.payload;
                console.log('action.payload', action.payload);
                if (id) {
                    state.customers = state.customers.filter(
                        (customer) => customer._id !== id
                    );
                }
                state.error = '';
                console.log('fulfilled');
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                console.log('rejected');
            });
    },
});

export default customersSlice.reducer;
