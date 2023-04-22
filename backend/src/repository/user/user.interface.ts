export interface IUserRepositroy {
	create: (object: any) => Promise<any>;
	findById: (id: string) => Promise<any>;
	findOne: (value: any) => Promise<any>;
	save: (object: any) => Promise<void>;
}
