import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../api/axios";

const initialState = {
    subcategories: [],
    deletedSubcategory: null,
    editedSubcategory: null,
    isLoading: true,
    error: null,
}

// Get All Subcategories
export const getAllSubcategories = createAsyncThunk('subcategories/getAllSubcategories', async () => {
    const response = await axios.get('v1/subcategories');
    console.log(response.data);
    return response.data.data;
})

// Edit Subcategory
export const editSubcategory = createAsyncThunk('subcategories/editSubcategory', async ({ id, name }) => {
    const response = await axios.put(`v1/subcategories/${id}`, { name });
    console.log(response.data);
    return response.data.data;
})

// Delete Subcategory Slice
export const deleteSubcategory = createAsyncThunk('subcategories/deleteSubcategory', async (id) => {
    const response = await axios.delete(`v1/subcategories/${id}`);
    console.log(response.data);
    return response.data.data;
})

// Post Subcategory Slice
export const createSubcategory = createAsyncThunk('subcategories/createSubcategory', async (name) => {
    try {
        const response = await axios.post('v1/subcategories', { name });
        console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw error;
    }
});

export const subcategoriesSlice = createSlice({
    name: 'subcategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllSubcategories.pending, (state) => {
                state.isLoading = true;
                state.subcategories = [];
                state.error = null;
            })
            .addCase(getAllSubcategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.subcategories = action.payload;
                state.error = null;
            })
            .addCase(getAllSubcategories.rejected, (state, action) => {
                state.isLoading = false;
                state.subcategories = [];
                state.error = action.error;
            })
            // Edit Subcategories
            .addCase(editSubcategory.pending, (state) => {
                state.isLoading = true;
                state.editedSubcategory = null;
                state.error = null;
            })
            .addCase(editSubcategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.editedSubcategory = action.payload;
                state.error = null;
            })
            .addCase(editSubcategory.rejected, (state, action) => {
                state.isLoading = false;
                state.editedSubcategory = null;
                state.error = action.error;
            })
            // Delete Subcategories
            .addCase(deleteSubcategory.pending, (state) => {
                state.isLoading = true;
                state.deletedSubcategory = null;
                state.error = null;
            })
            .addCase(deleteSubcategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.deletedSubcategory = action.payload;
                state.error = null;
            })
            .addCase(deleteSubcategory.rejected, (state, action) => {
                state.isLoading = false;
                state.deletedSubcategory = null;
                state.error = action.error;
            })
            // Create Subcategory
            .addCase(createSubcategory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createSubcategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.subcategories.push(action.payload); // Add the new subcategory to the state
                state.error = null;
            })
            .addCase(createSubcategory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            })
    },
});

export default subcategoriesSlice.reducer;
