import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { IMusicData } from "../../types/music.interface"

export const musicApi = createApi({
    reducerPath: "musicApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://127.0.0.1:5000/track"}),
    endpoints: (builder) => ({
        getMusicAll: builder.query<IMusicData[], string>({
            query: () => "/all"
        })
    })
})

export const {useGetMusicAllQuery} = musicApi