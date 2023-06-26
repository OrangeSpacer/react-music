import { IMusicData } from "../../types/music.interface";

export interface IMusic {
    id: string
    musicData: IMusicData
    isFavorites?: boolean
    addFavorties?: () => void;
    deleteFavorites?: () => void;
    deleteMusic?: () => void
    addInPlaylist?: () => void;
    deleteInPlaylist?: () => void;
}