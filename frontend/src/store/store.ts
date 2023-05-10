import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { musicApi } from "./api/music.api";
import { userApi } from "./api/user.api";

const rootReducers = combineReducers({
   [musicApi.reducerPath]: musicApi.reducer,
   [userApi.reducerPath]: userApi.reducer,
});

export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(musicApi.middleware,userApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch