import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../app/api/api';

//GetAllcustomersByTheUser
export const fetchCustomers = createAsyncThunk(
    'customers/fetchCustomers',
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get('customers', {
                withCredentials: true,
            });
            console.log('data from axios', res.data);
            return res.data;
        } catch (error) {
            rejectWithValue(error.res.data);
        }
    }
);

//customerByIdAllowedByTheUser
export const customersById = createAsyncThunk(
    'customers/customersById',
    async (customerId, { rejectWithValue }) => {
        try {
            const res = await API.get(`customers/${customerId}`, {
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            rejectWithValue(error.res.data);
        }
    }
);

//UpdateCustomerByTheUser
export const updateCustomer = createAsyncThunk(
    'customers/updateCustomer',
    async ({ customerId, updatedCustomerData }, { rejectWithValue }) => {
        try {
            const res = await API.put(
                `customers/${customerId}`,
                updatedCustomerData,
                {
                    withCredentials: true,
                }
            );

            console.log('updated customer from customerSlice', res.data);
            return res.data;
        } catch (error) {
            rejectWithValue(error.res.data);
        }
    }
);

//deleteCustomerByTheUser
export const deleteCustomer = createAsyncThunk(
    'customers/deleteCustomer',
    async ({ customerId }, { rejectWithValue }) => {
        try {
            const res = await API.delete(`customers/${customerId}`, {
                withCredentials: true,
            });
            console.log('delete from slice', res.data);
            return res.data;
        } catch (error) {
            rejectWithValue(error.res.data);
        }
    }
);

//GetCustomerProfileByTheCustomer
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

//patchCustomerProfile
export const patchCustomerData = createAsyncThunk(
    'fCustomer/patchCustomerData',
    async ({ customerId, patchedCustomerData }, { rejectWithValue }) => {
        try {
            console.log('id from fron customerSlice', customerId);
            const res = await API.patch(
                `customers/${customerId}`,

                patchedCustomerData,
                {
                    withCredentials: true,
                }
            );
            console.log('res', res.data);
            return res.data;
        } catch (error) {
            rejectWithValue(error.res.data);
        }
    }
);

//logoutCustomer
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
    data: [],
    err: '',
    customer: null,
    access_token: '',
};

const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        setCustomer: (state, action) => {
            console.log(action.payload);
            state.customer = action.payload.user;
            state.access_token = action.payload.access_token;
        },
        logout: () => {
            ({ ...initialState, customer: null, access_token: '' });
            console.log('islogout');
        },
    },
    extraReducers: (builder) => {
        builder

            //all customers
            .addCase(fetchCustomers.pending, (state) => {
                state.isLoading = true;
                state.data = [];
                state.err = '';
                console.log('pending');
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.err = '';
                console.log('fetch customers', state.data);
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.isLoading = false;
                state.state.err = action.error.message;
            })

            // customers by id
            .addCase(customersById.pending, (state) => {
                state.isLoading = true;
                console.log('pending');
            })
            .addCase(customersById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                console.log('payload', state.data);
                state.err = '';
                console.log('fulfilled');
            })
            .addCase(customersById.rejected, (state, action) => {
                state.isLoading = false;
                state.err = action.error.message;
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
                state.err = '';
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                state.isLoading = false;
                state.err = action.error.message;
                console.log('rejected');
            })

            //delete Customer
            .addCase(deleteCustomer.pending, (state) => {
                state.isLoading = true;
                console.log('pending');
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
                const {
                    arg: { customerId },
                } = action.meta;
                console.log('action.meta', action.meta);
                if (customerId) {
                    state.data = state.data.filter(
                        (customer) => customer._id !== customerId
                    );
                    console.log('state.data', state.data);
                }

                state.err = '';
                console.log('fulfilled');
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                state.isLoading = false;
                state.err = action.error.message;
                console.log('rejected');
            })

            //GetCustomerProfileByTheCustomer
            .addCase(getCustomerProfile.pending, (state) => {
                state.isLoading = true;
                console.log('pending');
            })
            .addCase(getCustomerProfile.fulfilled, (state, action) => {
                console.log('stats');
                state.isLoading = false;
                state.data = action.payload;
                console.log('payload', state.data);
                console.log('fulfilled');
            })
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
                state.data = action.error.message;
                console.log('rejected');
            })

            //logout customer
            .addCase(logOutCustomer.pending, (state) => {
                state.isLoading = true;
                console.log('pending');
            })
            .addCase(logOutCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.data;
                console.log('fulfillled');
            })
            .addCase(logOutCustomer.rejected, (state, action) => {
                state.err = action.error.message;
                console.log('rejected');
            });
    },
});

export const { setCustomer, logout } = customersSlice.actions;

export default customersSlice.reducer;
