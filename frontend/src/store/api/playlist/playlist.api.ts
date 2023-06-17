import { apiSlice } from "../apiSlice";

export const playlistApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPlaylist: builder.mutation({
            query: (payload) => ({
                url: "/playlist/create",
                method: "POST",
                body: payload
            })
        }),
        getLocalPlaylists: builder.mutation({
            query: () => ({
                url: "/playlist/your",
                method: "GET"
            })
        }),
        getPlaylistForId: builder.mutation({
            query: (id) => ({
                url: "/playlist/get",
                method: "POST",
                params: {id}
            })
        })
    })
})

export const {useCreatePlaylistMutation, useGetLocalPlaylistsMutation, useGetPlaylistForIdMutation} = playlistApi