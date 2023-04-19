export interface IPlaylisrService {
	getAll: () => void;
	getForId: (playlistId: string) => void;
	createPlaylist: (title: string, author: string, authorPlaylist: string) => void;
	deletePlayList: (id: string, authorPlaylist: string) => void;
	deleteTrack: (idPlayList: string, idTrack: string, authorPlaylist: string) => void;
	addTrack: (idPlayList: string, idTrack: string, authorPlaylist: string) => void;
}
