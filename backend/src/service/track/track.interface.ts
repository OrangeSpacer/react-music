export interface ITrack {
	add: (title: string, author: string, image: Buffer, track: Buffer) => void;
	delete: (id: string) => void;
}
