import { configureStore } from '@reduxjs/toolkit';
import { api } from './services/api';
import { usersApi } from './services/usersApi';

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware, usersApi.middleware),
});

export default store;
