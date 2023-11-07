import { combineReducers } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import customersReducer from '../features/customers/customersSlice'

const rootReducer = combineReducers({
    users: usersReducer,
    customers : customersReducer,
});

export default rootReducer;
