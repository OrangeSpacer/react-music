export class UserDto {
	public email: string;
	public id: string;
	constructor(model: { email: string; _id: string }) {
		this.email = model.email;
		this.id = model._id;
	}
}
