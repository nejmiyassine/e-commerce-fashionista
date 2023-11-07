import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { usersAPI } from './api/usersApi';

export const store = configureStore({
    reducer: {
        [usersAPI.reducerPath]: usersAPI.reducer,
    },
    devTools: import.meta.env.VITE_REACT_APP_NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat(usersAPI.middleware),
});

setupListeners(store.dispatch);

export default store;
