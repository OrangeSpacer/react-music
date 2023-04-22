import { Mongoose, MongooseOptions, MongooseQueryOptions } from "mongoose";
import { User } from "../../models/User";
import { IUserRepositroy } from "./user.interface";
import { injectable } from "inversify";
@injectable()
export class UserRepositry implements IUserRepositroy {
	public async findById(id: string): Promise<any> {
		const user = await User.findById(id);
		return user;
	}
	public async findOne(value: any): Promise<any> {
		const user = await User.findOne(value);
		return user;
	}
	public async save(object: Mongoose): Promise<void> {
		await User.updateOne(object);
	}
}
