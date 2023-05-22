import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { musicApi } from "./api/music/music.api";
import authSlice from "./features/auth/authSlice";
import { apiSlice } from "./api/apiSlice";

const rootReducers = combineReducers({
    loginReducer: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [musicApi.reducerPath]: musicApi.reducer,
});

export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(musicApi.middleware,apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch