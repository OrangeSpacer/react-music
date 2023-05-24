import { IMusicData } from "../../../types/music.interface"
import { apiSlice } from "../apiSlice"

export const musicApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMusicAll: builder.query<IMusicData[], string>({
            query: () => "/track/all"
        }),
        getYourMusic: builder.mutation<IMusicData[], string>({
            query: (payload) => ({
                url: "/track/your",
                method: "GET",
            })
        }),
        createTrack: builder.mutation({
            query: (payload) => ({
                url: "/track/add",
                method: "POST",
                body: payload,
            })
        }),
    })
})

export const {useGetMusicAllQuery, useGetYourMusicMutation, useCreateTrackMutation} = musicApi