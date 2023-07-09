import { IPlaylist } from "../../types/playlist.interface"


export interface IPlaylistBlock {
    title: string,
    isLocal: boolean,
    removePlaylist?: (id: string) => void;
    fetchData:  IPlaylist[]
}