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

//logoutCustomer
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
            state.customer = action.payload.user;
            state.access_token = action.payload.access_token;
        },
        logout: () => {
            ({ ...initialState, customer: null, access_token: '' });
        },
    },
    extraReducers: (builder) => {
        builder

            //all customers
            .addCase(fetchCustomers.pending, (state) => {
                state.isLoading = true;
                state.data = [];
                state.err = '';
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.err = '';
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.isLoading = false;
                state.state.err = action.error.message;
            })

            // customers by id
            .addCase(customersById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(customersById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.err = '';
            })
            .addCase(customersById.rejected, (state, action) => {
                state.isLoading = false;
                state.err = action.error.message;
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
            })

            //delete Customer
            .addCase(deleteCustomer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
                const {
                    arg: { customerId },
                } = action.meta;
                if (customerId) {
                    state.data = state.data.filter(
                        (customer) => customer._id !== customerId
                    );
                }

                state.err = '';
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                state.isLoading = false;
                state.err = action.error.message;
            })

            //GetCustomerProfileByTheCustomer
            .addCase(getCustomerProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCustomerProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getCustomerProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.err = action.error.message;
            })

            //patchCustomerData
            .addCase(patchCustomerData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(patchCustomerData.fulfilled, (state) => {
                state.isLoading = false;
                state.err = '';
            })
            .addCase(patchCustomerData.rejected, (state, action) => {
                state.isLoading = false;
                state.data = action.error.message;
            })

            //logout customer
            .addCase(logOutCustomer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logOutCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.data;
            })
            .addCase(logOutCustomer.rejected, (state, action) => {
                state.err = action.error.message;
            });
    },
});

export const { setCustomer, logout } = customersSlice.actions;

export default customersSlice.reducer;
