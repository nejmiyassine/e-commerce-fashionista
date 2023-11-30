import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
};

export const bagSlice = createSlice({
    name: 'bag',
    initialState,
    reducers: {
        toggleBag: (state, action) => {
            state.isOpen = action.payload;
        },
    },
});

export const { toggleBag } = bagSlice.actions;

export default bagSlice.reducer;
