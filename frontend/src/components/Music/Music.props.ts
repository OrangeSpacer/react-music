import { IMusicData } from "../../types/music.interface";

export interface IMusic {
    musicData: IMusicData
    isFavorites: boolean
    deleteMusic?: () => void
    addInPlaylist?: () => void;
    deleteInPlaylist?: () => void;
}