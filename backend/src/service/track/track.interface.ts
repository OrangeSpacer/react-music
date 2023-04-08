export interface ITrack {
	getAll: () => void;
	add: (title: string, author: string, image: any, track: any) => void;
	delete: (id: string) => void;
}
