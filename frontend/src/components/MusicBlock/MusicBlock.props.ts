import { IMusicData } from "../../types/music.interface";

export interface IMusicBlock {
    title: string,
    musics: IMusicData[],
    isLocal: boolean,
    playlistId?: string,
    deleteMusic?: () => void
    addInPlaylist?: () => void;
    deleteInPlaylist?: () => void;
}