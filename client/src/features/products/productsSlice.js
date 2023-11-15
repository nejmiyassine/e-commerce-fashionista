import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from "../../api/axios";/
import axios from '../../api/axios';
const initialState = {
    products: [],
    deletedProduct: null,
    editedProduct: null,
    isLoading: true,
    error: null,
}

// Get All Products
export const getAllProducts = createAsyncThunk('products/getAllProducts', async () => {
    try {
        const response = await axios.get('v1/products');
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
});

// Edit Product
export const editProduct = createAsyncThunk('products/editProduct', async ({ id, data }) => {
    try {
        const response = await axios.put(`v1/products/${id}`, data);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
});

// Delete Product
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
    try {
        const response = await axios.delete(`v1/products/${id}`);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
});

// Create Product
export const createProduct = createAsyncThunk('products/createProduct', async (productData) => {
    try {
        const response = await axios.post('v1/products', productData);
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
});

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
                state.products = [];
                state.error = null;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
                state.error = null;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.products = [];
                state.error = action.error;
            })
            .addCase(editProduct.pending, (state) => {
                state.isLoading = true;
                state.editedProduct = null;
                state.error = null;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.editedProduct = action.payload;
                state.error = null;
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.editedProduct = null;
                state.error = action.error;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
                state.deletedProduct = null;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deletedProduct = action.payload;
                state.error = null;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.deletedProduct = null;
                state.error = action.error;
            })
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products.push(action.payload);
                state.error = null;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });
    },
});

export default productsSlice.reducer;
