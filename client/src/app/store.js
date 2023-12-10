import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import customersReducer from '../features/customers/customersSlice';
import frontCustomerReducer from '../features/customers/frontCustomerSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import subcategoriesReducer from '../features/subcategories/subcategoriesSlice';
import productsReducers from '../features/products/productsSlice';
import usersReducer from '../features/users/usersSlice';
import cartReducers from '../features/cart/cartSlice';
import ordersReducer from '../features/orders/ordersSlice';

import { usersAPI } from './api/usersApi';
import { ordersAPI } from './api/ordersApi';
import { authApi } from './api/authApi';
import { customerAPI } from './api/customerApi';
import { cartAPI } from './api/cartApi';

export const store = configureStore({
    reducer: {
        customers: customersReducer,
        frontCustomers: frontCustomerReducer,
        favorites: favoritesReducer,
        categories: categoriesReducer,
        orders: ordersReducer,
        subcategories: subcategoriesReducer,
        users: usersReducer,
        products: productsReducers,
        cart: cartReducers,
        [usersAPI.reducerPath]: usersAPI.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [ordersAPI.reducerPath]: ordersAPI.reducer,
        [customerAPI.reducerPath]: customerAPI.reducer,
        [cartAPI.reducerPath]: cartAPI.reducer,
    },
    devTools: import.meta.env.VITE_REACT_APP_NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([
            usersAPI.middleware,
            ordersAPI.middleware,
            authApi.middleware,
            customerAPI.middleware,
            cartAPI.middleware,
        ]),
});

setupListeners(store.dispatch);
