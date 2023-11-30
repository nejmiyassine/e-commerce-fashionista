import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import customersReducer from '../features/customers/customersSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import subcategoriesReducer from '../features/subcategories/subcategoriesSlice';
import productsReducers from '../features/products/productsSlice';
import usersReducer from '../features/users/usersSlice';

import { usersAPI } from './api/usersApi';
import { ordersAPI } from './api/ordersApi';
import { authApi } from './api/authApi';
import { customerAPI } from './api/customerApi';
import bagSlice from '../features/bag/bagSlice';

export const store = configureStore({
    reducer: {
        customers: customersReducer,
        categories: categoriesReducer,
        subcategories: subcategoriesReducer,
        users: usersReducer,
        products: productsReducers,
        bag: bagSlice,
        [usersAPI.reducerPath]: usersAPI.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [ordersAPI.reducerPath]: ordersAPI.reducer,
        [customerAPI.reducerPath]: customerAPI.reducer,
    },
    devTools: import.meta.env.VITE_REACT_APP_NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([
            usersAPI.middleware,
            ordersAPI.middleware,
            authApi.middleware,
            customerAPI.middleware,
        ]),
});

setupListeners(store.dispatch);