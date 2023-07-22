import { IMusicData } from "../../types/music.interface";

export interface IMusicBlock {
	title: string;
	musics: IMusicData[];
	isLocal?: boolean | null;
	playlistId?: string;
	deleteMusic?: (id: string) => void;
	removeFromPlaylist?: () => void;
	addInPlaylist?: () => void;
	deleteInPlaylist?: () => void;
}
