import { IMusicData } from "../../../types/music.interface";
import { apiSlice } from "../apiSlice";

export const favoritesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllFavorites: builder.query<IMusicData[], string>({
            query: () => "/favorites/all"
        })
    })
})

export const {useGetAllFavoritesQuery} = favoritesApi