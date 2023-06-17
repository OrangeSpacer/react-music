import { IMusicData } from "../../types/music.interface";

export interface IMusicBlock {
    title: string,
    musics: IMusicData[],
    deleteMusic?: () => void
    addInPlaylist?: () => void;
    deleteInPlaylist?: () => void;
}