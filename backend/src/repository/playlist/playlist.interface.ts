export interface IPlaylistRepository {
	create: (object: any) => Promise<any>;
	find: () => Promise<any>;
	findById: (id: string) => Promise<any>;
	findOne: (value: any) => Promise<any>;
	save: (object: any) => Promise<void>;
	deleteOne: (value: any) => Promise<any>;
}
