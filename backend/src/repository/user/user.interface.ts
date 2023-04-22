export interface IUserRepositroy {
	findById: (id: string) => Promise<any>;
	findOne: (value: any) => Promise<any>;
	save: (object: any) => Promise<void>;
}
