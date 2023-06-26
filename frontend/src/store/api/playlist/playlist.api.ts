import { IPlaylist } from "../../../types/playlist.interface";
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
        }),
        getPlaylistAll: builder.query<IPlaylist[],string>({
            query: () => "/playlist/all"
        }),
        addTrackInPlaylist: builder.mutation({
            query: (payload) => ({
                url: '/playlist/add',
                method: "POST",
                body: payload
            })
        })
    })
})

export const {useCreatePlaylistMutation, useGetLocalPlaylistsMutation, useGetPlaylistForIdMutation, useGetPlaylistAllQuery, useAddTrackInPlaylistMutation} = playlistApi