import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import API from '../../app/api/api';


export const getCustomersOrders = createAsyncThunk('orders/getCustomersOrders',
 ()=> {

})

const initialState = {
    loading: false,
    name:'ordersData',
    error:'',

}
const ordersSlice = createAsyncThunk({
    name:'orders',
    initialState,
    reducers:{},
    extraReducers:
        builder => {
            builder
            .addCase(getCustomersOrders.pending, (state) => {

            })
            .addCase(getCustomersOrders.fulfilled , (state , action)=> {

            })
            .addCase(getCustomersOrders.rejected , (state,action)=> {

            })
        }
    
})