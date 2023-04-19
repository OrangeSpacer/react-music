export interface ITrack {
	getAll: () => void;
	getForId: (id: string) => void;
	add: (title: string, author: string, image: any, track: any, creator: string) => void;
	delete: (id: string, author: string) => void;
}
