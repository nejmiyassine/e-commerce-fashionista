import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users:null
    },
    reducers: {
        login: (state, action) => {
            state.users = action.payload; 
        },
    },
});

// Action creators are generated for each case reducer function
export const { login } = usersSlice.actions;

export default usersSlice.reducer;

