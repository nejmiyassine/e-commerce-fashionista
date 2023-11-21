import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    access_token: '',
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log(action.payload);
            state.user = action.payload.user;
            state.access_token = action.payload.access_token;
        },
        logout: () => initialState,
    },
});

// Action creators are generated for each case reducer function
export const { setUser, logout } = usersSlice.actions;

export default usersSlice.reducer;
