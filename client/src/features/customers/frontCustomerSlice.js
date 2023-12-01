import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../app/api/api';

export const getCustomerProfile = createAsyncThunk(
    'fCustomer/getCustomerProfile',
    async (customerId, { rejectWithValue }) => {
        try {
            const res = await API.get(`customers/profile/${customerId}` , {
                withCredentials : true,
                
            }
            );
            console.log('res' , res )
            return res.data;
        } catch (error) {
            rejectWithValue(error.res.data);
        }
    }
);

export const patchCustomerData = createAsyncThunk(
    'fCustomer/patcheCustomerData',
 async({customerId , patchedCustomerData}, {rejectWithValue}) => {
    try {
         const res = API.patch(`customers/${customerId}` , patchedCustomerData , {
            withCredentials : true,
         })
         console.log('res' , res)
         return res.data
    } catch(error) {
        rejectWithValue(error.res.data);
    }
})

const initialState = {
    isLoading: false,
    data: [],
    error: '',
};

const frontCustomersSlice = createSlice({
    name: 'fCustomer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            //customer Profile
            .addCase(getCustomerProfile.pending, (state) => {
                console.log('sfdfaf')
                state.isLoading = true;
                console.log('pending');
            })
            //
            .addCase(getCustomerProfile.fulfilled, (state, action) => {
                console.log('stats')
                state.isLoading = false;
                state.data = action.payload;
                console.log('payload', state.data);
                console.log('fulfilled');
            })
            //
            .addCase(getCustomerProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                console.log('rejected');
            })

            //patchCustomerData
            .addCase(patchCustomerData.pending ,(state) => {
                state.isLoading = true;
                console.log('pending')
            })

            .addCase(patchCustomerData.fulfilled , (state, action) => {
                state.isLoading = false;
                const {
                    arg: { customerId },
                } = action.meta;
                console.log('action.meta', action.meta);

            
            })

            .addCase(patchCustomerData.rejected , (state , action) => {
                isLoading = false;
                state.data = action.error.message;
                console.log('rejected')
            })
    },
});

export default frontCustomersSlice.reducer;
