import { apiSlice } from "../apiSlice";

export const playlistApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPlaylist: builder.mutation({
            query: (payload) => ({
                url: "/playlist/create",
                method: "POST",
                body: payload
            })
        })
    })
})

export const {useCreatePlaylistMutation} = playlistApi