import { IMusicData } from "../../types/music.interface";

export interface IMusic {
    musicData: IMusicData
    deleteMusic?: () => void
    addInPlaylist?: () => void;
    deleteInPlaylist?: () => void;
}