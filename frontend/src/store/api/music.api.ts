import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { IMusic } from "../../types/music.interface"

export const musicApi = createApi({
    reducerPath: "musicApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://127.0.0.1:5000/track"}),
    endpoints: (builder) => ({
        getMusicAll: builder.query<IMusic[], string>({
            query: () => "/all"
        })
    })
})

export const {useGetMusicAllQuery} = musicApi