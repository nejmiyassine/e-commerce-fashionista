import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../app/api/api';

export const fetchFavorites = createAsyncThunk(
    'favorites/fetchFavorites',
    async (_, { rejectWithValue }) => {
        try {
            console.log('dsdfdssds')
            const res = await API.get('/favorites');
            console.log('favorites from axios', res.data);
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

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorites: (state, action) => {
            state.push(action.payload);
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchFavorites.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = '';
                console.log('fetchFavorites' , state.data)
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message
            });
    },
});

export const { addFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
