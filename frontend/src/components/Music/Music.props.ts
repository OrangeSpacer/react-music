import { IMusicData } from "../../types/music.interface";

export interface IMusic {
    id: string
    playlistId?: string
    musicData: IMusicData
    isFavorites?: boolean,
    isLocal: boolean
    isPlaying: boolean
    playMusic?: () => void;
    pauseMusic?: () => void;
    addFavorties?: () => void;
    deleteFavorites?: () => void;
    removeFromPlaylist?: () => void;
    deleteMusic?: () => void;
    addInPlaylist?: () => void;
    deleteInPlaylist?: () => void;
}