import { hash } from "bcrypt";
import { User } from "../../models/User";
import { IUserService } from "./user.interface";
import { ITokenService } from "../token/token.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { UserDto } from "../../dtos/user.dto";
import { compare } from "bcrypt";

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

	public async login(email: string, password: string): Promise<object> {
		const possibleUser: any = await User.findOne({ email });
		if (!possibleUser) {
			throw console.log("Пользоватей с таким email не найден");
		}
		const unhashPassword = await compare(password, possibleUser.password);
		if (!unhashPassword) {
			throw console.log("Введен неправильный пароль");
		}
		const userDto = new UserDto(possibleUser);

		const token: any = this.tokenService.generateToken({
			...userDto,
		});
		await this.tokenService.saveToken(possibleUser._id, token);
		return { token, user: userDto };
	}
}
