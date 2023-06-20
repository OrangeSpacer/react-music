import { IMusicData } from "../../types/music.interface";

export interface IMusic {
    musicData: IMusicData
    isFavorties?: boolean
    deleteMusic?: () => void
    addInPlaylist?: () => void;
    deleteInPlaylist?: () => void;
}