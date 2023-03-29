import { hash } from "bcrypt";
import { User } from "../../models/User";
import { IUserService } from "./user.interface";
import { ITokenService } from "../token/token.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { UserDto } from "../../dtos/user.dto";

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.TokenService) private tokenService: ITokenService) {}
	public async registration(password: string, email: string): Promise<object> {
		const candidate = await User.findOne({ email });
		if (candidate) {
			throw console.log("Данный email уже используется");
		}
		const hashPassword = await hash(password, 7);
		const user: any = await User.create({ email, password: hashPassword });

		const userDtoCreate = new UserDto(user);

		const token: any = this.tokenService.generateToken({ ...userDtoCreate });
		await this.tokenService.saveToken(userDtoCreate.id, token);

		return { token, user: UserDto };
	}
}
