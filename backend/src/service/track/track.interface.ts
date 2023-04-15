export interface ITrack {
	getAll: () => void;
	getForId: (id: string) => void;
	add: (title: string, author: string, image: any, track: any) => void;
	delete: (id: string) => void;
}
