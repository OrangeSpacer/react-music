export interface IFavoritesService {
	addFavoritesTracK: (trackId: string, userId: string) => void;
	deleteFavoritesTrack: (trackId: string, userId: string) => void;
	getFavoritesTracKs: (userId: string) => void;
}
