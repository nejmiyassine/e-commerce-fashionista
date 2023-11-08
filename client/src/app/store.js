import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import customersReducer from '../features/customers/customersSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import subcategoriesReducer from '../features/subcategories/subcategoriesSlice';

import { usersAPI } from './api/usersApi';

const store = configureStore({
    reducer: {
        [usersAPI.reducerPath]: usersAPI.reducer,
        customers: customersReducer,
        categories: categoriesReducer,
        subcategories: subcategoriesReducer,
    },
    devTools: import.meta.env.VITE_REACT_APP_NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([usersAPI.middleware]),
});

setupListeners(store.dispatch);

export default store;
