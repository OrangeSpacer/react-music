export interface IUserService {
	getInfo: (refreshToken: string) => void;
	registration: (password: string, email: string) => void;
	login: (email: string, password: string) => void;
	logout: (refreshToken: string) => void;
	refresh: (refreshToken: string) => void;
	addPlaylist: (playlistId: string, userId: string) => void;
	deletePlaylist: (playlistId: string, userId: string) => void;
}
