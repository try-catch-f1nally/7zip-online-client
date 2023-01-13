import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import archiveReducer from './archive/slice';
import {authApi} from './auth/auth-api';
import {archiveApi} from './archive/archive-api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    archive: archiveReducer,
    [authApi.reducerPath]: authApi.reducer,
    [archiveApi.reducerPath]: archiveApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, archiveApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
