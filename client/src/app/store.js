import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import customersReducer from '../features/customers/customersSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import subcategoriesReducer from '../features/subcategories/subcategoriesSlice';
import usersReducer from '../features/users/usersSlice';
import { usersAPI } from './api/usersApi';
import { ordersAPI } from './api/ordersApi';

const rootPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['users'],
};

const reducers = combineReducers({
    customers: customersReducer,
    categories: categoriesReducer,
    subcategories: subcategoriesReducer,
    users: usersReducer,
    [usersAPI.reducerPath]: usersAPI.reducer,
    [ordersAPI.reducerPath]: ordersAPI.reducer,
});

const persistedReducer = persistReducer(rootPersistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: import.meta.env.VITE_REACT_APP_NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([
            usersAPI.middleware,
            ordersAPI.middleware,
        ]),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
