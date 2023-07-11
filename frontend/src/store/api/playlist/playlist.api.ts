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
        getLocalPlaylistsSingle: builder.query({
            query: () => "/playlist/your"
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
        }),
        deleteTrackFromPlaylist: builder.mutation({
            query: ({idPlaylist,idTrack}) => ({
                url: '/playlist/remove',
                method: "DELETE",
                params: {idPlaylist: idPlaylist, idTrack: idTrack}
            })
        }),
        deletePlaylist: builder.mutation({
            query: (id) => ({
                url: "/playlist/delete",
                method: "DELETE",
                params: {id}
            })
        })
    })
})

export const {useCreatePlaylistMutation, useGetLocalPlaylistsMutation, useGetPlaylistForIdMutation, useGetPlaylistAllQuery, useAddTrackInPlaylistMutation, useGetLocalPlaylistsSingleQuery, useDeleteTrackFromPlaylistMutation, useDeletePlaylistMutation} = playlistApi