import { apiSlice } from "../apiSlice";

export const favoritesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllFavorites: builder.query<string[], string>({
            query: () => "/favorites/all"
        }),
        addInFavorties: builder.mutation<string, object>({
            query: (payload) => ({
                url: "/favorites/add",
                method: "POST",
                body: payload
            })
        }),
        deleteInFavorties: builder.mutation<string, object>({
            query: (payload) => ({
                url: "/favorites/remove",
                method: "POST",
                body: payload
            })
        }),
    })
})

export const {useGetAllFavoritesQuery, useAddInFavortiesMutation, useDeleteInFavortiesMutation} = favoritesApi