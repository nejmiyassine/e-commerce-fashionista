import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../../app/api/api';

export const fetchFavorites = createAsyncThunk(
    'favorites/fetchFavorites',
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get('/favorites', { withCredentials: true });
            console.log('favorites from axios', res.data);
            return res.data;
        } catch (error) {
            rejectWithValue(error.res.data);
        }
    }
);


export const getFavoritesById = createAsyncThunk(
    'favorites/getFavoritesById' ,
    async ({rejectWithValue}) => {
        try {

            const res = await API.get(`favorites/${customerId}` , {
                withCredentials: true,
            })
            console.log('getFavoriteById' , res.data)

        } catch(error) {
            rejectWithValue(error.res.data)

        }

})
export const deleteFavorites = createAsyncThunk(
    'favorites/deleteFavorites',
    async ({ favoriteId }, { rejectWithValue }) => {
        try {
            const res = await API.delete(`favorites/${favoriteId}`, {
                withCredentials: true,
            });
            console.log('delete favorite from slie', res.data);
        } catch (error) {
            rejectWithValue(error.res.data);
        }
    }
);

const initialState = {
    loading: false,
    favoritesData: [],
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

            //fetchFavorites
            .addCase(fetchFavorites.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.loading = false;
                state.favoritesData = action.payload;
                state.error = '';
                console.log('fetchFavorites', state.favoritesData);
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            //deleteFavorites
            .addCase(deleteFavorites.pending, (state) => {
                state.loading = true;
            })

            .addCase(deleteFavorites.fulfilled, (state, action) => {
                state.loading = false;
                const {
                    arg: { favoriteId },
                } = action.meta;
                if (favoriteId) {
                    state.favoritesData = state.favoritesData.filter(
                        (favorite) => favorite._id !== favoriteId
                    );
                }
                state.error = '';
                console.log('fulfilled');
            })

            .addCase(deleteFavorites.rejected, (state, action) => {
                state.error = action.error.message;
                console.log('rejected');
            });
    },
});

export const { addFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
