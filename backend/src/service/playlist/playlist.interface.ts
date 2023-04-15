export interface IPlaylisrService {
	getAll: () => void;
	getForId: (playlistId: string) => void;
	createPlaylist: (title: string) => void;
	deletePlayList: (id: string) => void;
	deleteTrack: (idPlayList: string, idTrack: string) => void;
	addTrack: (idPlayList: string, idTrack: string) => void;
}
