import { createSlice } from '@reduxjs/toolkit';

const initialStateValues = {
    users: [],
};

export const usersSlice = createSlice({
    name: 'users',
    initialState: initialStateValues,
    reducers: {
        addUsers: (state, action) => {
            state.push(action.payload);
        },
    },
});

// Action creators are generated for each case reducer function
export const { addUsers } = usersSlice.actions;

export default usersSlice.reducer;
