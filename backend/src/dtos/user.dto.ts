export class UserDto {
	public email: string;
	public id: string;
	public roles: string[];
	constructor(model: { email: string; _id: string; roles: string[] }) {
		this.email = model.email;
		this.id = model._id;
		this.roles = model.roles;
	}
}
