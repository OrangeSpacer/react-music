export interface IPlaylisrService {
	getAll: () => void;
	createPlaylist: (title: string) => void;
	deletePlayList: (id: string) => void;
	deleteTrack: (idPlayList: string, idTrack: string) => void;
	addTrack: (idPlayList: string, idTrack: string) => void;
}
