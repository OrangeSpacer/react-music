import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { musicApi } from "./api/music/music.api";
import authSlice from "./features/auth/authSlice";
import { apiSlice } from "./api/apiSlice";
import yourMusicSlice from "./features/yourMusic/yourMusicSlice";
import { playlistApi } from "./api/playlist/playlist.api";
import { favoritesApi } from "./api/favorites/favorites.api";

const rootReducers = combineReducers({
    loginReducer: authSlice,
    yourMusicReducer: yourMusicSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [musicApi.reducerPath]: musicApi.reducer,
    [playlistApi.reducerPath]: playlistApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer
});

export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(musicApi.middleware,apiSlice.middleware)
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch