import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './rootReducer';
import usersReducer from '../features/users/usersSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import subcategoriesReducer from '../features/subcategories/subcategoriesSlice';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        categories: categoriesReducer,
        subcategories: subcategoriesReducer
    },
});
