import { IMusicData } from "./music.interface"

export interface IPlaylist {
    author: string
    title: string
    tracks: IMusicData[]
    _id: string
}