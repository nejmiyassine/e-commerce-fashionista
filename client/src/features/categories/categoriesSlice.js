import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../api/axios";


const initialState = {
    categories: [],
    deletedCategory: null,
    editedCategory: null,
    isLoading: true,
    error: null,
}

//Get All Categories
export const getAllCategories = createAsyncThunk('categories/getAllCategories', async () => {
    const response = await axios.get('v1/categories');
    console.log(response.data);
    return response.data.data;
})

//Edit Category
export const editCategory = createAsyncThunk('categories/editCategory', async ({ id, name }) => {
    const response = await axios.put(`v1/categories/${id}`, { name });
    console.log(response.data);
    return response.data.data;
})

// Delete Categories Slice
export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id) => {
    const response = await axios.delete(`v1/categories/${id}`);
    console.log(response.data);
    return response.data.data;
})

// Post Categories Slice
export const createCategory = createAsyncThunk('categories/createCategory', async (name) => {
    try {
        const response = await axios.post('v1/categories', { name });
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
});



export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.isLoading = true;
                state.categories = [];
                state.error = null;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;

                state.error = null;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.categories = [];
                state.error = action.error;
            })
            // Edit Categories
            .addCase(editCategory.pending, (state) => {
                state.isLoading = true;
                state.editedCategory = null;
                state.error = null;
            })
            .addCase(editCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.editedCategory = action.payload;
                state.error = null;
            })
            .addCase(editCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.editedCategory = null;
                state.error = action.error;
            })
            // Delete Categories
            .addCase(deleteCategory.pending, (state) => {
                state.isLoading = true;
                state.deletedCategory = null;
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deletedCategory = action.payload;
                state.error = null;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.deletedCategory = null;
                state.error = action.error;
            })
            // Create Category
            .addCase(createCategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories.push(action.payload); // Add the new category to the state
                state.error = null;
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })
    },
});

export default categoriesSlice.reducer;
