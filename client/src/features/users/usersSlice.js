import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: () => initialState,
    },
});

// Action creators are generated for each case reducer function
export const { login, logout } = usersSlice.actions;

export default usersSlice.reducer;
